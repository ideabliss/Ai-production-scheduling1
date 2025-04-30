import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import OverviewCards from "../components/resource hub/OverviewCards";
import RawMaterialTable from "../components/resource hub/RawMaterialTable";
import MachineTable from "../components/resource hub/MachineTable";
import StaffTable from "../components/resource hub/StaffTable";
import "./ResourceHub.css";

const ResourceHub = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [rawMaterials] = useState([
    { name: "Sugar", quantity: "5,000", unit: "Kg", expiry: "May 30, 2025" },
    { name: "Citric Acid", quantity: "2,200", unit: "Kg", expiry: "June 12, 2025" },
    { name: "PET Bottles", quantity: "12,000", unit: "Units", expiry: "-" },
  ]);

  const [machines, setMachines] = useState([]);
  const [staff, setStaff] = useState([]);

  const [machineName, setMachineName] = useState("");
  const [newStaff, setNewStaff] = useState({ name: "", role: "", shift: "", contact: "" });
  const [selectedMachine, setSelectedMachine] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [maintenanceStatus, setMaintenanceStatus] = useState("");

  // Load data from backend
  useEffect(() => {
    fetch("/api/resources/")
      .then((res) => res.json())
      .then((data) => {
        setMachines(data.machines || []);
        setStaff(data.staff || []);
      })
      .catch((err) => console.error("Failed to load resource data", err));
  }, []);

  const overviewData = [
    { title: "Total Raw Materials", value: `${rawMaterials.length} Items` },
    { title: "Machines Operational", value: `${machines.filter(m => m.status === "Running").length}/${machines.length} Running` },
    { title: "Human Resources", value: `${staff.length} Staff` },
    { title: "Maintenance Alerts", value: `${machines.filter(m => m.status === "Stopped").length} Pending` },
  ];

  const handleAddMachine = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/resources/machine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: machineName,
          status: "Idle",
          lastServiced: "Not Serviced Yet",
        }),
      });
      setMachines([...machines, { name: machineName, status: "Idle", lastServiced: "Not Serviced Yet" }]);
      setMachineName("");
      setActiveForm(null);
    } catch (err) {
      console.error("Error adding machine:", err);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/resources/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaff),
      });
      setStaff([...staff, newStaff]);
      setNewStaff({ name: "", role: "", shift: "", contact: "" });
      setActiveForm(null);
    } catch (err) {
      console.error("Error adding staff:", err);
    }
  };

  const handleScheduleMaintenance = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/resources/maintenance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          machineName: selectedMachine,
          status: maintenanceStatus,
          lastServiced: maintenanceDate,
        }),
      });
      setMachines(
        machines.map((m) =>
          m.name === selectedMachine
            ? { ...m, status: maintenanceStatus, lastServiced: maintenanceDate }
            : m
        )
      );
      setSelectedMachine("");
      setMaintenanceDate("");
      setMaintenanceStatus("");
      setActiveForm(null);
    } catch (err) {
      console.error("Error scheduling maintenance:", err);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4 resourcehub-main">
        <Header
          title="Resource Hub"
          subtitle="Manage raw materials, machines, and staff resources efficiently"
        />
        <OverviewCards data={overviewData} />

        <div className="my-4">
          <button className="btn btn-primary me-2" onClick={() => setActiveForm("add-machine")}>
            Add Machine
          </button>
          <button className="btn btn-success me-2" onClick={() => setActiveForm("add-staff")}>
            Add Staff
          </button>
          <button className="btn btn-warning" onClick={() => setActiveForm("maintenance")}>
            Schedule Maintenance
          </button>
        </div>

        {/* Add Machine Modal */}
        <div className={`modal fade ${activeForm === "add-machine" ? "show d-block" : ""}`} tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleAddMachine}>
              <div className="modal-header">
                <h5 className="modal-title">Add Machine</h5>
                <button type="button" className="btn-close" onClick={() => setActiveForm(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Machine Name"
                  value={machineName}
                  onChange={(e) => setMachineName(e.target.value)}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" className="btn btn-secondary" onClick={() => setActiveForm(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>

        {/* Add Staff Modal */}
        <div className={`modal fade ${activeForm === "add-staff" ? "show d-block" : ""}`} tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleAddStaff}>
              <div className="modal-header">
                <h5 className="modal-title">Add Staff</h5>
                <button type="button" className="btn-close" onClick={() => setActiveForm(null)}></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Name" value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} required />
                <input className="form-control mb-2" placeholder="Role" value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })} required />
                <input className="form-control mb-2" placeholder="Shift" value={newStaff.shift}
                  onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })} required />
                <input className="form-control" placeholder="Contact" value={newStaff.contact}
                  onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })} required />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Add</button>
                <button type="button" className="btn btn-secondary" onClick={() => setActiveForm(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>

        {/* Schedule Maintenance Modal */}
        <div className={`modal fade ${activeForm === "maintenance" ? "show d-block" : ""}`} tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleScheduleMaintenance}>
              <div className="modal-header">
                <h5 className="modal-title">Schedule Maintenance</h5>
                <button type="button" className="btn-close" onClick={() => setActiveForm(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Machine</label>
                  <select className="form-select" value={selectedMachine}
                    onChange={(e) => setSelectedMachine(e.target.value)} required>
                    <option value="">Select Machine</option>
                    {machines.map((machine, index) => (
                      <option key={index} value={machine.name}>{machine.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Maintenance Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={maintenanceDate}
                    onChange={(e) => setMaintenanceDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={maintenanceStatus}
                    onChange={(e) => setMaintenanceStatus(e.target.value)}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Running">Running</option>
                    <option value="Idle">Idle</option>
                    <option value="Stopped">Stopped</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-warning">Schedule</button>
                <button type="button" className="btn btn-secondary" onClick={() => setActiveForm(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <RawMaterialTable materials={rawMaterials} />
        <MachineTable machines={machines} />
        <StaffTable staff={staff} />
      </div>
    </div>
  );
};

export default ResourceHub;
