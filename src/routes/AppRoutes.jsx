import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import SitesPage from "../pages/SitesPage";
import DevicesPage from "../features/devices/DevicesPage";
import ReportPage from "../features/reports/ReportPage";
import AuthPage from "../pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/site" element={<SitesPage />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/reports" element={<ReportPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
