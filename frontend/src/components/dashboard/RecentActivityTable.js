// src/components/Dashboard/RecentActivityTable.js
import React from "react";
import "../../pages/Dashboard.css";

const RecentActivityTable = () => {
  return (
    <div className="table-container" style={{ marginTop: "30px" }}>
      <h3>Recent Activity</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Batch ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>April 08, 2025</td>
            <td>#BATCH1001</td>
            <td>Mango Juice</td>
            <td>3,000</td>
            <td style={{ color: "green" }}>Completed</td>
          </tr>
          <tr>
            <td>April 07, 2025</td>
            <td>#BATCH0998</td>
            <td>Orange Cola</td>
            <td>2,500</td>
            <td style={{ color: "green" }}>Completed</td>
          </tr>
          <tr>
            <td>April 05, 2025</td>
            <td>#BATCH0989</td>
            <td>Lychee Water</td>
            <td>2,000</td>
            <td style={{ color: "orange" }}>In Progress</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivityTable;
