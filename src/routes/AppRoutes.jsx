// src/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Spinner from "../components/Spinner.jsx";
import LogoutPage from "../pages/LogoutPage.jsx";
import CallbackPage from "../pages/CallbackPage";

/* Lazy-loaded pages */
const HomePage = lazy(() => import("../pages/HomePage"));
const SitesPage = lazy(() => import("../pages/SitesPage"));
const ReportListPage = lazy(() => import("../features/reports/ReportListPage"));
const ReportAnalyzerPage = lazy(() => import("../features/reports/pages/ReportAnalyzerPage.jsx"));
const ProfilePage = lazy(() => import("../features/profile/ProfilePage.jsx"));
const LibraryPage = lazy(() => import("../features/library/LibraryPage.jsx"));
const BookDetailsPage = lazy(() => import("../features/library/pages/BookDetailsPage.jsx"));
const BorrowPage = lazy(() => import("../features/library/pages/BorrowPage.jsx"));
const DonationPage = lazy(() => import("../features/library/pages/DonationPage.jsx"));
const EmailOrganizer = lazy(() => import("../features/emailOrganizer/EmailOrganizerPage.jsx"));
const HoursCalculatorPage = lazy(() =>
  import("../features/hoursCalculator/HoursCalculatorPage")
);
const AboutPage = lazy(() => import("../pages/AboutPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center bg-gray-900 text-white">
          <Spinner />
          <p className="text-xl font-semibold animate-pulse">Loading...</p>
          <p className="text-gray-400 mt-2 text-sm text-center">
            Please wait while we prepare your page
          </p>
        </div>
      }
    >
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Library feature routes */}
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/books/:id" element={<BookDetailsPage />} />
        <Route path="/library/books/:id/borrow" element={<BorrowPage />} />
        <Route path="/library/donate" element={<DonationPage />} />

        <Route path="/email-organizer" element={<EmailOrganizer />} />
        <Route path="/callback" element={<CallbackPage />} />

        <Route path="/reports" element={<ReportListPage />} />
        <Route path="/reports/:reportType" element={<ReportAnalyzerPage />} />


        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/statistics" element={<SitesPage />} />
          <Route path="/hours-calculator" element={<HoursCalculatorPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
}
