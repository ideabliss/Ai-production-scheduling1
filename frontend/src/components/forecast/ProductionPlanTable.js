// src/components/forecast/ProductionPlanTable.js
import React from 'react';
import { useForecast } from '../../context/ForecastContext';
import '../../pages/FutureCast.css';

const ProductionPlanTable = () => {
  const { forecastData, loading, error } = useForecast();

  if (loading) {
    return (
      <div className="production-plan">
        <h3>AI Suggested Production Plan</h3>
        <p>Loading production plan…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="production-plan">
        <h3>AI Suggested Production Plan</h3>
        <p>Error loading production plan.</p>
      </div>
    );
  }

  const plan = forecastData?.forecast?.productionPlan || [];
  if (!plan.length) {
    return (
      <div className="production-plan">
        <h3>AI Suggested Production Plan</h3>
        <p>No production plan available for {forecastData?.monthYear}.</p>
      </div>
    );
  }

  return (
    <div className="production-plan">
      <h3>AI Suggested Production Plan</h3>
      <table className="forecast-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Predicted Demand</th>
            <th>Suggested Units</th>
            <th>Raw Material Needed</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((row, idx) => (
            <tr key={idx}>
              <td>{row.product}</td>
              <td>{row.predictedDemand.toLocaleString()}</td>
              <td>{row.suggestedUnits.toLocaleString()}</td>
              <td>{row.rawMaterials}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionPlanTable;
