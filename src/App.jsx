import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Meters from "./pages/Meters";
import MeterDetails from "./pages/MeterDetails";
import UsageAnalytics from "./pages/UsageAnalytics";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AccountRequests from "./pages/AccountRequests";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/request-access" element={<Login initialMode="request" />} />
        <Route path="/manager/accounts" element={<ProtectedRoute requiredRole="manager"><AccountRequests /></ProtectedRoute>} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meters"
          element={
            <ProtectedRoute>
              <Meters />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meters/:id"
          element={
            <ProtectedRoute>
              <MeterDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <UsageAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
