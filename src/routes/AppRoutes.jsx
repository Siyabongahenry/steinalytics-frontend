import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

/* Lazy-loaded pages */
const HomePage = lazy(() => import("../pages/HomePage"));
const SitesPage = lazy(() => import("../pages/SitesPage"));
const DevicesPage = lazy(() =>
  import("../features/devices/DevicesPage")
);
const ReportPage = lazy(() =>
  import("../features/reports/ReportPage")
);
const HoursCalculatorPage = lazy(() =>
  import("../features/hoursCalculator/HoursCalculatorPage")
);
const AboutPage = lazy(() => import("../pages/AboutPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/site" element={<SitesPage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/reports" element={<ReportPage />} />
          <Route
            path="/hours-calculator"
            element={<HoursCalculatorPage />}
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
}
