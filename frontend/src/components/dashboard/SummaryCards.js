import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../pages/Dashboard.css";

const SummaryCards = () => {
  const [dashboardData, setDashboardData] = useState({
    expectedRevenue: 0,
    predictedUnits: 0,
    unitsSold: 0,
    remainingStock: 0,
    topProduct: "",
  });

  useEffect(() => {
    // Get current month and year in 'YYYY-MM' format
    const currentMonth = new Date();
    const monthYear = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}`;
    
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`/api/forecast/forecast?monthYear=${monthYear}`);
        
        // Assuming the forecast data is inside the "forecast" key
        const forecastData = response.data.forecast;
        
        setDashboardData({
          expectedRevenue: forecastData.expectedRevenue,
          predictedUnits: forecastData.predictedUnits,
          unitsSold: response.data.totals.unitsSold,  // Assign from totals
          remainingStock: response.data.totals.remainingStock,  // Assign from totals
          topProduct: forecastData.topProduct,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="summary-title">Total Units Sold</div>
        <div className="summary-value">{dashboardData.unitsSold} </div>
      </div>
      <div className="summary-card">
        <div className="summary-title">Revenue</div>
        <div className="summary-value">{dashboardData.expectedRevenue}</div>
      </div>
      <div className="summary-card">
        <div className="summary-title">Remaining Stock</div>
        <div className="summary-value">{dashboardData.remainingStock}</div>
      </div>
      <div className="summary-card">
        <div className="summary-title">Predicted Units</div>
        <div className="summary-value">{dashboardData.predictedUnits}</div>
      </div>
      <div className="summary-card">
        <div className="summary-title">Top Product</div>
        <div className="summary-value">{dashboardData.topProduct}</div>
      </div>
    </div>
  );
};

export default SummaryCards;
