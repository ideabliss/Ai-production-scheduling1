import React from 'react';
import "../../pages/StockWatch.css"; 


const StockAlerts = () => (
  <div className="section">
    <h3>Stock Alerts</h3>
    <ul className="alert-list">
      <li>Caps out of stock — reorder immediately!</li>
      <li>Labels below threshold — restock suggested</li>
      <li>High usage of bottles last week</li>
    </ul>
  </div>
);

export default StockAlerts;
