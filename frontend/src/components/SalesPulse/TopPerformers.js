import React from "react";
import "../../pages/SalesPulse.css";


const topPerformers = [
  { name: "Alice", sales: 3200 },
  { name: "Bob", sales: 2900 },
  { name: "Charlie", sales: 2700 },
];

const TopPerformers = () => {
  return (
    <div className="section">
      <h3>Top Performers</h3>
      <ul className="bullet-list">
        {topPerformers.map((person, idx) => (
          <li key={idx}>
            {person.name} - ₹{person.sales}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPerformers;
