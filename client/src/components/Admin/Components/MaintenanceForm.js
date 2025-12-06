import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/formstyles.css";

const MaintenanceForm = ({ onAddSuccess, editData }) => {
  const [assetName, setAssetName] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [technician, setTechnician] = useState("");
  const [maintenanceType, setMaintenanceType] = useState("routine");
  const [maintenanceFrequency, setMaintenanceFrequency] = useState("monthly");
  const [status, setStatus] = useState("scheduled");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (editData) {
      setAssetName(editData.assetName);
      setScheduledDate(editData.scheduledDate);
      setTechnician(editData.technician);
      setMaintenanceType(editData.maintenanceType);
      setMaintenanceFrequency(editData.maintenanceFrequency);
      setStatus(editData.status);
      setIsEditMode(true);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/admin/maintenance/${editData._id}`,
          {
            assetName,
            scheduledDate: new Date(scheduledDate),
            technician,
            maintenanceType,
            maintenanceFrequency,
            status,
          }
        );
        alert("Maintenance updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/admin/maintenance", {
          assetName,
          scheduledDate: new Date(scheduledDate),
          technician,
          maintenanceType,
          maintenanceFrequency,
          status,
        });
        alert("Maintenance scheduled successfully");
      }

      onAddSuccess();
      setAssetName("");
      setScheduledDate("");
      setTechnician("");
      setMaintenanceType("routine");
      setMaintenanceFrequency("monthly");
      setStatus("scheduled");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error submitting maintenance:", error);
      alert(error.response?.data?.error || "Error scheduling maintenance");
    }
  };

  return (
    <form className="fill-main" onSubmit={handleSubmit}>
      <div className="maintenance-grid">
        <label>
          Asset Name :{" "}
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            required
          />
        </label>

        <label>
          Scheduled Date :{" "}
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />
        </label>

        <label>
          Technician Name :{" "}
          <input
            type="text"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            required
          />
        </label>

        <label>
          Maintenance Type :{" "}
          <select
            value={maintenanceType}
            onChange={(e) => setMaintenanceType(e.target.value)}
          >
            <option value="routine">Routine</option>
            <option value="emergency">Emergency</option>
            <option value="repair">Repair</option>
          </select>
        </label>

        <label>
          Maintenance Frequency :{" "}
          <select
            value={maintenanceFrequency}
            onChange={(e) => setMaintenanceFrequency(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </label>

        <label>
          Status :{" "}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <button className="en-button" type="submit">
        {isEditMode ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default MaintenanceForm;
