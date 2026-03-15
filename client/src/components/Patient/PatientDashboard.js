import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.gif";
import "./styles/PatientDashboard.css";

const PatientDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const patientId = localStorage.getItem("patientId");

    if (!patientId) {
      setError("Patient ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://tricare-clinic-management-system.onrender.com/api/patient/profile/${patientId}`
        );
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("patientId");

    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="patient-dashboard">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="navbar-links">
          <Link to="/book-appointment">Book Appointment</Link>
          <Link to={`/patient/profile/${profile.patientId}/edit`}>
            Edit Profile
          </Link>
          <button onClick={handleLogout} className="pateint-logout-button">
            Logout
          </button>
        </div>
      </nav>

      <section className="hero-section full-page">
        <div className="hero-content">
          <h1>
            Compassionate care, advanced medicine because
            <span className="quote-text"> you matter most.</span>
          </h1>

          <div className="hero-buttons">
            <Link to="/book-appointment" className="button">
              Book appointment
            </Link>
          </div>
        </div>
      </section>

      <section className="doctor-card-section">
        <h2>Meet Our Doctors</h2>
        <div className="doctor-cards">
          <div className="doctor-card">
            <img
              src="https://blog.pincel.app/wp-content/uploads/2024/02/Doctor_headshot_happy_full_body_in_a_medical_coat_professional_light_blue_background.jpeg"
              alt="Doctor 1"
            />
            <h3>Dr. John Doe</h3>
            <p>Cardiologist</p>
          </div>
          <div className="doctor-card">
            <img
              src="https://cdn.pixabay.com/photo/2024/02/07/15/09/ai-generated-8559288_1280.png"
              alt="Doctor 2"
            />
            <h3>Dr. Jane Smith</h3>
            <p>Pediatrician</p>
          </div>
          <div className="doctor-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShMwM7Pcnut1rFitNb34wuhVWAztWYyXopkQ&s"
              alt="Doctor 3"
            />
            <h3>Dr. Emily White</h3>
            <p>Dermatologist</p>
          </div>
          <div className="doctor-card">
            <img
              src="https://t3.ftcdn.net/jpg/06/64/62/08/360_F_664620894_KN7WA859syQPK6rwNWBSky1iLwYhb3Gt.jpg"
              alt="Doctor 4"
            />
            <h3>Dr. John </h3>
            <p>Dermatologist</p>
          </div>
          <div className="doctor-card">
            <img
              src="https://r2.erweima.ai/imgcompressed/compressed_f362969915734c54b4d5599a5fdc46e4.webp"
              alt="Doctor 5"
            />
            <h3>Dr. Kenny</h3>
            <p>Dermatologist</p>
          </div>
        </div>
      </section>

      <section className="services-section full-page">
        <h2>Our Services</h2>
        <div className="services">
          <div className="service">
            <h3>General Checkup</h3>
            <p>Regular health evaluations to keep you in top shape.</p>
          </div>
          <div className="service">
            <h3>Pediatric Care</h3>
            <p>
              Specialized medical care for infants, children, and adolescents.
            </p>
          </div>
          <div className="service">
            <h3>Orthopedic Services</h3>
            <p>Comprehensive care for bone, joint, and muscle issues.</p>
          </div>
          <div className="service">
            <h3>Cardiology</h3>
            <p>
              Advanced heart care and treatment for cardiovascular conditions.
            </p>
          </div>
          <div className="service">
            <h3>Diagnostics & Imaging</h3>
            <p>State-of-the-art equipment for accurate diagnoses.</p>
          </div>
        </div>
      </section>

      <section className="features-section full-page">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <img
              className="feature-image"
              src="https://img.freepik.com/free-photo/view-futuristic-high-tech-classroom-students_23-2150906200.jpg?uid=R148494665&ga=GA1.1.850306237.1733390878&semt=ais_hybrid"
              alt="Modern Facilities"
            />
            <h3>Modern Facilities</h3>
            <p>Equipped with the latest medical technology and amenities.</p>
          </div>
          <div className="feature">
            <img
              className="feature-image"
              src="https://img.freepik.com/free-photo/doctor-reading-coronavirus-patient-medical-chart_53876-138951.jpg?uid=R148494665&ga=GA1.1.850306237.1733390878"
              alt="Expert Specialists"
            />
            <h3>Expert Specialists</h3>
            <p>Access to renowned doctors across multiple specialties.</p>
          </div>
          <div className="feature">
            <img
              className="feature-image"
              src="https://img.freepik.com/free-vector/healthy-lifestyle-isometric-poster-with-athlete-coach-female-characters-measuring-pressure-after-physical-activity-regular-checkup-illustration_1284-31221.jpg?uid=R148494665&ga=GA1.1.850306237.1733390878&semt=ais_hybrid"
              alt="Patient-Centered Approach"
            />
            <h3>Patient-Centered Approach</h3>
            <p>Personalized care tailored to individual needs.</p>
          </div>
          <div className="feature">
            <img
              className="feature-image"
              src="https://img.freepik.com/premium-vector/emergency-medical-support_11197-397.jpg?uid=R148494665&ga=GA1.1.850306237.1733390878&semt=ais_hybrid"
              alt="24/7 Emergency Services"
            />
            <h3>24/7 Emergency Services</h3>
            <p>Round-the-clock assistance for urgent medical needs.</p>
          </div>
          <div className="feature">
            <img
              className="feature-image"
              src="https://img.freepik.com/premium-vector/doctor-measures-pressure-elderly-woman_195186-135.jpg?uid=R148494665&ga=GA1.1.850306237.1733390878&semt=ais_hybrid"
              alt="Holistic Care"
            />
            <h3>Holistic Care</h3>
            <p>Focus on physical, mental, and emotional well-being.</p>
          </div>
        </div>
      </section>

      <section className="contact-us-section full-page">
        <h1 style={{ textAlign: "center" }}>Contact Us</h1>
        <div className="contact-container">
          <div className="right-content">
            <p>
              <i className="fas fa-map-marker-alt"></i>{" "}
              <strong>Address:</strong> 123 Main Street, City, State, 12345
            </p>
            <p>
              <i className="fas fa-phone"></i> <strong>Phone:</strong>{" "}
              <a href="tel:+11234567890">(123) 456-7890</a>
            </p>
            <p>
              <i className="fas fa-envelope"></i> <strong>Email:</strong>{" "}
              <a href="mailto:contact@examplehospital.com">
                contact@examplehospital.com
              </a>
            </p>
            <p>
              <i className="fas fa-globe"></i> <strong>Website:</strong>{" "}
              <a
                href="https://www.examplehospital.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.examplehospital.com
              </a>
            </p>
            <p>
              <i className="fas fa-clock"></i> <strong>Opening Hours:</strong>{" "}
              Monday to Friday, 8:00 AM – 6:00 PM
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2022 <span style={{color:'teal'}}> TriCare </span>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PatientDashboard;
