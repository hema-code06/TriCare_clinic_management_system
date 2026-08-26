import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.gif";
import homebg from "../assets/homebg.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelect = (role) => {
    if (role === "admin") {
      navigate("/login", { state: { role: "admin" } });
    } else if (role === "doctor") {
      navigate("/login", { state: { role: "doctor" } });
    }
    setModalOpen(false);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const goToPatientRegister = () => {
    navigate("/register", { state: { role: "patient" } });
  };

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

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
          <button className="cta-secondary" onClick={openModal}>
            Get Started <span className="arrow">→</span>
          </button>
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

      {modalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="modal-title">Continue as</h2>
            <p className="modal-subtitle">
              Select your role to sign in to the right dashboard.
            </p>

            <div className="modal-options">
              <button
                className="modal-role-btn"
                onClick={() => handleSelect("admin")}
              >
                <span className="role-icon">🛡️</span>
                <span className="role-info">
                  <span className="role-name">Admin</span>
                  <span className="role-desc">
                    Manage staff, schedules & operations
                  </span>
                </span>
              </button>

              <button
                className="modal-role-btn"
                onClick={() => handleSelect("doctor")}
              >
                <span className="role-icon">🩺</span>
                <span className="role-info">
                  <span className="role-name">Doctor</span>
                  <span className="role-desc">
                    Access patient records & care plans
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;