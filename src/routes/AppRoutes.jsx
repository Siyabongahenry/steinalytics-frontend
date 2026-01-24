// src/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Spinner from "../components/Spinner.jsx"
import LogoutPage from "../pages/LogoutPage.jsx"
import CallbackPage from "../pages/CallbackPage"

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
         
          <Spinner/>

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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/home" element={<HomePage />} />
       
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/site" element={<SitesPage />} />
          <Route path="/reports" element={<ReportPage />} />
          <Route path="/hours-calculator" element={<HoursCalculatorPage />} />
        <Route path="logout" element={<LogoutPage/>}/>
          
        </Route>

        {/* Redirect root "/" to "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Catch-all 404 redirect to "/home" */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
}
