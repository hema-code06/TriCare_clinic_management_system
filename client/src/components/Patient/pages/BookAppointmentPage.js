import React, { useEffect, useState } from "react";
import axios from "axios";
import BookAppointment from "../Components/BookAppointment";

const BookAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const patientId = localStorage.getItem("patientId");

  const fetchAppointments = async () => {
    try {
      if (!patientId) {
        console.error("No patient ID found");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/patient/bookappointments?patientId=${patientId}`
      );
      console.log("Appointments fetched:", response.data);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchAppointments();
    }
  }, [patientId]);

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#4985fe" }}>
        Schedule Your Appointment
      </h2>
      <BookAppointment fetchAppointments={fetchAppointments} />

      <h2 style={{ textAlign: "center", color: "teal" }}>
        Upcoming Appointments
      </h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <table
          style={{
            width: "90%",
            marginTop: "5%",
            fontSize: "16px",
            textAlign: "center",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "10%",
            marginLeft: "5%",
          }}
        >
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Appointment Type</th>
              <th>Reason for appointment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.preferredDoctor}</td>
                <td>{appointment.appointmentType}</td>
                <td>{appointment.reasonForAppointment}</td>
                <td>{appointment.preferredDate}</td>
                <td>{appointment.preferredTimeSlot}</td>
                <td>{appointment.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookAppointmentPage;
