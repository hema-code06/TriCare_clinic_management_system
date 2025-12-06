import React from "react";
import "../styles/Card.css";

const RolesTable = ({ roles, onCardClick }) => {
  return (
    <div className="table-container">
      {roles.map((role) => (
        <div
          key={role._id}
          className="card-container"
          onClick={() => onCardClick(role._id)}
        >
          <h3>{role.fullName}</h3>
          <img
            src={role.profilePicture || "default-profile.png"}
            alt={`${role.fullName} profile`}
          />
          <p>{role.role}</p>
          <p className="role">{role.specialization}</p>
          <p>{role.designation}</p>
        </div>
      ))}
    </div>
  );
};

export default RolesTable;
