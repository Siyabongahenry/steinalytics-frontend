import { useState } from "react";
import { useAuth } from "react-oidc-context";

export default function AuthPage() {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await auth.signinRedirect();
    } catch (err) {
      console.error("Signin redirect failed:", err);
      setLoading(false); // reset if redirect fails
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 px-4 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative w-full max-w-sm bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 text-xl">
            🔐
          </div>

          <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="group relative w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all text-white text-base font-medium shadow-lg shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Redirecting...
              </>
            ) : (
              <>
                Login / Register
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </>
            )}
          </span>

          {/* Button shine */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          Secure authentication · OpenID Connect
        </p>
      </div>
    </div>
  );
}
