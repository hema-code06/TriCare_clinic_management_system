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

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setModalOpen(false);
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

        <div className="navbar-buttons">
          <button onClick={toggleModal} className="login-buttons">
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="register-button"
          >
            Register
          </button>
        </div>
      </div>

      <div className="tcHero-leftContent">
        <span className="tcHero-eyebrow">Trusted Healthcare</span>
        <h1 className="tcHero-heading">
          Your Health, <br /> Our <span>Priority</span>
        </h1>
        <p className="tcHero-subtext">
          Compassionate care, skilled hands, and a team dedicated to your
          well-being — every visit, every time.
        </p>
      </div>

      {modalOpen && (
        <div className="tcHero-modalBackdrop" onClick={toggleModal}>
          <div
            className="tcHero-modalBox"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="tcHero-modalClose"
              onClick={toggleModal}
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="tcHero-modalTitle">Continue as</h2>
            <p className="tcHero-modalSubtitle">
              Select your role to sign in to the right dashboard.
            </p>

            <div className="tcHero-modalOptions">
              <button
                className="tcHero-roleBtn"
                onClick={() => handleSelect("admin")}
              >
                <span className="tcHero-roleIcon">🛡️</span>
                <span className="tcHero-roleInfo">
                  <span className="tcHero-roleName">Admin</span>
                  <span className="tcHero-roleDesc">
                    Manage staff, schedules & operations
                  </span>
                </span>
              </button>

              <button
                className="tcHero-roleBtn"
                onClick={() => handleSelect("doctor")}
              >
                <span className="tcHero-roleIcon">🩺</span>
                <span className="tcHero-roleInfo">
                  <span className="tcHero-roleName">Doctor</span>
                  <span className="tcHero-roleDesc">
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