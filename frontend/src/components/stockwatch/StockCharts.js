import React, { useContext, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { StockWatchContext } from '../../context/StockWatchContext'; // 👈 Use the context
import "../../pages/StockWatch.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const StockCharts = () => {
  const { stockOrders, loading, error } = useContext(StockWatchContext);
  const [distributionData, setDistributionData] = useState(null);
  const [upcomingStocks, setUpcomingStocks] = useState([]);

  useEffect(() => {
    if (stockOrders.length > 0) {
      // Group by item name for distribution data but filter out future stock
      const itemCounts = {};
      const upcomingOrders = [];

      stockOrders.forEach((order) => {
        const orderDate = new Date(order.expectedDate);
        const today = new Date();

        if (orderDate >= today) {
          // Upcoming stock
          upcomingOrders.push(order);
        } else {
          // Current stock for distribution chart
          itemCounts[order.itemName] = (itemCounts[order.itemName] || 0) + order.quantity;
        }
      });

      // Set the distribution data only with items in stock (before today)
      setDistributionData({
        labels: Object.keys(itemCounts),
        datasets: [
          {
            label: 'Stock Units',
            data: Object.values(itemCounts),
            backgroundColor: ['#36b9cc', '#4e73df', '#1cc88a', '#f6c23e', '#e74a3b'],
          },
        ],
      });

      // Set the upcoming stock data
      const sortedUpcomingOrders = upcomingOrders
        .sort((a, b) => new Date(a.expectedDate) - new Date(b.expectedDate)); // Sort by expected date

      setUpcomingStocks(sortedUpcomingOrders);
    }
  }, [stockOrders]);

  if (loading) return <div>Loading charts...</div>;
  if (error) return <div>{error}</div>;
  if (!distributionData || !upcomingStocks) return <div>No chart data available</div>;

  return (
    <div className="chart-section">
      {/* Stock Distribution Chart */}
      <div className="chart-card">
        <h4>Stock Distribution</h4>
        <Pie data={distributionData} />
      </div>

      {/* Upcoming Stock Orders Section */}
      <div className="chart-card upcoming-stocks">
        <h4>Upcoming Stock Orders</h4>
        <ul>
          {upcomingStocks.map((order, index) => (
            <li key={index}>
              <div className="order-info">
                <strong>{order.itemName}</strong> (Quantity: {order.quantity})
                <br />
                Expected Date: {new Date(order.expectedDate).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockCharts;
