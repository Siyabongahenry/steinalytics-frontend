// src/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

export function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuth();

  // Show a loading indicator while auth state is initializing
  if (isLoading) return (
        <div>
            {/* Gradient Spinner */}
            <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent border-l-blue-500 border-r-purple-500 rounded-full animate-spin mb-4"></div>
            {/* Pulsing Loading Text */}
        <p className="text-xl font-semibold animate-pulse">Loading...</p>
    
        </div>);

  // Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Render the protected page if logged in
  return children;
}
