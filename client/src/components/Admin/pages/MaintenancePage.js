import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import MaintenanceForm from "../Components/MaintenanceForm";
import MaintenanceList from "../Components/MaintenanceList";
import "../styles/mainpage.css";

const MaintenancePage = () => {
  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleRefresh = () => setRefresh((prev) => !prev);

  const handleEditClick = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  return (
    <div className="management-page">
      <h1>Maintenance </h1>
      <button
        className="record-button"
        onClick={() => {
          setEditData(null);
          setIsModalOpen(true);
        }}
      >
        Manage Maintenance
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-button" onClick={closeModal}>
              <MdClose size={24} />
            </button>
            <MaintenanceForm
              onAddSuccess={() => {
                toggleRefresh();
                closeModal();
              }}
              editData={editData}
            />
          </div>
        </div>
      )}

      <MaintenanceList refresh={refresh} onEditClick={handleEditClick} />
    </div>
  );
};

export default MaintenancePage;
