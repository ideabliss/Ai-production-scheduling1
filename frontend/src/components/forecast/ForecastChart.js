// src/components/forecast/ForecastBarChart.js
import React from 'react';
import { useForecast } from '../../context/ForecastContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../../pages/FutureCast.css';

const ForecastBarChart = () => {
  const { forecastData, loading, error } = useForecast();

  if (loading) {
    return <div className="graph-section">Loading bar chart…</div>;
  }
  if (error || !forecastData) {
    return <div className="graph-section">Unable to load data.</div>;
  }

  // Map your products into the format Recharts expects
  const data = forecastData.products.map(prod => {
    // Find matching predictedDemand from productionPlan
    const plan = forecastData.forecast.productionPlan.find(p => p.product === prod.productName) || {};
    return {
      name: prod.productName,
      Actual: prod.quantitySold,
      Predicted: plan.predictedDemand ?? 0
    };
  });

  // If no data, show a message
  if (!data.length) {
    return <div className="graph-section">No product data available.</div>;
  }

  return (
    <div className="graph-section">
      <h3>Actual vs. Predicted Units by Product</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Actual" fill="#36b9cc" />
          <Bar dataKey="Predicted" fill="#1cc88a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastBarChart;
