// src/components/MachineTable.js
import React from "react";
import "../../pages/ResourceHub.css"; // Adjust the path as necessary

const MachineTable = ({ machines }) => {
  return (
    <div className="resource-table">
      <h3>Machine Details</h3>
      <table>
        <thead>
          <tr>
            <th>Machine Name</th>
            <th>Status</th>
            <th>Last Serviced</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((mac, index) => (
            <tr key={index}>
              <td>{mac.name}</td>
              <td>{mac.status}</td>
              <td>{mac.lastServiced}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineTable;
