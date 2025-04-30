const { db } = require('../Firebase/admin');

const getDashboardData = async (req, res) => {
  try {
    const { monthYear } = req.query;

    // Fetch forecast data from salesForecasts
    const forecastSnapshot = await db
      .collection("salesForecasts")
      .where("monthYear", "==", monthYear)
      .limit(1)
      .get();

    if (forecastSnapshot.empty) {
      return res.status(404).json({ error: "Forecast data not found for this month." });
    }

    const forecastData = forecastSnapshot.docs[0].data();
    const {
      expectedRevenue = 0,
      predictedUnits = 0,
      topProduct = "",
      regionSales = {},
    } = forecastData;

    // Fetch actual sales data from sales collection
    const salesSnapshot = await db
      .collection("sales")
      .where("monthYear", "==", monthYear)
      .get();

    const salesData = salesSnapshot.docs.map(doc => doc.data());
    const unitsSold = salesData.reduce((sum, sale) => sum + (sale?.totals?.unitsSold || 0), 0);

    // Fetch current remaining stock from stock collection
    const stockSnapshot = await db.collection("stock").get();
    const stockData = stockSnapshot.docs.map(doc => doc.data());
    const remainingStock = stockData.reduce((sum, stock) => sum + (stock?.quantity || 0), 0);

    // Respond with combined dashboard metrics
    res.status(200).json({
      expectedRevenue,
      predictedUnits,
      unitsSold,
      remainingStock,
      topProduct,
      regionSales,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};

module.exports = {
  getDashboardData,
};
