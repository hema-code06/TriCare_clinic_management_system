import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import DoctorTable from "../Components/DoctorTable";
import DoctorForm from "../Components/DoctorForm";
import DoctorDetail from "../Components/DoctorDetail";
import "../styles/mainpage.css";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showDoctorDetail, setShowDoctorDetail] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (doctor) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      });
      if (res.ok) {
        fetchDoctors();
        closeAddModal();
      }
    } catch (error) {
      console.error("Failed to add doctor:", error);
    }
  };

  const handleUpdateDoctor = async (doctor) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/doctors/${doctor._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(doctor),
        }
      );
      if (res.ok) {
        fetchDoctors();
        closeAddModal();
      }
    } catch (error) {
      console.error("Failed to update doctor:", error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/doctors/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchDoctors();
        closeDetailModal();
      }
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const closeAddModal = () => {
    setIsAdding(false);
    fetchDoctors();
  };

  const closeDetailModal = () => {
    setShowDoctorDetail(false);
    fetchDoctors();
  };

  const handleEditClick = () => {
    if (selectedDoctor) {
      setIsAdding(true);
      setShowDoctorDetail(false);
    }
  };

  return (
    <div className="management-page">
      <h1>Doctors</h1>
      <button
        className="record-button"
        onClick={() => {
          setIsAdding(true);
          setSelectedDoctor(null);
        }}
      >
        Add Record
      </button>

      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-button" onClick={closeAddModal}>
              <MdClose size={24} />
            </button>
            <DoctorForm
              onSubmit={selectedDoctor ? handleUpdateDoctor : handleAddDoctor}
              initialData={selectedDoctor}
            />
          </div>
        </div>
      )}

      {showDoctorDetail && selectedDoctor && (
        <div className="detail-modal-overlay">
          <div className="detail-modal-content">
            <button className="detail-close-button" onClick={closeDetailModal}>
              <MdClose size={24} />
            </button>
            <DoctorDetail
              doctor={selectedDoctor}
              onEdit={handleEditClick}
              onDelete={() => handleDeleteDoctor(selectedDoctor._id)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        !isAdding &&
        !showDoctorDetail && (
          <DoctorTable
            doctors={doctors}
            onCardClick={(id) => {
              const doctor = doctors.find((doc) => doc._id === id);
              setSelectedDoctor(doctor);
              setShowDoctorDetail(true);
            }}
          />
        )
      )}
    </div>
  );
};

export default DoctorManagement;
