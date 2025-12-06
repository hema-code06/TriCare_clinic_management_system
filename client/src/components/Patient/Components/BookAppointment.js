import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BookAppointment.css";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    fullName: "",
    gender: "",
    contactNumber: "",
    appointmentType: "",
    consultationMode: "",
    preferredDoctor: "",
    preferredDate: "",
    urgencyLevel: "",
    preferredTimeSlot: "",
    reasonForAppointment: "",
    symptoms: "",
    department: "",
    preferredCommunicationMethod: "",
  });

  useEffect(() => {
    const patientId = localStorage.getItem("patientId");
    if (patientId) {
      setFormData((prevData) => ({ ...prevData, patientId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/patient/bookappointments",
        formData
      );
      alert(response.data.message || "Appointment booked successfully!");
      setFormData({
        patientId: formData.patientId,
        fullName: "",
        gender: "",
        contactNumber: "",
        appointmentType: "",
        consultationMode: "",
        preferredDate: "",
        preferredTimeSlot: "",
        reasonForAppointment: "",
        symptoms: "",
        department: "",
        preferredCommunicationMethod: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error booking appointment.");
    }
  };

  return (
    <form className="appointment-container" onSubmit={handleSubmit}>
      <div className="grid-appointment">
        <label>
          Patient ID :{" "}
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            readOnly
          />
        </label>

        <label>
          Full Name :{" "}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Gender :{" "}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Contact Number :{" "}
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Appointment Type :{" "}
          <select
            name="appointmentType"
            value={formData.appointmentType}
            onChange={handleChange}
            required
          >
            <option value="">Select Appointment Type</option>
            <option value="New Consultation">New Consultation</option>
            <option value="Follow-Up">Follow-Up</option>
            <option value="Teleconsultation">Teleconsultation</option>
          </select>
        </label>

        <label>
          Consultation Mode :{" "}
          <select
            name="consultationMode"
            value={formData.consultationMode}
            onChange={handleChange}
            required
          >
            <option value="">Select Consultation Mode</option>
            <option value="In-person">In-person</option>
            <option value="Virtual/Telemedicine">Virtual/Telemedicine</option>
          </select>
        </label>

        <label>
          Preferred Doctor :{" "}
          <input
            type="text"
            name="preferredDoctor"
            value={formData.preferredDoctor}
            onChange={handleChange}
          />
        </label>

        <label>
          Urgency Level :{" "}
          <select
            name="urgencyLevel"
            value={formData.urgencyLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Urgency Level</option>
            <option value="Routine">Routine</option>
            <option value="Urgent">Urgent</option>
            <option value="Emergency">Emergency</option>
          </select>
        </label>

        <label>
          Preferred Date :{" "}
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Preferred Time Slot :{" "}
          <input
            type="time"
            name="preferredTimeSlot"
            value={formData.preferredTimeSlot}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Reason for Appointment :{" "}
          <textarea
            name="reasonForAppointment"
            value={formData.reasonForAppointment}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Symptoms :{" "}
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
          />
        </label>

        <label>
          Department :{" "}
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Gastroenterology">Gastroenterology</option>
            <option value="Oncology">Oncology</option>
            <option value="Endocrinology">Endocrinology</option>
            <option value="Nephrology">Nephrology</option>
            <option value="Ophthalmology">Ophthalmology</option>
            <option value="ENT">ENT</option>
            <option value="Pulmonology">Pulmonology</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Preferred Communication Method :{" "}
          <select
            name="preferredCommunicationMethod"
            value={formData.preferredCommunicationMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Communication Method</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
          </select>
        </label>
      </div>
      <button type="submit" className="appointment-button">
        Submit
      </button>
    </form>
  );
};

export default BookAppointment;
