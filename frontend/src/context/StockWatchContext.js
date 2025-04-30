import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context
export const StockWatchContext = createContext();

// Create a provider component
export const StockWatchProvider = ({ children }) => {
  const [stockOrders, setStockOrders] = useState([]); // Stores fetched stock orders
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [error, setError] = useState(null); // Error state for fetching errors

  // Fetch data from the backend
  const fetchStockOrders = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors

      // ✅ You can remove full URL if using proxy in package.json
      const response = await axios.get('http://localhost:5000/api/stock/orders');

      // ✅ Support both raw array or { orders: [...] } format
      if (Array.isArray(response.data)) {
        setStockOrders(response.data);
      } else if (response.data && Array.isArray(response.data.orders)) {
        setStockOrders(response.data.orders);
      } else {
        setError('No valid stock orders found in response');
      }
    } catch (err) {
      console.error('Error fetching stock orders:', err);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockOrders();
  }, []);

  return (
    <StockWatchContext.Provider value={{ stockOrders, loading, error }}>
      {children}
    </StockWatchContext.Provider>
  );
};
