import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import SitesPage from "../pages/SitesPage";
import DevicesPage from "../pages/DevicesPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/site" element={<SitesPage />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
