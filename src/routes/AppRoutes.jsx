// src/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute.jsx";

/* Lazy-loaded pages */
const HomePage = lazy(() => import("../pages/HomePage"));
const SitesPage = lazy(() => import("../pages/SitesPage"));
const DevicesPage = lazy(() => import("../features/devices/DevicesPage"));
const ReportPage = lazy(() => import("../features/reports/ReportPage"));
const HoursCalculatorPage = lazy(() => import("../features/hoursCalculator/HoursCalculatorPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white">
          {/* Gradient Spinner */}
          <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent border-l-blue-500 border-r-purple-500 rounded-full animate-spin mb-4"></div>

          {/* Pulsing Loading Text */}
          <p className="text-xl font-semibold animate-pulse">Loading...</p>

          {/* Optional subtitle */}
          <p className="text-gray-400 mt-2 text-sm text-center">
            Please wait while we prepare your page
          </p>
        </div>
      }
    >
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Main app routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/site" element={<SitesPage />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="/hours-calculator" element={<HoursCalculatorPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/devices" element={<DevicesPage />} />
        </Route>

        {/* Redirect root "/" to "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Catch-all 404 redirect to "/home" */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
}
