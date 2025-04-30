import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../../pages/SalesPulse.css";


const dummySalesData = [
  { date: "Mon", sales: 200 },
  { date: "Tue", sales: 250 },
  { date: "Wed", sales: 300 },
  { date: "Thu", sales: 280 },
  { date: "Fri", sales: 350 },
  { date: "Sat", sales: 400 },
  { date: "Sun", sales: 380 },
];

const SalesTrendChart = () => {
  return (
    <div className="section">
      <h3>Weekly Sales Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dummySalesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrendChart;
