import { Navigate } from "react-router-dom";

const PatientProtectedRoute = ({ children }) => {
  const patientId = localStorage.getItem("patientId");
  if (!patientId) return <Navigate to="/patient/login" />;
  return children;
};

export default PatientProtectedRoute;