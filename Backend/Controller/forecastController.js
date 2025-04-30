// controllers/forecast.js

const axios = require('axios');
const { db, admin } = require('../Firebase/admin');

function cleanGeminiJsonResponse(text) {
  // Strip out ```json ... ``` if present
  return text.replace(/```json\s*([\s\S]*?)```/, '$1').trim();
}

const generateForecast = async (req, res) => {
  try {
    const { monthYear, products, regionSales, totals } = req.body;
    if (!monthYear || !products || !regionSales || !totals) {
      return res.status(400).json({ message: "monthYear, products, regionSales & totals are required." });
    }

    // 1. Simulate past 29 days of actual sales
    const daysInHistory = 29;
    const base = Math.floor(totals.unitsSold / daysInHistory);
    const remainder = totals.unitsSold % daysInHistory;
    const today = new Date(); // e.g. 2025-04-30
    const startHistoric = new Date(today);
    startHistoric.setDate(startHistoric.getDate() - daysInHistory);

    const dailySales = [];
    for (let i = 0; i < daysInHistory; i++) {
      const d = new Date(startHistoric);
      d.setDate(startHistoric.getDate() + i);
      dailySales.push({
        date: d.toISOString().slice(0,10),
        unitsSold: base + (i < remainder ? 1 : 0)
      });
    }

    // 2. Build prompt
    const dailyLines = dailySales.map(d => `- ${d.date}: ${d.unitsSold} units`).join('\n');
    const productLines = products
      .map(p => `- ${p.productName}: sold ${p.quantitySold}, revenue ₹${p.revenue}, stock ${p.totalStock}, remaining ${p.remainingStock}`)
      .join('\n');
    const regionLines = Object.entries(regionSales).map(([r,v]) => `- ${r}: ₹${v}`).join('\n');

    const prompt = `
You are an expert demand forecasting AI.

Historical daily sales for the past ${daysInHistory} days:
${dailyLines}

Product summary:
${productLines}

Region-wise sales:
${regionLines}

Totals for ${monthYear}:
- Units sold: ${totals.unitsSold}
- Revenue: ₹${totals.revenue}
- Remaining stock: ${totals.remainingStock}

Please predict demand for the next 30 days. Also identify which date will have the highest and lowest predicted demand.  

Respond *only* with raw JSON, e.g.:

{
  "predictedUnits": number,
  "expectedRevenue": number,
  "topProduct": "string",
  "rawMaterials": [ { "material": "string", "percentIncrease": number } ],
  "chartData": [
    { "date": "YYYY-MM-DD", "actual": number|null, "predicted": number|null },
    …
  ],
  "highestDay": { "date": "YYYY-MM-DD", "predicted": number },
  "lowestDay":  { "date": "YYYY-MM-DD", "predicted": number },
  "insights": [ "string", … ],
  "productionPlan": [
    { "product": "string", "predictedDemand": number, "suggestedUnits": number, "rawMaterials": "string" },
    …
  ]
}
`.trim();

    // 3. Call Gemini
    const apiKey = 'API';
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
    const resp = await axios.post(url, {
      contents: [{ parts:[{ text: prompt }] }],
      generationConfig: { temperature:0.7, maxOutputTokens:2000 }
    });

    const raw = resp.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return res.status(500).json({ message: "No response from Gemini." });

    const cleaned = cleanGeminiJsonResponse(raw);
    let forecastData;
    try {
      forecastData = JSON.parse(cleaned);
    } catch (err) {
      return res.status(500).json({
        message: "Invalid JSON from Gemini.",
        error: err.message,
        raw
      });
    }

    // 4. Build unified chartData combining history + forecast
    //    history: actual present, predicted null
    //    future:  predicted present, actual null
    const futureDays = forecastData.chartData || [];
    const combinedChart = [
      ...dailySales.map(d => ({ date:d.date, actual:d.unitsSold, predicted:null })),
      ...futureDays.map(d => ({ date:d.date, actual:null,    predicted:d.predicted }))
    ];

    // 5. Find highest/lowest predicted days
    let highest = { date:null, predicted:-Infinity };
    let lowest  = { date:null, predicted: Infinity };
    for (const { date, predicted } of futureDays) {
      if (predicted > highest.predicted)   highest = { date, predicted };
      if (predicted < lowest.predicted)    lowest  = { date, predicted };
    }

    // 6. Persist to Firestore
    const doc = {
      monthYear,
      products,
      regionSales,
      totals,
      dailySales,
      forecast: {
        ...forecastData,
        chartData: combinedChart,
        highestDay: highest,
        lowestDay:  lowest,
        generatedAt: admin.firestore.Timestamp.now()
      },
      createdAt: admin.firestore.Timestamp.now()
    };
    await db.collection("salesForecasts").doc(monthYear).set(doc);

    // 7. Return to client
    res.status(201).json({
      message: "Forecast saved successfully",
      forecast: {
        ...forecastData,
        chartData: combinedChart,
        highestDay: highest,
        lowestDay:  lowest
      }
    });

  } catch (error) {
    console.error("Forecast error:", error.response?.data || error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const getForecastData = async (req, res) => {
  try {
    const { monthYear } = req.query;

    if (!monthYear) {
      return res.status(400).json({ message: "monthYear query parameter is required" });
    }

    // Validate monthYear format YYYY-MM
    const monthYearRegex = /^\d{4}-\d{2}$/;
    if (!monthYear.match(monthYearRegex)) {
      return res.status(400).json({ message: "Invalid monthYear format. Use 'YYYY-MM'." });
    }

    // Retrieve forecast document
    const docRef = db.collection('salesForecasts').doc(monthYear);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: `No forecast found for month ${monthYear}` });
    }

    const data = doc.data();

    // Convert Firestore timestamps to ISO strings
    if (data.forecast && data.forecast.generatedAt) {
      data.forecast.generatedAt = data.forecast.generatedAt.toDate().toISOString();
    }
    if (data.createdAt) {
      data.createdAt = data.createdAt.toDate().toISOString();
    }

    res.status(200).json({ monthYear, ...data });
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { generateForecast,getForecastData };
