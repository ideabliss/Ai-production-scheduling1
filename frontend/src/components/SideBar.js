import React from "react";
import { NavLink } from "react-router-dom";
import "../components/SideBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SideBar = () => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      window.location.href = "/login";
    }
  };

  return (
    <div className="sidebar">
       <h4>Gen Scheduler</h4>
      <div className="menu-group">
        <div className="menu-group-title">Main Dashboard</div>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
              <i className="fas fa-chart-line"></i> Dashboard
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menu-group">
        <div className="menu-group-title">Data Management</div>
        <ul>
          <li>
            <NavLink to="/resource-hub" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
              <i className="fas fa-cubes"></i> Resource Hub
            </NavLink>
          </li>
          <li>
            <NavLink to="/sales-pulse" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
              <i className="fas fa-chart-pie"></i> Sales Pulse
            </NavLink>
          </li>
          <li>
            <NavLink to="/stockwatch" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
              <i className="fas fa-warehouse"></i> StockWatch
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menu-group">
        <div className="menu-group-title">Forecasting</div>
        <ul>
          <li>
            <NavLink to="/futurecast" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
              <i className="fas fa-forward"></i> FutureCast
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menu-group">
        <div className="menu-group-title">Production</div>
        <ul>
          <li>
            <NavLink to="/plancraft" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
              <i className="fas fa-tasks"></i> PlanCraft
            </NavLink>
          </li>
          
        </ul>
      </div>

      <div className="menu-group">
    
      </div>

      <div className="menu-group">
        <ul>
         
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
