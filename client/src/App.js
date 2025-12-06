import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import PatientLogin from "./components/Patient/pages/Login";
import PatientRegister from "./components/Patient/pages/Register";
import Register from "./components/Patient/pages/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import PatientDashboard from "./components/Patient/PatientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorManagement from "./components/Admin/pages/DoctorManagement";
import InventoryPage from "./components/Admin/pages/InventoryPage";
import MaintenancePage from "./components/Admin/pages/MaintenancePage";
import RolesManagement from "./components/Admin/pages/RolesManagement";
import AppointmentPage from "./components/Doctor/pages/AppointmentPage";
import BookAppointmentPage from "./components/Patient/pages/BookAppointmentPage";
import PatientProfile from "./components/Patient/Components/PatientProfile";
import PatientList from "./components/Doctor/Components/PatientList";
import AppointmentDetails from "./components/Admin/Components/AppointmentDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/patient/profile/:id/edit" element={<PatientProfile />} />

        <Route
          path="/doctor-management"
          element={
            <ProtectedRoute role="admin">
              <DoctorManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointment-management"
          element={
            <ProtectedRoute role="admin">
              <AppointmentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory-management"
          element={
            <ProtectedRoute role="admin">
              <InventoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance-management"
          element={
            <ProtectedRoute role="admin">
              <MaintenancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles-management"
          element={
            <ProtectedRoute role="admin">
              <RolesManagement />
            </ProtectedRoute>
          }
        />

        <Route path="/appointments" element={<AppointmentPage />} />

        <Route
          path="/doctor-dashboard/patient-list"
          element={<PatientList />}
        />

        <Route path="/book-appointment" element={<BookAppointmentPage />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
