import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/FixAppointment.css";

const FixAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    preferredDate: "",
    preferredTimeSlot: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRescheduleMode, setIsRescheduleMode] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctor/appointmentconfirmation"
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      }
    };
    fetchAppointments();
  }, []);

  const handleAction = async (id, action, updatedInfo = null) => {
    try {
      const payload = { action, ...updatedInfo };
      const response = await axios.put(
        `http://localhost:5000/api/doctor/appointmentconfirmation/${id}`,
        payload
      );
      alert(response.data.message || "Action performed successfully!");
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id
            ? { ...appointment, status: action }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error performing action:", error.message);
      alert("Failed to perform action.");
    }
  };

  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsRescheduleMode(false);
    setSelectedAppointmentId(null);
    setUpdatedData({
      preferredDate: "",
      preferredTimeSlot: "",
    });
  };

  const handleDateChange = (e) => {
    setUpdatedData({
      ...updatedData,
      preferredDate: e.target.value,
    });
  };

  const handleTimeChange = (e) => {
    setUpdatedData({
      ...updatedData,
      preferredTimeSlot: e.target.value,
    });
  };

  const handleRescheduleSubmit = async () => {
    if (!updatedData.preferredDate || !updatedData.preferredTimeSlot) {
      alert("Please enter a valid date and time");
      return;
    }
    try {
      await handleAction(selectedAppointmentId, "Rescheduled", updatedData);
      const response = await axios.get(
        "http://localhost:5000/api/doctor/appointmentconfirmation"
      );
      setAppointments(response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error during rescheduling:", error.message);
      alert("Failed to reschedule appointment.");
    }
  };

  return (
    <div className="doctor-appointments">
      <h2 style={{ textAlign: "center", color: "teal" }}>Appointments</h2>
      <div className="appointments-list">
        {appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="appointment-card"
              onClick={() => handleCardClick(appointment)}
            >
              <div className="appointment-header">
                <h3>{appointment.fullName}</h3>
                <div className="appointment-status">
                  Status:{" "}
                  <span
                    style={{
                      color:
                        appointment.status === "Confirmed"
                          ? "green"
                          : appointment.status === "Rescheduled"
                          ? "blue"
                          : appointment.status === "Canceled"
                          ? "red"
                          : "coral",
                    }}
                  >
                    {appointment.status || "Pending"}
                  </span>
                </div>
              </div>
              <div className="appointment-details">
                <p>
                  <strong>Preferred Date :</strong> {appointment.preferredDate}
                </p>
                <p>
                  <strong>Preferred TimeSlot :</strong>{" "}
                  {appointment.preferredTimeSlot}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedAppointment && (
        <div className="modal-overlay">
          <div
            className={`modal-content ${
              isRescheduleMode ? "modal-expanded" : ""
            }`}
          >
            <h4>Appointment Details</h4>
            <button onClick={handleCloseModal} className="close-modal">
              ×
            </button>

            <div className="modal-layout">
              <div className="modal-left">
                <div className="input-group">
                  <strong>Name :</strong> {selectedAppointment.fullName}
                </div>
                <div className="input-group">
                  <strong>Gender :</strong> {selectedAppointment.gender}
                </div>
                <div className="input-group">
                  <strong>Contact :</strong> {selectedAppointment.contactNumber}
                </div>
                <div className="input-group">
                  <strong>Appointment Type :</strong>{" "}
                  {selectedAppointment.appointmentType}
                </div>
                <div className="input-group">
                  <strong>Consultation Mode :</strong>{" "}
                  {selectedAppointment.consultationMode}
                </div>
                <div className="input-group">
                  <strong>Preferred Doctor :</strong>{" "}
                  {selectedAppointment.preferredDoctor}
                </div>
                <div className="input-group">
                  <strong>Urgency Level :</strong>{" "}
                  {selectedAppointment.urgencyLevel}
                </div>
                <div className="input-group">
                  <strong>Preferred Date :</strong>{" "}
                  {selectedAppointment.preferredDate}
                </div>
                <div className="input-group">
                  <strong>Preferred TimeSlot :</strong>{" "}
                  {selectedAppointment.preferredTimeSlot}
                </div>
                <div className="input-group">
                  <strong>Reason :</strong>{" "}
                  {selectedAppointment.reasonForAppointment}
                </div>
                <div className="input-group">
                  <strong>Symptoms :</strong> {selectedAppointment.symptoms}
                </div>
                <div className="input-group">
                  <strong>Department :</strong> {selectedAppointment.department}
                </div>
                <div className="input-group">
                  <strong>Preferred Communication Method :</strong>{" "}
                  {selectedAppointment.preferredCommunicationMethod}
                </div>
              </div>

              {isRescheduleMode && (
                <div className="modal-right">
                  <h4>Reschedule Appointment</h4>
                  <div className="input-group">
                    <label style={{ fontSize: "18px", color: "#1d3557" }}>
                      Date:
                    </label>
                    <input
                      type="date"
                      value={updatedData.preferredDate}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: "18px", color: "#1d3557" }}>
                      Time:
                    </label>
                    <input
                      type="time"
                      value={updatedData.preferredTimeSlot}
                      onChange={handleTimeChange}
                    />
                  </div>
                  <button
                    onClick={handleRescheduleSubmit}
                    className="submit-reschedule"
                  >
                    Submit Reschedule
                  </button>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                onClick={() =>
                  handleAction(selectedAppointment._id, "Confirmed")
                }
                className="confirm-button"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setIsRescheduleMode(true);
                  setSelectedAppointmentId(selectedAppointment._id);
                }}
                className="reschedule-button"
              >
                Reschedule
              </button>
              <button
                onClick={() =>
                  handleAction(selectedAppointment._id, "Canceled")
                }
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixAppointment;
