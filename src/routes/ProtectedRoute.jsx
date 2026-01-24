// src/auth/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "react-oidc-context";

export default function ProtectedRoute({ allowedGroups }) {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent border-l-blue-500 border-r-purple-500 rounded-full animate-spin mb-4" />
        <p className="text-xl font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userGroups = auth.user?.profile?.["cognito:groups"] || [];

  // Logged in but wrong group
  if (
    allowedGroups &&
    !allowedGroups.some(group => userGroups.includes(group))
  ) {
    return <Navigate to="/home" replace />; // or /unauthorized
  }

  return <Outlet />;
}
