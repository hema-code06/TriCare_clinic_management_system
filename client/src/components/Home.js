import  { useState } from "react";
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
      </div>

      <div className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="navbar-buttons">
          <button onClick={toggleDropdown} className="login-buttons">
            Login
          </button>

          {dropdownVisible && (
            <div className="dropdown">
              <button type="button" onClick={() => handleSelect("admin")}>
                As Admin
              </button>
              <button type="button" onClick={() => handleSelect("doctor")}>
                As Doctor
              </button>
            </div>
          )}

          <button
            onClick={() => navigate("/register")}
            className="register-button"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
