import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ patientId: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/patient/login",
        formData
      );
      if (response.data.success) {
        localStorage.setItem("patientId", response.data.patientId);
        navigate("/patient-dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="patient-background-container">
      <div className="patient-login-form">
        <h2>Patient Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="patient-login">
          <input
            type="text"
            name="patientId"
            placeholder="Patient ID"
            value={formData.patientId}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="patient-login-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/patient/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
