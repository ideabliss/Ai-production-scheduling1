import React from "react";
import "../components/Header.css"; // 

const Header = ({ title, subtitle }) => {
  return (
    <div className="dashboard-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default Header;
