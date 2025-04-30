import React from "react";
import "../../pages/SalesPulse.css";


const SalesAlerts = () => {
  return (
    <div className="section">
      <h3>Alerts & Insights</h3>
      <ul className="alert-list">
        <li>Product A stock running low!</li>
        <li>Sales dropped by 15% compared to last week</li>
        <li>High spike in Product C demand (seasonal)</li>
      </ul>
    </div>
  );
};

export default SalesAlerts;
