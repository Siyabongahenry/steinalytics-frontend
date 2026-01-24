// src/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Spinner from "./components/Spinner.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import CallbackPage from "./pages/CallbackPage.jsx";

/* Lazy-loaded pages */
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const SitesPage = lazy(() => import("./pages/SitesPage.jsx"));
const DevicesPage = lazy(() => import("./features/devices/DevicesPage.jsx"));
const ReportPage = lazy(() => import("./features/reports/ReportPage.jsx"));
const HoursCalculatorPage = lazy(() =>
  import("./features/hoursCalculator/HoursCalculatorPage.jsx")
);
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx"));
const UnauthorizedPage = lazy(() => import("./pages/UnauthorizedPage.jsx"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white">
          <Spinner />
          <p className="text-xl font-semibold animate-pulse">Loading...</p>
          <p className="text-gray-400 mt-2 text-sm text-center">
            Please wait while we prepare your page
          </p>
        </div>
      }
    >
      <Routes>
        {/* Redirect root "/" to "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected routes with group-based access */}
       
        <Route element={<ProtectedRoute allowedGroups={["site-admin"]} />}>
          <Route path="/site" element={<SitesPage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/reports" element={<ReportPage />} />
        </Route>

        {/* Any authenticated user */}
        <Route element={<ProtectedRoute />}>
          <Route path="/hours-calculator" element={<HoursCalculatorPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
}
