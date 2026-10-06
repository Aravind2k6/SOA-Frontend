import { Navigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "../Services/authService";

function ProtectedRoute({ children, requiredRole }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && getCurrentUser()?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
