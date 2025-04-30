// controllers/productionController.js

const axios = require('axios');
const { db } = require('../Firebase/admin');

function cleanJson(text) {
  return text.replace(/```(?:json)?/g, '').trim();
}

const generateProductionSchedule = async (req, res) => {
  try {
    // 1) Get current monthYear
    const now = new Date();
    const monthYear = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;

    // 2) Fetch forecast data
    const docSnap = await db.collection('salesForecasts').doc(monthYear).get();
    if (!docSnap.exists) {
      return res.status(404).json({ message: `No forecast for ${monthYear}` });
    }
    const { forecast } = docSnap.data();

    // 3) Ensure productionPlan exists
    const plan = forecast.productionPlan;
    if (!Array.isArray(plan) || plan.length === 0) {
      return res.status(500).json({ message: 'No productionPlan found in forecast' });
    }

    // 4) Build prompt including shift logic and demand-based windows
    const productLines = plan
      .map(p => `• ${p.product}: demand ${p.predictedDemand}`)
      .join('\n');

    const prompt = `
You are a production scheduling expert with three shifts per day: Morning, Afternoon, Night.
Given these product demands for ${monthYear}:
${productLines}

For each product, choose:
- a shift (Morning/Afternoon/Night)
- a start date and end date within the month (longer windows for higher demand)
- unitsToProduce equal to predicted demand
- rawMaterials list

Respond *only* with JSON of the form:
{
  "tasks": [
    {
      "product": "Coca-Cola 500ml",
      "shift": "Morning",
      "start": "2025-04-28",
      "end": "2025-05-02",
      "unitsToProduce": 300,
      "rawMaterials": ["Sugar","CO2","Packaging","Concentrate"]
    },
    …
  ]
}
`.trim();

    // 5) Call Gemini
    const apiKey = 'API_KEY'; 
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
    const aiResp = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.5, maxOutputTokens: 1500 },
    });

    const raw = aiResp.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) throw new Error('Empty AI response');

    // 6) Extract and parse JSON
    const jsonText = cleanJson(raw);
    let schedule;
    try {
      schedule = JSON.parse(jsonText);
    } catch (e) {
      console.error('Parse error:', jsonText, e);
      return res.status(500).json({ message: 'Invalid JSON from AI', error: e.message, raw: jsonText });
    }

    // 7) Return flat task list
    res.json({ message: 'Production schedule generated', schedule, monthYear });
  } catch (err) {
    console.error('generateProductionSchedule error:', err);
    res.status(500).json({ message:'Server error', error: err.message });
  }
};

module.exports = { generateProductionSchedule };
