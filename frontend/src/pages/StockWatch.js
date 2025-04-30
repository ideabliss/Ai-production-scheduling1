import React from 'react';
import './StockWatch.css';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import OverviewCards from '../components/stockwatch/OverviewCards';
import StockCharts from '../components/stockwatch/StockCharts';
import InventoryTable from '../components/stockwatch/InventoryTable';
import ReplenishmentTable from '../components/stockwatch/ReplenishmentTable';
import StockAlerts from '../components/stockwatch/StockAlerts';
import StockActions from '../components/stockwatch/StockActions';
import { StockWatchProvider } from "../context/StockWatchContext";

const StockWatch = () => {
  return (
    < StockWatchProvider>
    <div className="stockwatch-wrapper">
      <Sidebar />
      <div className="stockwatch-container">
        <Header
          title="Stock Overview"
          subtitle="Manage stock, and staff resources efficiently"
        />
        <OverviewCards />
        <StockCharts />
        <InventoryTable />
        <ReplenishmentTable />
        <StockAlerts />
        <StockActions />
      </div>
    </div>
    </StockWatchProvider>
  );
};

export default StockWatch;
