// src/pages/PlanCraft.js

import React, { useEffect, useRef, useState } from 'react';
import './frappe-gantt.css';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import Gantt from 'frappe-gantt';
import './PlanCraft.css';
import axios from 'axios';
import ProductionSummaryTable from '../components/dashboard/ProductionSummaryTable'; // Import the ProductionSummaryTable component

const PlanCraft = () => {
  const ganttRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [machines, setMachines] = useState([]);

  // Compute current monthYear as "YYYY-MM"
  const monthYear = React.useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }, []);

  // Fetch schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setError(null);
        const { data } = await axios.get('/api/productionPlan/schedule', {
          params: { monthYear }
        });

        const flat = (data.schedule.tasks || []).map((t, i) => ({
          id: String(i + 1),
          name: t.product,
          start: t.start,
          end: t.end,
          progress: 0,
          shift: t.shift || 'Shift A',
          unitsToProduce: t.unitsToProduce,
          rawMaterials: Array.isArray(t.rawMaterials) ? t.rawMaterials.join(', ') : t.rawMaterials
        }));

        setTasks(flat);
      } catch (e) {
        console.error('Error fetching plan:', e.response || e);
        setError(
          e.response
            ? `${e.response.status} ${e.response.statusText}: ${e.response.data.message}`
            : e.message
        );
      }
    };

    fetchSchedule();
  }, [monthYear]);

  // Fetch machines
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const { data } = await axios.get('/api/resources/'); // <-- FIXED URL
        setMachines(data.machines || []);
      } catch (e) {
        console.error('Error fetching machines:', e.response?.data || e.message);
        setMachines([]);
      }
    };
  
    fetchMachines();
  }, []);

  // Render Gantt
  useEffect(() => {
    if (ganttRef.current && tasks.length) {
      ganttRef.current.innerHTML = '';
      new Gantt(ganttRef.current, tasks, {
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
        custom_popup_html: task => `
          <div class="popup-wrapper">
            <div class="title">${task.name}</div>
            <div class="subtitle">Shift: ${task.shift}</div>
            <div class="subtitle">Units: ${task.unitsToProduce}</div>
            <div class="details">Materials: ${task.rawMaterials}</div>
            <div class="details">From ${task.start} to ${task.end}</div>
          </div>
        `
      });
    }
  }, [tasks]);

  const activeMachineCount = machines.filter(
    m => m.status?.toLowerCase() === 'running'
  ).length;

  return (
    <div className="plancraft-container">
      <Sidebar />
      <div className="plancraft-content">
        <Header title="Plan Craft" />

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>Error fetching the production plan: {error}</p>
          </div>
        )}

        {/* Overview */}
        <div className="overview-cards">
          <div className="overview-card">
            <h5>Total Tasks</h5>
            <p>{tasks.length}</p>
          </div>
          <div className="overview-card">
            <h5>Active Machines</h5>
            <p>{activeMachineCount}</p>
          </div>
          
          <div className="overview-card">
            <h5>Pending</h5>
            <p>{tasks.length}</p>
          </div>
        </div>

        {/* Gantt */}
        <div className="section">
          <h4>Production Timeline</h4>
          <div className="gantt-chart-wrapper">
            <div className="gantt-container" ref={ganttRef}></div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="section">
          <h4>Production Queue</h4>
          <table className="queue-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Start</th>
                <th>End</th>
                <th>Units to Produce</th>
                <th>Shift</th>
                <th>Raw Materials</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.name}</td>
                  <td>{t.start}</td>
                  <td>{t.end}</td>
                  <td>{t.unitsToProduce}</td>
                  <td>{t.shift}</td>
                  <td>{t.rawMaterials}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Notes */}
        <div className="section">
          <h4>AI Scheduling Suggestions</h4>
          <ul>
            <li>Ensure raw materials arrive 2 days before start dates.</li>
            <li>Stagger machine usage to minimize downtime.</li>
            <li>Review and adjust next month based on actual demand.</li>
          </ul>
        </div>

        {/* Production Summary Table */}
        <div className="section">
          <ProductionSummaryTable tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default PlanCraft;
