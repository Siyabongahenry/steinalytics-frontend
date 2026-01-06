import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import SitesPage from "../pages/SitesPage";
import DevicesPage from "../features/devices/DevicesPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import ReportPage from "../features/reports/ReportPage";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/site" element={<SitesPage />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/journal" element={<ReportPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
