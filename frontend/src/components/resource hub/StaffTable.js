// src/components/StaffTable.js
import React from "react";
import "../../pages/ResourceHub.css"; // Adjust the path as necessary

const StaffTable = ({ staff }) => {
  return (
    <div className="resource-table">
      <h3>Staff Roster</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Shift</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.role}</td>
              <td>{person.shift}</td>
              <td>{person.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
