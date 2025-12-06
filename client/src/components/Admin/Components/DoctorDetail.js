import React from "react";
import "../styles/Info.css";

const DoctorDetail = ({ doctor, onEdit, onDelete }) => {
  if (!doctor) {
    return <p>No doctor details available.</p>;
  }

  return (
    <div className="Info-container">
      <h2 className="Info-name">{doctor.fullName}</h2>
      <div className="Info-profile">
        <img
          src={doctor.profilePicture || "default-profile.png"}
          alt={`${doctor.fullName} profile`}
          className="Info-picture"
        />
        <div className="Info-content">
          <p>
            <b>Specialization :</b> {doctor.specialization}
          </p>
          <p>
            <b>Contact :</b> {doctor.contactNumber}
          </p>
          <p>
            <b>Years of Experience :</b> {doctor.yearsOfExperience}
          </p>
          <p>
            <b>Department :</b> {doctor.department}
          </p>
          <p>
            <b>Qualifications :</b> {doctor.qualification}
          </p>
          <p>
            <b>Gender :</b> {doctor.gender}
          </p>
          <p>
            <b>Availability :</b> {doctor.availability}
          </p>
          <p>
            <b>Consultation Method :</b> {doctor.consultationMethod}
          </p>
          <p>
            <b>Doctor's Fee :</b> ${doctor.doctorsFee}
          </p>
        </div>
      </div>

      <div className="Info-action-buttons">
        <button onClick={onEdit} className="Info-edit">
          Edit
        </button>
        <button onClick={onDelete} className="Info-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorDetail;
