import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.gif";
import homebg from "../assets/homebg.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (role) => {
    if (role === "admin") {
      navigate("/login", { state: { role: "admin" } });
    } else if (role === "doctor") {
      navigate("/login", { state: { role: "doctor" } });
    }
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const goToPatientRegister = () => {
    navigate("/register", { state: { role: "patient" } });
  };

  return (
    <div className="home-container">
      <div className="background-image">
        <img src={homebg} alt="home-bg" className="home-img" />
      </div>

      <div className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>

      <div className="left-content">
        <span className="eyebrow-tag">Trusted Healthcare</span>
        <h1 className="main-heading">
          Your Health, <br /> Our <span>Priority</span>
        </h1>
        <p className="sub-text">
          Compassionate care, skilled hands, and a team dedicated to your
          well-being — every visit, every time.
        </p>

        <div className="cta-row">
          <button className="cta-primary" onClick={goToPatientRegister}>
            Book an Appointment
          </button>

          <div className="login-wrap">
            <button className="cta-secondary" onClick={toggleDropdown}>
              Get Started <span className="arrow">→</span>
            </button>

            {dropdownVisible && (
              <div className="dropdown">
                <span className="dropdown-label">Continue as</span>
                <button type="button" onClick={() => handleSelect("admin")}>
                  As Admin
                </button>
                <button type="button" onClick={() => handleSelect("doctor")}>
                  As Doctor
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="trust-strip">
          <div className="trust-item">
            <span className="pulse-dot"></span>
            <span className="trust-text">
              <strong>24/7</strong> Emergency Care
            </span>
          </div>
          <div className="trust-item">
            <span className="pulse-dot"></span>
            <span className="trust-text">
              <strong>50+</strong> Specialist Doctors
            </span>
          </div>
          <div className="trust-item">
            <span className="pulse-dot"></span>
            <span className="trust-text">
              <strong>10k+</strong> Patients Served
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;