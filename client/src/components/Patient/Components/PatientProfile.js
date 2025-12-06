import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "../styles/PatientProfile.css";

Modal.setAppElement("#root");

const PatientProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullname: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    country: "",
    occupation: "",
    generalDoctor: "",
    doctorSpecialty: "",
    blood: "",
    insuranceProvider: "",
    policyNumber: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patient/profile/${id}`
        );
        const data = response.data;

        setProfile(data);
        setEditFormData({
          fullname: data.fullname || "",
          age: data.age || "",
          gender: data.gender || "",
          phone: data.phone || "",
          email: data.email || "",
          city: data.location.city || "",
          state: data.location.state || "",
          country: data.location.country || "",
          occupation: data.occupation || "",
          blood: data.bloodType || "",
          generalDoctor: data.generalDoctorName || "",
          doctorSpecialty: data.doctorSpeciality || "",
          insuranceProvider: data.insuranceInformation.provider || "",
          policyNumber: data.insuranceInformation.policyNumber || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      console.log("Update data being sent:", editFormData);
      const updatedData = {
        ...editFormData,
        bloodType: editFormData.blood,
        generalDoctorName: editFormData.generalDoctor,
        doctorSpeciality: editFormData.doctorSpecialty,
        location: {
          city: editFormData.city,
          state: editFormData.state,
          country: editFormData.country,
        },
        insuranceInformation: {
          provider: editFormData.insuranceProvider,
          policyNumber: editFormData.policyNumber,
        },
      };

      const response = await axios.put(
        `http://localhost:5000/api/patient/profile/${profile.patientId}`,
        updatedData
      );

      console.log("Response from server:", response.data);

      if (response.status === 200) {
        const updatedProfileResponse = await axios.get(
          `http://localhost:5000/api/patient/profile/${profile.patientId}`
        );
        setProfile(updatedProfileResponse.data);
        setIsModalOpen(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Error updating profile");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="patientprofile-container">
      <h1>Patient Profile</h1>
      <div className="patient-profile">
        <button
          className="patient-edit-button"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <div className="patient-field">
          <i className="fas fa-id-badge"></i>
          <p> {profile.patientId}</p>
        </div>
        <div className="patient-field">
          <i className="fas fa-user"></i>
          <p>{profile.fullname}</p>
        </div>
        <div className="patient-field">
          <i className="fas fa-birthday-cake"></i>
          <p>{profile.age || ""}</p>
        </div>
        <div className="patient-field">
          <i className="fas fa-male"></i>
          <p>{profile.gender || ""}</p>
        </div>
        <div className="patient-field">
          <i className="fas fa-phone"></i>
          <p>{profile.phone || ""}</p>
        </div>
        <div className="patient-field">
          <i className="fas fa-envelope"></i>
          <p> {profile.email || ""}</p>
        </div>
        <div className="patient-field full-width">
          <i className="fas fa-map-marker-alt"></i>
          <p>
            {`${profile.location.city || ""}, ${
              profile.location.state || ""
            }, ${profile.location.country || ""}`}
          </p>
        </div>
        <div className="patient-field">
          <i className="fas fa-briefcase"></i>
          <p> {profile.occupation || ""}</p>
        </div>
        <div className="patient-field">
          <i className="fas fa-tint"></i>
          <p> {profile.bloodType || ""}</p>
        </div>
        <div className="patient-field">
          <i className="fas fa-user-md"></i>
          <p> {profile.generalDoctorName || ""}</p>
        </div>
        <div className="patient-field">
          <i className="fas fa-stethoscope"></i>
          <p> {profile.doctorSpeciality || ""}</p>
        </div>
        <div className="patient-field full-width">
          <i className="fas fa-shield-alt"></i>
          <p>
            {profile.insuranceInformation.provider &&
            profile.insuranceInformation.policyNumber
              ? `${profile.insuranceInformation.provider} (Policy #${profile.insuranceInformation.policyNumber})`
              : ""}
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Profile"
        className="edit-profile-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </div>
        <form className="edit-profile-patientform">
          <label>
            Full Name :
            <input
              type="text"
              name="fullname"
              value={editFormData.fullname}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Age :
            <input
              type="number"
              name="age"
              value={editFormData.age}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Gender :
            <select
              name="gender"
              value={editFormData.gender}
              onChange={handleEditChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Phone :
            <input
              type="text"
              name="phone"
              value={editFormData.phone}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Email :
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleEditChange}
            />
          </label>
          <label>
            City :
            <input
              type="text"
              name="city"
              value={editFormData.city}
              onChange={handleEditChange}
            />
          </label>
          <label>
            State :
            <input
              type="text"
              name="state"
              value={editFormData.state}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Country :
            <input
              type="text"
              name="country"
              value={editFormData.country}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Occupation :
            <input
              type="text"
              name="occupation"
              value={editFormData.occupation}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Blood-Type :
            <select
              name="blood"
              value={editFormData.blood}
              onChange={handleEditChange}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            General Doctor :
            <input
              type="text"
              name="generalDoctor"
              value={editFormData.generalDoctor}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Doctor Specialty :
            <input
              type="text"
              name="doctorSpecialty"
              value={editFormData.doctorSpecialty}
              onChange={handleEditChange}
            />
          </label>{" "}
          <label>
            Policy Number :
            <input
              type="text"
              name="policyNumber"
              value={editFormData.policyNumber}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Insurance Provider :
            <input
              type="text"
              name="insuranceProvider"
              value={editFormData.insuranceProvider}
              onChange={handleEditChange}
            />
          </label>
          <button
            type="button"
            className="save-changes-patientbutton"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PatientProfile;
