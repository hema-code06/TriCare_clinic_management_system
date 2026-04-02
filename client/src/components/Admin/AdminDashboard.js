import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./styles/AdminDashboard.css";
import logo from "../../assets/logo.gif";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [dashboardData, setDashboardData] = useState([]);
  const [stats] = useState({
    doctors: 10,
    inventory: 20,
    appointments: 45,
    maintenance: 20,
    user: 30,
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    setDashboardData([
      { date: "Monday", value: 20 },
      { date: "Tuesday", value: 35 },
      { date: "Wednesday", value: 40 },
      { date: "Thursday", value: 50 },
      { date: "Friday", value: 30 },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleOutsideClick = useCallback(
    (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarVisible
      ) {
        setIsSidebarVisible(false);
      }
    },
    [isSidebarVisible],
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const chartDataLine = {
    labels: dashboardData.map((item) => item.date),
    datasets: [
      {
        label: "Weekly Appointments",
        data: dashboardData.map((item) => item.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartDataBar = {
    labels: ["Doctors", "Patients", "Appointments", "Inventory"],
    datasets: [
      {
        label: "Statistics",
        data: [
          stats.doctors,
          stats.inventory,
          stats.appointments,
          stats.maintenance,
          stats.user,
        ],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
        borderColor: ["#0056b3", "#1e7e34", "#d39e00", "#c82333"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={`admin-dashboard-container ${
        isSidebarVisible ? "" : "sidebar-hidden"
      }`}
    >
      <button
        className="toggle-buttons"
        onClick={(e) => {
          e.stopPropagation();
          setIsSidebarVisible(!isSidebarVisible);
        }}
      >
        {isSidebarVisible ? <FaArrowLeft /> : <FaArrowRight />}
      </button>

      <aside
        ref={sidebarRef}
        className={`sidebar ${isSidebarVisible ? "visible" : ""}`}
      >
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/doctor-management")}>Doctors</li>
          <li onClick={() => navigate("/appointment-management")}>
            Appointments
          </li>
          <li onClick={() => navigate("/inventory-management")}>Inventory</li>
          <li onClick={() => navigate("/maintenance-management")}>
            Maintenance
          </li>
          <li onClick={() => navigate("/roles-management")}>User</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="main-content">
        <h2>Admin Dashboard</h2>

        <div className="stats-grid">
          <div
            className="stat-card"
            onClick={() => navigate("/doctor-management")}
          >
            Doctors: {stats.doctors}
          </div>
          <div
            className="stat-card"
            onClick={() => navigate("/roles-management")}
          >
            User: {stats.user}
          </div>
          <div
            className="stat-card"
            onClick={() => navigate("/inventory-management")}
          >
            Inventory: {stats.inventory}
          </div>
          <div
            className="stat-card"
            onClick={() => navigate("/appointment-management")}
          >
            Appointments: {stats.appointments}
          </div>
          <div
            className="stat-card"
            onClick={() => navigate("/maintenance-management")}
          >
            Maintenance: {stats.maintenance}
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-container">
            <h2>Weekly Appointments</h2>
            <Line data={chartDataLine} />
          </div>
          <div className="chart-container">
            <h2>Statistics Overview</h2>
            <Bar data={chartDataBar} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
