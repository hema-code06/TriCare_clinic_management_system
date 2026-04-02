import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.gif";
import doctorbg from "../../assets/home-bg.jpg";
import "./styles/DoctorDashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { state: { role: "doctor" } });
  };

  return (
    <div className="doctor-dashboard">
      <div className="doctor-bg-image">
        <img src={doctorbg} alt="Doctor Background" className="doctor-bgimg" />
      </div>
      <nav className="doctor-navbar">
        <div className="doctor-logo">
          <img src={logo} alt="Logo" className="doctor-logo" />
        </div>
        <div className="doctor-navbar-links">
          <Link to="/appointments">View Appointments</Link>

          <Link to="/doctor-dashboard/patient-list">View Patient List</Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DoctorDashboard;
