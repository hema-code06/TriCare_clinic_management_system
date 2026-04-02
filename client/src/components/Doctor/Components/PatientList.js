import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PatientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/doctor/patients`
        );
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to load patient list.");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const fetchPatientDetails = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/doctor/patient/${id}`
      );
      setPatientDetails(response.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching patient details:", err);
      setError("Failed to fetch patient details.");
    }
  };

  const openModal = (id) => {
    setSelectedPatientId(id);
    fetchPatientDetails(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatientId(null);
    setPatientDetails(null);
  };

  return (
    <div className="doctor-patient-content">
      <h1 style={{ textAlign: "center", color: "teal" }}>Patient Records</h1>

      <section className="patient-list">
        {loading ? (
          <p>Loading patients...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <div className="patient-cards">
            {patients.map((patient) => (
              <div key={patient.patientId} className="patient-card">
                <h3>{patient.fullname}</h3>
                <p>
                  <strong style={{ color: "coral" }}>Patient ID :</strong>{" "}
                  {patient.patientId}
                </p>
                <button
                  className="view-details"
                  onClick={() => openModal(patient.patientId)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {isModalOpen && patientDetails && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Patient Details</h2>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="details-grid">
                <div className="detail-item">
                  <label>Patient ID :</label>
                  <span>{patientDetails.patientId}</span>
                </div>
                <div className="detail-item">
                  <label>Full Name :</label>
                  <span>{patientDetails.fullname}</span>
                </div>
                <div className="detail-item">
                  <label>Age :</label>
                  <span>{patientDetails.age || "N/A"}</span>
                </div>
                <div className="detail-item">
                  <label>Gender :</label>
                  <span>{patientDetails.gender || "N/A"}</span>
                </div>
                <div className="detail-item">
                  <label>Phone :</label>
                  <span>{patientDetails.phone || "N/A"}</span>
                </div>
                <div className="detail-item">
                  <label>Email :</label>
                  <span>{patientDetails.email}</span>
                </div>
                <div className="detail-item">
                  <label>Location :</label>
                  <span>
                    {`${patientDetails.location.city || ""}, ${
                      patientDetails.location.state || ""
                    }, ${patientDetails.location.country || ""}`}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Blood Type :</label>
                  <span>{patientDetails.bloodType}</span>
                </div>
                <div className="detail-item">
                  <label>Occupation :</label>
                  <span>{patientDetails.occupation || "N/A"}</span>
                </div>
                <div className="detail-item">
                  <label>General Doctor :</label>
                  <span>{patientDetails.generalDoctorName || "N/A"}</span>
                </div>
                <div className="detail-item">
                  <label>Doctor Specialty :</label>
                  <span>{patientDetails.doctorSpeciality || "N/A"}</span>
                </div>
                <div className="detail-item">
                  <label>Insurance :</label>
                  <span>
                    {patientDetails.insuranceInformation?.provider
                      ? `${patientDetails.insuranceInformation.provider} (Policy #: ${patientDetails.insuranceInformation.policyNumber})`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
