import React, { useEffect, useRef } from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import Gantt from "frappe-gantt";
import "./SyncFlowPage.css";

const SyncFlowPage = () => {
  const ganttRef = useRef(null);

  const tasks = [
    {
      id: "Task 1",
      name: "Raw Material Prep",
      start: "2025-04-10",
      end: "2025-04-12",
      progress: 30,
      dependencies: "",
    },
    {
      id: "Task 2",
      name: "Blending",
      start: "2025-04-13",
      end: "2025-04-15",
      progress: 60,
      dependencies: "Task 1",
    },
    {
      id: "Task 3",
      name: "Bottling",
      start: "2025-04-16",
      end: "2025-04-17",
      progress: 20,
      dependencies: "Task 2",
    },
    {
      id: "Task 4",
      name: "Packaging",
      start: "2025-04-18",
      end: "2025-04-19",
      progress: 0,
      dependencies: "Task 3",
    },
  ];

  useEffect(() => {
    if (ganttRef.current) {
      ganttRef.current.innerHTML = "";
      new Gantt(ganttRef.current, tasks, {
        view_mode: "Day",
        custom_popup_html: (task) => {
          return `
            <div class='popup-wrapper'>
              <div class='title'>${task.name}</div>
              <div class='subtitle'>${task._start.toDateString()} → ${task._end.toDateString()}</div>
              <div class='details'>Progress: ${task.progress}%</div>
              <div class='actions'>
                <button class='action-btn'>Edit</button>
                <button class='action-btn'>Delete</button>
              </div>
            </div>`;
        },
      });
    }
  }, []);

  return (
    <div className="syncflow-container">
      <Sidebar />
      <div className="syncflow-content">
        <Header title="Sync Flow" />

        {/* === Overview Cards === */}
        <div className="overview-cards">
          <div className="overview-card synced">
            <h5>Synced Tasks</h5>
            <p>12 Tasks Synced</p>
          </div>
          <div className="overview-card outofsync">
            <h5>Out-of-Sync Tasks</h5>
            <p>5 Tasks</p>
          </div>
          <div className="overview-card bottlenecks">
            <h5>Bottlenecks Detected</h5>
            <p>3 Issues</p>
          </div>
          <div className="overview-card ai">
            <h5>AI Suggestions</h5>
            <p>Available</p>
          </div>
        </div>

        {/* === Gantt Timeline === */}
        <div className="section">
          <h4>Flow Timeline / Visualization</h4>
          <div className="gantt-chart-wrapper">
            <div className="gantt-container" ref={ganttRef}></div>
          </div>
        </div>

        {/* === AI Suggestions & Manual Edits === */}
        <div className="section suggestions-grid">
          <div className="suggestion-card">
            <h5>AI Suggestions</h5>
            <ul>
              <li>Reschedule Task X to 2PM</li>
              <li>Resolve machine conflict in Line 2</li>
              <li>Reassign Staff A to Task B</li>
            </ul>
            <button className="btn btn-success mt-3">Apply AI Suggestions</button>
          </div>
          </div> 

          <div className="section suggestions-grid">
          <div className="manual-card">
            <h5>Manual Adjustment</h5>
            <p>Edit tasks, drag to reschedule, update dependencies.</p>
            <div className="gantt-chart-wrapper">
              <div className="gantt-container"></div>
            </div>
          </div>
          </div>

        {/* === Actions === */}
        <div className="action-buttons">
          <button className="btn btn-primary">Re-sync Flow</button>
          <button className="btn btn-outline-secondary">Export Sync Report</button>
          <button className="btn btn-warning">Notify Teams</button>
        </div>
      </div>
    </div>
  );
};

export default SyncFlowPage;
