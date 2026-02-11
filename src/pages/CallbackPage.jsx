// CallbackPage.jsx
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import Spinner from "../components/Spinner";

export default function CallbackPage() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // Get the "state" parameter from the URL
      const params = new URLSearchParams(window.location.search);
      const returnPath = params.get("state") || "/";

      // Redirect once authenticated
      window.location.href = returnPath;
    }
  }, [auth.isAuthenticated]);

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <Spinner />
        <p className="text-lg">Processing login…</p>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400">
        <p>Login error: {auth.error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <Spinner />
      <p>Finishing login…</p>
    </div>
  );
}
