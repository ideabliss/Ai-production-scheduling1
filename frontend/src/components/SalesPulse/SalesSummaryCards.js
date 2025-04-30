import React, { useContext } from "react";
import { SalesDataContext } from "../../context/SalesDataContext";

const SalesSummaryCards = () => {
  const { selectedMonth, setSelectedMonth, salesData, loading } = useContext(SalesDataContext);

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
  };

  // Show loading state until the data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Default totals and products if no data exists
  const totals = salesData[0]?.totals || {};
  const products = salesData[0]?.products || [];

  const getTopProductName = (data) => {
    if (!data.length) return "-";
    const topProduct = data.reduce((top, p) => (p.quantitySold > top.quantitySold ? p : top));
    return topProduct.productName || "-";
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <label>Select Month:</label>
        <input
          type="month"
          className="form-control w-25"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>

      <div className="card-grid">
        <div className="overview-card">
          <h5>Total Sales (Month)</h5>
          <p>₹{totals.revenue || 0}</p>
        </div>
        <div className="overview-card">
          <h5>Units Sold</h5>
          <p>{totals.unitsSold || 0}</p>
        </div>
        <div className="overview-card">
          <h5>Revenue</h5>
          <p>₹{totals.revenue || 0}</p>
        </div>
        <div className="overview-card">
          <h5>Top-Selling Product</h5>
          <p>{getTopProductName(products)}</p>
        </div>
      </div>
    </div>
  );
};

export default SalesSummaryCards;
