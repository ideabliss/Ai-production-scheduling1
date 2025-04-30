// src/components/forecast/InsightList.js
import React from 'react';
import { useForecast } from '../../context/ForecastContext';
import '../../pages/FutureCast.css';

const InsightList = () => {
  const { forecastData, loading, error } = useForecast();

  if (loading) return <div className="insights-section">Loading insights…</div>;
  if (error)   return <div className="insights-section">Error loading insights</div>;
  if (!forecastData?.forecast?.insights?.length) {
    return (
      <div className="insights-section">
        <h3>AI Insights</h3>
        <p>No insights available for {forecastData?.monthYear}.</p>
      </div>
    );
  }

  return (
    <div className="insights-section">
      <h3>AI Insights</h3>
      <ul>
        {forecastData.forecast.insights.map((insight, idx) => (
          <li key={idx}>{insight}</li>
        ))}
      </ul>
    </div>
  );
};

export default InsightList;
