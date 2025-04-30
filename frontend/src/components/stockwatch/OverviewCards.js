import React, { useContext } from 'react';
import { StockWatchContext } from '../../context/StockWatchContext';
import "../../pages/StockWatch.css"; 

const OverviewCards = () => {
  const { stockOrders } = useContext(StockWatchContext);

  // Calculate total stock value by multiplying quantity and pricePerUnit
  const totalStockValue = stockOrders.reduce((total, order) => {
    // Ensure quantity and pricePerUnit are numbers
    const quantity = Number(order.quantity);
    const pricePerUnit = Number(order.pricePerUnit);
    
    // Only add to total if both are valid numbers
    if (!isNaN(quantity) && !isNaN(pricePerUnit)) {
      return total + (quantity * pricePerUnit);
    }
    return total;  // Return the current total if the data is invalid
  }, 0);

  // Calculate the number of low stock alerts (for this example, assuming low stock is <= 10)
  const lowStockAlerts = stockOrders.filter(order => order.quantity <= 10).length;

  // Count the number of upcoming replenishments (orders with future expected date)
  const upcomingReplenishments = stockOrders.filter(order => {
    const expectedDate = new Date(order.expectedDate);
    const currentDate = new Date();
    return expectedDate >= currentDate;  // Ensure that we include today's date as well
  }).length;

  return (
    <div className="card-grid">
      <div className="overview-card">
        <h5>Total Raw Materials</h5>
        <p>{stockOrders.length}</p>
      </div>
      <div className="overview-card">
        <h5>Stock Value</h5>
        {/* Ensure to format the stock value as a currency */}
        <p>₹{totalStockValue.toLocaleString()}</p>
      </div>
      <div className="overview-card">
        <h5>Low Stock Alerts</h5>
        <p>{lowStockAlerts} Items</p>
      </div>
      <div className="overview-card">
        <h5>Upcoming Replenishments</h5>
        <p>{upcomingReplenishments} Orders</p>
      </div>
    </div>
  );
};

export default OverviewCards;
