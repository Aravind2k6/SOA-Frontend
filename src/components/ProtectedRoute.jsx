import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser, loadCurrentUser } from "../Services/authService";
import { isFrontendDemoMode } from "../Services/api";

function ProtectedRoute({ children, requiredRole }) {
  if (isFrontendDemoMode) {
    // Local UI preview only. Manager actions still require a real backend session.
    return requiredRole ? <Navigate to="/" replace /> : children;
  }

  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    let active = true;
    loadCurrentUser()
      .then((currentUser) => {
        if (active) {
          setUser(currentUser);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => { active = false; };
  }, []);

  if (status === "loading") return <p role="status">Checking your session…</p>;
  if (status === "error") return <p role="alert">Unable to verify your session. Please try again.</p>;
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
