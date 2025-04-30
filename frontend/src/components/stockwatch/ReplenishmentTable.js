import React, { useContext } from 'react';
import { StockWatchContext } from '../../context/StockWatchContext';
import "../../pages/StockWatch.css";

const ReplenishmentTable = () => {
  const { stockOrders, loading, error } = useContext(StockWatchContext);

  const currentDate = new Date();
  // Normalize currentDate to midnight (00:00:00) to ignore time differences
  currentDate.setHours(0, 0, 0, 0);

  // Filter only upcoming items (orders with expectedDate in the future)
  const upcomingOrders = stockOrders.filter(order => {
    const expectedDate = new Date(order.expectedDate);
    // Normalize expectedDate to midnight (00:00:00) to ignore time differences
    expectedDate.setHours(0, 0, 0, 0);
    return expectedDate > currentDate; // Upcoming orders
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="section">
      <h3>Upcoming Replenishment Schedule</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Supplier</th>
            <th>Expected Date</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {upcomingOrders.length === 0 ? (
            <tr>
              <td colSpan="4">No upcoming items</td>
            </tr>
          ) : (
            upcomingOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.itemName}</td>
                <td>{order.supplierName}</td>
                <td>{new Date(order.expectedDate).toLocaleDateString()}</td>
                <td>{order.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReplenishmentTable;
