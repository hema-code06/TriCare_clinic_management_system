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

  return (
    <div className="home-container">
      <div className="background-image">
        <img src={homebg} alt="home-bg" className="home-img" />
        <div className="bg-overlay" />
      </div>

      <div className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="navbar-buttons">
          <div className="login-wrap">
            <button onClick={toggleDropdown} className="login-buttons">
              Login
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

          <button
            onClick={() => navigate("/register")}
            className="register-button"
          >
            Register
          </button>
        </div>
      </div>

      <div className="hero-content">
        <span className="hero-eyebrow">Clinical Operations Platform</span>
        <h1 className="hero-headline">
          One platform, <span>every care decision.</span>
        </h1>
        <p className="hero-subheading">
          Manage patient records, staff access, and daily operations from a
          single, secure dashboard — built for the people who keep care
          moving.
        </p>
      </div>

      <div className="pulse-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <polyline
            className="pulse-line"
            points="0,30 260,30 300,10 330,50 360,5 390,45 420,30 1200,30"
            fill="none"
          />
        </svg>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <span className="feature-index">Doctors</span>
          <h3>Care, coordinated</h3>
          <p>Access charts, treatment plans, and care coordination in real time.</p>
        </div>
        <div className="feature-card">
          <span className="feature-index">Admins</span>
          <h3>Operations, in one view</h3>
          <p>Oversee staff, schedules, and resources from a single control center.</p>
        </div>
        <div className="feature-card">
          <span className="feature-index">Security</span>
          <h3>Access, protected</h3>
          <p>Role-based permissions keep records visible only to those who need them.</p>
        </div>
      </div>

      <div className="home-footer">
        <p>Secure access for authorized clinical and administrative staff.</p>
      </div>
    </div>
  );
};

export default Home;