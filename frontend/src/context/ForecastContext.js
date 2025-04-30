import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ForecastContext = createContext();

export const useForecast = () => useContext(ForecastContext);

export const ForecastProvider = ({ children }) => {
  const [monthYear, setMonthYear] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForecastData = async (selectedMonth) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/forecast/forecast?monthYear=${selectedMonth}`);
      setForecastData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecastData(monthYear);
  }, [monthYear]);

  return (
    <ForecastContext.Provider
      value={{
        forecastData,
        monthYear,
        setMonthYear,
        loading,
        error,
        refresh: () => fetchForecastData(monthYear),
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};
