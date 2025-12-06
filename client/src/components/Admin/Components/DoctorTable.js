import React from "react";
import "../styles/Card.css";

const DoctorTable = ({ doctors, onCardClick }) => {
  return (
    <div className="table-container">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="card-container"
          onClick={() => onCardClick(doctor._id)}
        >
          <h3>{doctor.fullName}</h3>
          <img
            src={doctor.profilePicture || "default-profile.png"}
            alt={`${doctor.fullName} doctor`}
          />
          <p>{doctor.qualification}</p>
          <p className="role">{doctor.specialization}</p>
          <p>{doctor.department}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorTable;
