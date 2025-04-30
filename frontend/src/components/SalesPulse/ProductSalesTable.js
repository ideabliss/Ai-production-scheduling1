import React, { useContext } from "react";
import { SalesDataContext } from "../../context/SalesDataContext"; 
import "../../pages/SalesPulse.css";

const ProductSalesTable = () => {
  const { salesData, loading } = useContext(SalesDataContext); 

  const products = salesData[0]?.products || [];

  return (
    <div className="section">
      <h3>Product-wise Sales</h3>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-muted">No data available for selected week.</p>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Units Sold</th>
              <th>Revenue</th>
              <th>Stock Remaining</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.quantitySold}</td>
                <td>₹{item.revenue}</td>
                <td>{item.remainingStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductSalesTable;
