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
    <div className="tcHome-container">
      <div className="tcHome-bgImage">
        <img src={homebg} alt="home-bg" className="tcHome-bgImg" />
      </div>

      <div className="tcHome-navbar">
        <div className="tcHome-logoWrap">
          <img src={logo} alt="Logo" className="tcHome-logo" />
        </div>
      </div>

      <div className="tcHome-leftContent">
        <h1 className="tcHome-heading">
          Your Health, <br /> Our <span>Priority</span>
        </h1>
        <p className="tcHome-subtext">
          Compassionate care, skilled hands, and a team dedicated to your
          well-being — every visit, every time.
        </p>

        <div className="tcHome-ctaRow">
          <button className="tcHome-ctaPrimary" onClick={goToPatientRegister}>
            Book an Appointment
          </button>
          <button className="tcHome-ctaSecondary" onClick={openModal}>
            Get Started <span className="tcHome-arrow">→</span>
          </button>
        </div>

        <div className="tcHome-trustStrip">
          <div className="tcHome-trustItem">
            <span className="tcHome-pulseDot"></span>
            <span className="tcHome-trustText">
              <strong>24/7</strong> Emergency Care
            </span>
          </div>
          <div className="tcHome-trustItem">
            <span className="tcHome-pulseDot"></span>
            <span className="tcHome-trustText">
              <strong>50+</strong> Specialist Doctors
            </span>
          </div>
          <div className="tcHome-trustItem">
            <span className="tcHome-pulseDot"></span>
            <span className="tcHome-trustText">
              <strong>10k+</strong> Patients Served
            </span>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="tcHome-modalBackdrop" onClick={closeModal}>
          <div className="tcHome-modalBox" onClick={(e) => e.stopPropagation()}>
            <button
              className="tcHome-modalClose"
              onClick={closeModal}
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="tcHome-modalTitle">Continue as</h2>
            <p className="tcHome-modalSubtitle">
              Select your role to sign in to the right dashboard.
            </p>

            <div className="tcHome-modalOptions">
              <button
                className="tcHome-roleBtn"
                onClick={() => handleSelect("admin")}
              >
                <span className="tcHome-roleIcon">🛡️</span>
                <span className="tcHome-roleInfo">
                  <span className="tcHome-roleName">Admin</span>
                  <span className="tcHome-roleDesc">
                    Manage staff, schedules & operations
                  </span>
                </span>
              </button>

              <button
                className="tcHome-roleBtn"
                onClick={() => handleSelect("doctor")}
              >
                <span className="tcHome-roleIcon">🩺</span>
                <span className="tcHome-roleInfo">
                  <span className="tcHome-roleName">Doctor</span>
                  <span className="tcHome-roleDesc">
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