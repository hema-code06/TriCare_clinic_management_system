import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MaintenanceList.css";

const MaintenanceList = ({ refresh, onEditClick }) => {
  const [maintenanceList, setMaintenanceList] = useState([]);

  const fetchMaintenanceData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/maintenance"
      );
      setMaintenanceList(response.data);
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
      alert("Failed to fetch maintenance schedules.");
    }
  };

  useEffect(() => {
    fetchMaintenanceData();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/maintenance/${id}`);
      alert("Maintenance record deleted successfully");
      fetchMaintenanceData();
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete the record.");
    }
  };

  const handleEdit = (item) => {
    onEditClick(item);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Asset Name</th>
          <th>Scheduled Date</th>
          <th>Technician</th>
          <th>Maintenance Type</th>
          <th>Maintenance Frequency</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {maintenanceList.map((item) => (
          <tr key={item._id}>
            <td>{item.assetName}</td>
            <td>{new Date(item.scheduledDate).toLocaleDateString()}</td>
            <td>{item.technician}</td>
            <td>{item.maintenanceType}</td>
            <td>{item.maintenanceFrequency}</td>
            <td>{item.status}</td>
            <td>
              <button
                style={{ color: "teal" }}
                onClick={() => handleEdit(item)}
              >
                {" "}
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                style={{ color: "rgb(251, 90, 90)" }}
                onClick={() => handleDelete(item._id)}
              >
                {" "}
                <i className="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MaintenanceList;
