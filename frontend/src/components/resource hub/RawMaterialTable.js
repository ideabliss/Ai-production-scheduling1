// src/context/StockWatchContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const StockWatchContext = createContext();

const StockWatchProvider = ({ children }) => {
  const [stockOrders, setStockOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stock orders or use static data for example purposes
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setStockOrders([
        // Example data
        { id: 1, itemName: 'Bottle', category: 'Packaging', quantity: 5000, pricePerUnit: 5, supplierName: 'Supplier A', expectedDate: '2025-04-15' },
        { id: 2, itemName: 'Bottle', category: 'Packaging', quantity: 3000, pricePerUnit: 5, supplierName: 'Supplier B', expectedDate: '2025-04-30' },
        // Add more stock orders here
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <StockWatchContext.Provider value={{ stockOrders, loading, error }}>
      {children}
    </StockWatchContext.Provider>
  );
};

export default StockWatchProvider;
