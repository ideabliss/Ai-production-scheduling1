import React from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import SummaryCards from "../components/dashboard/SummaryCards";
import ProductionSummaryTable from "../components/dashboard/ProductionSummaryTable";
import RecentActivityTable from "../components/dashboard/RecentActivityTable";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header
          title="Gen-Scheduler Dashboard"
          subtitle="Monitor total production, progress, and performance"
        />
        <SummaryCards />
        <ProductionSummaryTable />
      </div>
    </div>
  );
};

export default Dashboard;
