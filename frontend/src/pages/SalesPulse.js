import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import SalesSummaryCards from "../components/SalesPulse/SalesSummaryCards";
import ProductSalesTable from "../components/SalesPulse/ProductSalesTable";
import RegionSalesChart from "../components/SalesPulse/RegionSalesChart";
import TopPerformers from "../components/SalesPulse/TopPerformers";
import SalesCSVUpload from "../components/SalesPulse/SalesCSVUpload";
import SalesAlerts from "../components/SalesPulse/SalesAlerts";
import { SalesDataProvider } from "../context/SalesDataContext"; // yeh important hai
import "./SalesPulse.css";

const SalesPulse = () => {
  return (
    <SalesDataProvider>
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <Header title="Sales Pulse" />

          <div className="sales-pulse-container">
            <SalesSummaryCards />
            <ProductSalesTable />
            <RegionSalesChart />
            <SalesCSVUpload />
            <SalesAlerts />
          </div>
        </div>
      </div>
    </SalesDataProvider>
  );
};

export default SalesPulse;
