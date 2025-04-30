// src/components/OverviewCards.js
import React from "react";
import "../../pages/ResourceHub.css"; // Adjust the path as necessary

const OverviewCards = ({ data }) => {
  return (
    <div className="overview-cards">
      {data.map((card, index) => (
        <div className="overview-card" key={index}>
          <h5>{card.title}</h5>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
