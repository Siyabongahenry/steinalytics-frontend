import { useState, useRef, useEffect } from "react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAuth } from "react-oidc-context";

export default function Header({ setSidebarOpen }) {
  const auth = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName =
    auth.user?.profile?.email ||
    auth.user?.profile?.["cognito:username"] ||
    "Guest";

  const handleAuthRedirect = (signup = false) => {
    setRedirecting(true);
    const currentPath =
      window.location.pathname +
      window.location.search +
      window.location.hash;

    // If signup=true, Cognito will show the registration page
    const options = {
      state: currentPath,
      ...(signup && { extraQueryParams: { screen_hint: "signup" } }),
    };

    auth.signinRedirect(options);
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-gray-900 shadow-md p-4">
      {/* Mobile sidebar toggle */}
      <button
        aria-label="Open sidebar"
        className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition"
        onClick={() => setSidebarOpen(true)}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Branding */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center shadow-md">
          <span className="text-white font-extrabold text-lg">S</span>
        </div>
        <div className="flex flex-col leading-none">
          <h1 className="text-xl font-extrabold text-blue-400">Steinalytics</h1>
          <span className="text-xs text-gray-500 tracking-wide">
            Live Data Analytics
          </span>
        </div>
      </div>

      {/* User dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-md hover:bg-gray-800 transition"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <span className="hidden sm:inline">{displayName}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg overflow-hidden">
            {auth.isAuthenticated ? (
              <button
                onClick={() => (window.location.href = "/logout")}
                className="w-full text-left px-4 py-2 hover:bg-red-600 transition text-white"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => handleAuthRedirect()}
                className="w-full text-left px-4 py-2 hover:bg-blue-600 transition text-white flex items-center gap-2"
              >
                {redirecting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                  "Sign In / Register"
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
