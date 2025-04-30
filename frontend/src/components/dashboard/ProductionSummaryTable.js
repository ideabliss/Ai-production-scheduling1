// src/components/Dashboard/ProductionSummaryTable.js
import React, { useEffect, useState } from "react";
import "../../pages/Dashboard.css";
import axios from "axios";

const ProductionSummaryTable = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // Fetch production plan schedule for the current monthYear
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setError(null);
        const monthYear = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`; // Current monthYear
        const { data } = await axios.get('/api/productionPlan/schedule', {
          params: { monthYear }
        });

        // Flatten the data to match the required table structure
        const flatTasks = (data.schedule.tasks || []).map((t, i) => ({
          id: String(i + 1),
          name: t.product,
          shift: t.shift || 'Shift A',
          unitsToProduce: t.unitsToProduce
        }));

        setTasks(flatTasks);
      } catch (e) {
        console.error('Error fetching production plan:', e.response || e);
        setError(
          e.response
            ? `${e.response.status} ${e.response.statusText}: ${e.response.data.message}`
            : e.message
        );
      }
    };

    fetchTasks();
  }, []);

  if (error) {
    return (
      <div className="table-container">
        <h3>Production Summary</h3>
        <p>Error fetching data: {error}</p>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="table-container">
        <h3>Production Summary</h3>
        <p>No production tasks available.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h3>Production Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Units to Produce</th>
            <th>Shift</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.unitsToProduce}</td>
              <td>{task.shift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionSummaryTable;
