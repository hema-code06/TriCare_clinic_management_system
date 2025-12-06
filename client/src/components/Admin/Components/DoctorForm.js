import React, { useState, useEffect } from "react";
import "../styles/formstyles.css";

const DoctorForm = ({ onSubmit, initialData }) => {
  const formDataFromProps = initialData || {};
  const [formData, setFormData] = useState({
    profilePicture: formDataFromProps.profilePicture || "",
    doctorId: formDataFromProps.doctorId || "",
    fullName: formDataFromProps.fullName || "",
    gender: formDataFromProps.gender || "",
    contactNumber: formDataFromProps.contactNumber || "",
    department: formDataFromProps.department || "",
    specialization: formDataFromProps.specialization || "",
    qualification: formDataFromProps.qualification || "",
    yearsOfExperience: formDataFromProps.yearsOfExperience || "",
    email: formDataFromProps.email || "",
    availability: formDataFromProps.availability || "",
    consultationMethod: formDataFromProps.consultationMethod || "",
    doctorsFee: formDataFromProps.doctorsFee || "",
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
      doctorId: "",
      fullName: "",
      gender: "",
      contactNumber: "",
      department: "",
      specialization: "",
      qualification: "",
      yearsOfExperience: "",
      email: "",
      availability: "",
      consultationMethod: "",
      doctorsFee: "",
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
          Doctor ID :
          <input
            type="text"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
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
          Gender :
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
          Contact Number :
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Department :
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Oncology">Oncology</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Endocrinology">Endocrinology</option>
            <option value="ENT">ENT</option>
            <option value="Urology">Urology</option>
            <option value="Rheumatology">Rheumatology</option>
            <option value="Plastic Surgery">Plastic Surgery</option>
            <option value="Gastroenterology">Gastroenterology</option>
            <option value="Pulmonology">Pulmonology</option>
          </select>
        </label>
        <label>
          Specialization :
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="">Select Specialization</option>
            <option value="Surgery">Surgery</option>
            <option value="General Practice">General Practice</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Dentistry">Dentistry</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Cardiac Surgery">Cardiac Surgery</option>
            <option value="Orthopedic Surgery">Orthopedic Surgery</option>
            <option value="Neuro Surgery">Neuro Surgery</option>
            <option value="Pediatric Surgery">Pediatric Surgery</option>
            <option value="Plastic Surgery">Plastic Surgery</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Radiology">Radiology</option>
            <option value="Pathology">Pathology</option>
            <option value="Anesthesiology">Anesthesiology</option>
            <option value="Ophthalmology">Ophthalmology</option>
            <option value="ENT Surgery">ENT Surgery</option>
            <option value="Obstetrics & Gynecology">
              Obstetrics & Gynecology
            </option>
            <option value="Gastroenterology">Gastroenterology</option>
            <option value="Pulmonology">Pulmonology</option>
            <option value="General Surgery">General Surgery</option>
            <option value="Oncological Surgery">Oncological Surgery</option>
          </select>
        </label>
        <label>
          Qualification :
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Years of Experience :
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
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
          Availability :
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          >
            <option value="">Select Availability</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="On-call">On-call</option>
          </select>
        </label>
        <label>
          Consultation Method :
          <select
            name="consultationMethod"
            value={formData.consultationMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Consultation Method</option>
            <option value="In-person">In-person</option>
            <option value="Online">Online</option>
            <option value="Both">Both</option>
          </select>
        </label>
        <label>
          Doctor's Fee :
          <input
            type="number"
            name="doctorsFee"
            value={formData.doctorsFee}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit" className="en-button">
        {initialData ? "Update" : "Add record"}
      </button>
    </form>
  );
};

export default DoctorForm;
