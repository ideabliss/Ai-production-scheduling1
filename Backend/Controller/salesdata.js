const { db, admin } = require('../Firebase/admin');
const axios = require('axios');

const saveSalesData = async (req, res) => {
  try {
    const { products, regionSales, monthYear, totals } = req.body;

    console.log("Received regionSales data:", regionSales);

    if (!monthYear) {
      return res.status(400).json({ message: "Month and year are required" });
    }

    const monthYearRegex = /^\d{4}-\d{2}$/;
    if (!monthYear.match(monthYearRegex)) {
      return res.status(400).json({ message: "Invalid month-year format. Use 'YYYY-MM'." });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products must be a non-empty array" });
    }

    const cleanedProducts = products.map(p => ({
      productName: p.productName || p.name || "", // fallback in case frontend uses "name"
      quantitySold: Number(p.quantitySold ?? p.units ?? 0),
      revenue: Number(p.revenue ?? 0),
      totalStock: Number(p.totalStock ?? 0),
      remainingStock: Math.max(Number(p.totalStock ?? 0) - Number(p.quantitySold ?? p.units ?? 0), 0),
    })).filter(p => p.productName && p.revenue != null);

    if (cleanedProducts.length === 0) {
      return res.status(400).json({ message: "Products must contain valid data" });
    }

    const cleanedRegionSales = {
      North: Number(regionSales?.North || 0),
      East: Number(regionSales?.East || 0),
      West: Number(regionSales?.West || 0),
      South: Number(regionSales?.South || 0),
    };

    if (
      !totals ||
      typeof totals.unitsSold !== 'number' ||
      typeof totals.revenue !== 'number' ||
      typeof totals.remainingStock !== 'number'
    ) {
      return res.status(400).json({ message: "Invalid totals data" });
    }

    // Save sales data
    const docRef = db.collection("sales").doc();
    await docRef.set({
      products: cleanedProducts,
      regionSales: cleanedRegionSales,
      monthYear,
      totals,
      createdAt: admin.firestore.Timestamp.now(),
    });

    // Call forecast endpoint
    const forecastRes = await axios.post("http://localhost:5000/api/forecast/forecast", {
      products: cleanedProducts,
      regionSales: cleanedRegionSales,
      monthYear,
      totals
    });

    const forecast = forecastRes.data.forecast;

    // Save forecast
    await db.collection("forecasts").doc(monthYear).set({
      forecast,
      monthYear,
      generatedAt: admin.firestore.Timestamp.now(),
    });

    res.status(201).json({ message: "Sales data and forecast saved successfully!" });

  } catch (error) {
    console.error("Error saving sales or forecast:", error.response?.data || error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSalesData = async (req, res) => {
  try {
    const { monthYear } = req.query;

    if (!monthYear) {
      return res.status(400).json({ message: "monthYear is required in query params" });
    }

    const monthYearRegex = /^\d{4}-\d{2}$/;
    if (!monthYear.match(monthYearRegex)) {
      return res.status(400).json({ message: "Invalid month-year format. Use 'YYYY-MM'." });
    }

    const snapshot = await db
      .collection("sales")
      .where("monthYear", "==", monthYear)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No sales data found for the selected month" });
    }

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Failed to fetch sales data" });
  }
};

module.exports = { saveSalesData, getSalesData };
