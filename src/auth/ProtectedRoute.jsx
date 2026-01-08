// src/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth.js"; // include .js for Vite

export function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  // Show a loading indicator while auth state is initializing
  if (loading) return <div>Loading...</div>;

  // Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Render the protected page if logged in
  return children;
}
