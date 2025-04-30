import React, { useContext } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { SalesDataContext } from "../../context/SalesDataContext"; // context import
import "../../pages/SalesPulse.css";

const RegionSalesChart = () => {
  const { salesData, loading } = useContext(SalesDataContext); // context use
  const regionSales = salesData[0]?.regionSales || {};

  // Convert regionSales object to array for chart
  const chartData = [
    { region: "Mumbai", sales: regionSales.North || 0 },
    { region: "Delhi", sales: regionSales.East || 0 },
    { region: "Bangalore", sales: regionSales.West || 0 },
    { region: "Chennai", sales: regionSales.South || 0 },
  ];

  return (
    <div className="section">
      <h3>Region-wise Sales</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RegionSalesChart;
