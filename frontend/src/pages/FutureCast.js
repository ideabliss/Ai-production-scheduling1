// src/pages/FutureCast.js
import React from 'react';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import ForecastSummaryCards from '../components/forecast/ForecastCard';
import ForecastBarChart  from '../components/forecast/ForecastChart';
import ProductionSuggestions from '../components/forecast/ProductionPlanTable';
import AIInsights from '../components/forecast/InsightList';
import UploadSalesData from '../components/forecast/UploadCSV';
import { ForecastProvider } from "../context/ForecastContext"


const forecastData = [
  { date: 'Apr 1', predicted: 700, actual: 680 },
  { date: 'Apr 5', predicted: 650, actual: 740 },
  { date: 'Apr 10', predicted: 820, actual: 810 },
  { date: 'Apr 15', predicted: 860, actual: 850 },
  { date: 'Apr 20', predicted: 510, actual: 900 },
  { date: 'Apr 25', predicted: 970, actual: 960 },
  { date: 'Apr 30', predicted: 520, actual: 1010 },
];

const FutureCast = () => {
  return (
    <ForecastProvider>

    <div className="futurecast-container">
      <Sidebar />
      <div className="futurecast-content">
        <Header title="FutureCast - AI Powered Forecasts" />
        <ForecastSummaryCards />
        <ForecastBarChart />
        <ProductionSuggestions />
        <AIInsights />
        <UploadSalesData />
      </div>
    </div>
    </ForecastProvider>
  );
};

export default FutureCast;
