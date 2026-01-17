import { Navigate } from "react-router-dom";
import { getRole, getToken } from "../utils/auth";

function ProtectedRoute({ children, role }) {
  const token = getToken();
  const userRole = getRole();

  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
