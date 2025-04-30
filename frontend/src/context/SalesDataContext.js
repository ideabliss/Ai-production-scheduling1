import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SalesDataContext = createContext();

export const SalesDataProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(""); // Change to handle month
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch sales data for the selected month
  const fetchSalesData = async (monthYear) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/sales/sales/month`, {
        params: { monthYear }, // Pass the month in YYYY-MM format
      });
      setSalesData(res.data);
      setError(null); // Reset error on success
    } catch (err) {
      console.error("Fetch error:", err);
      setSalesData([]);
      setError("Failed to fetch sales data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data whenever selectedMonth changes
  useEffect(() => {
    if (selectedMonth) {
      fetchSalesData(selectedMonth); // Fetch data when selectedMonth changes
    }
  }, [selectedMonth]); // Re-run when selectedMonth changes

  // Function to get the current month in YYYY-MM format
  const getCurrentMonth = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Months are 0-indexed, so we add 1
    const year = currentDate.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}`; // Ensure MM is always two digits
  };

  // Set the initial month when the component mounts
  useEffect(() => {
    const currentMonth = getCurrentMonth(); // Dynamically calculate the current month
    setSelectedMonth(currentMonth);
  }, []);

  return (
    <SalesDataContext.Provider value={{ selectedMonth, setSelectedMonth, salesData, loading, error }}>
      {children} {/* Pass down the context to child components */}
    </SalesDataContext.Provider>
  );
};
