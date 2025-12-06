import React, { useState, useEffect } from "react";
import "../styles/formstyles.css";

const RolesForm = ({ onSubmit, initialData }) => {
  const formDataFromProps = initialData || {};
  const [formData, setFormData] = useState({
    profilePicture: formDataFromProps.profilePicture || "",
    fullName: formDataFromProps.fullName || "",
    email: formDataFromProps.email || "",
    phone: formDataFromProps.phone || "",
    role: formDataFromProps.role || "",
    accessLevel: formDataFromProps.accessLevel || "",
    employeeId: formDataFromProps.employeeId || "",
    designation: formDataFromProps.designation || "",
    specialization: formDataFromProps.specialization || "",
    workShift: formDataFromProps.workShift || "",
    availability: formDataFromProps.availability || "",
    accountStatus: formDataFromProps.accountStatus || "Active",
    joiningDate: formDataFromProps.joiningDate || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevItem) => ({
        ...prevItem,
        profilePicture: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      profilePicture: "",
      fullName: "",
      email: "",
      phone: "",
      role: "",
      accessLevel: "",
      employeeId: "",
      designation: "",
      specialization: "",
      workShift: "",
      availability: "",
      accountStatus: "Active",
      joiningDate: "",
    });
  };

  return (
    <form className="fill-main" onSubmit={handleSubmit}>
      <div className="fill-grid">
        <label>
          Profile Picture :
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </label>

        <label>
          Full Name :
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email Address :
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number :
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Role :
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option>Receptionist</option>
            <option>Nurse</option>
            <option>Medical Assistant</option>
            <option>Lab Technician</option>
            <option>Pharmacist</option>
            <option>Accountant</option>
            <option>Administrator</option>
            <option>IT Support Staff</option>
            <option>Cleaner/Janitorial Staff</option>
            <option>Clinic Manager</option>
            <option>Billing Specialist</option>
            <option>Healthcare Coordinator</option>
            <option>Radiology Technician</option>
            <option>Therapist</option>
            <option>Dietitian/Nutritionist</option>
          </select>
        </label>

        <label>
          Access Level :
          <select
            name="accessLevel"
            value={formData.accessLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Access Level</option>
            <option>Admin</option>
            <option>Staff</option>
            <option>Limited</option>
          </select>
        </label>

        <label>
          Employee ID :
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
          />
        </label>

        <label>
          Designation/Position :
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </label>

        <label>
          Specialization :
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
        </label>

        <label>
          Work Shift :
          <input
            type="text"
            name="workShift"
            value={formData.workShift}
            onChange={handleChange}
          />
        </label>

        <label>
          Availability :
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          />
        </label>

        <label>
          Account Status :
          <select
            name="accountStatus"
            value={formData.accountStatus}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>
        </label>

        <label>
          Joining Date :
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit" className="en-button">
        {initialData ? "Update" : "Add record"}
      </button>
    </form>
  );
};

export default RolesForm;
