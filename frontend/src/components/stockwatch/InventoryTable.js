import React, { useContext } from 'react';
import { StockWatchContext } from '../../context/StockWatchContext';
import "../../pages/StockWatch.css";

const InventoryTable = () => {
  const { stockOrders, loading, error } = useContext(StockWatchContext);

  const currentDate = new Date();
  // Normalize currentDate to midnight (00:00:00) to ignore time differences
  currentDate.setHours(0, 0, 0, 0);

  // Filter only orders where the expectedDate is today or in the past
  const pastAndTodayOrders = stockOrders.filter(order => {
    const expectedDate = new Date(order.expectedDate);
    // Normalize expectedDate to midnight (00:00:00) to ignore time differences
    expectedDate.setHours(0, 0, 0, 0);
    return expectedDate <= currentDate; // Show orders that are due today or in the past
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="section">
      <h3>Inventory Table</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price/Unit</th>
            <th>Supplier</th>
            <th>Expected Date</th>
          </tr>
        </thead>
        <tbody>
          {pastAndTodayOrders.length === 0 ? (
            <tr>
              <td colSpan="6">No past or today's stock orders</td>
            </tr>
          ) : (
            pastAndTodayOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.itemName}</td>
                <td>{order.category}</td>
                <td>{order.quantity}</td>
                <td>{order.pricePerUnit}</td>
                <td>{order.supplierName}</td>
                <td>{new Date(order.expectedDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
