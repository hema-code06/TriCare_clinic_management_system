import { Navigate } from "react-router-dom";

const PatientProtectedRoute = ({ children }) => {
  const patientId = localStorage.getItem("patientId");
  const token = localStorage.getItem("patientToken");
  if (!patientId || !token) return <Navigate to="/patient/login" />;

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    if (exp * 1000 < Date.now()) throw new Error("Token expired");
  } catch {
    localStorage.removeItem("patientId");
    localStorage.removeItem("patientToken");
    return <Navigate to="/patient/login" />;
  }
  return children;
};

export default PatientProtectedRoute;