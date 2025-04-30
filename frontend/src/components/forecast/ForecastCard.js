import React from 'react';
import { useForecast } from '../../context/ForecastContext';
import '../../pages/FutureCast.css';

const ForecastCard = () => {
  const { forecastData, monthYear, setMonthYear, loading } = useForecast();

  const handleMonthChange = (e) => setMonthYear(e.target.value);

  if (loading || !forecastData) {
    return <div className="overview-cards">Loading forecast summary...</div>;
  }

  const {
    forecast: {
      predictedUnits,
      expectedRevenue,
      topProduct,
      rawMaterials,
    } = {}
  } = forecastData;

  return (
    <div className="overview-cards">
      <div className="overview-card month-picker-card">
        <label htmlFor="monthPicker"><strong>Select Month:</strong></label>
        <input
          type="month"
          id="monthPicker"
          value={monthYear}
          onChange={handleMonthChange}
        />
      </div>

      <div className="overview-card">
        <h5>Predicted Units (30 Days)</h5>
        <p>{predictedUnits ?? 'N/A'}</p>
      </div>

      <div className="overview-card">
        <h5>Expected Revenue</h5>
        <p>{expectedRevenue ? `₹${(expectedRevenue / 1e6).toFixed(2)}M` : 'N/A'}</p>
      </div>

      <div className="overview-card">
        <h5>Top Demanded Product</h5>
        <p>{topProduct ?? 'N/A'}</p>
      </div>

      <div className="overview-card">
        <h5>Raw Materials Needed</h5>
        <p>
          {rawMaterials?.length > 0
            ? `+${rawMaterials[0].percentIncrease}%`
            : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default ForecastCard;
