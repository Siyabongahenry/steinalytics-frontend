import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SitesPage from "../pages/SitesPage";
import DevicesPage from "../features/devices/DevicesPage";
import ReportPage from "../features/reports/ReportPage";
import AuthPage from "../pages/AuthPage";
import HoursCalculatorPage from "../features/hoursCalculator/HoursCalculatorPage";
import { ProtectedRoute } from "./ProtectedRoute";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/site" element={<SitesPage />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/reports" element={<ReportPage />} />
      <Route path="/hours-calculator" element={<HoursCalculatorPage/>} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
