import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import admin from "../assets/admin.jpg";
import doctor from "../assets/doctor.jpg";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state?.role || "admin";
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      localStorage.setItem("token", data.token);
      if (data.role === "admin") navigate("/admin");
      else if (data.role === "doctor") navigate("/doctor");
    } catch (err) {
      console.error("Login Error:", err.response || err);
      setError(err.response ? err.response.data.message : "Network Error");
    }
  };

  return (
    <div className="login-page">
      <div className="form-login-container">
        <div className="image-side">
          <img
            src={role === "admin" ? admin : doctor}
            alt={role}
            className="login-image"
          />
        </div>
        <div className="form-login-side">
          <form onSubmit={handleLogin}>
            <h2 className="heading">Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
            <button type="submit" className="button-login">
              Login
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
