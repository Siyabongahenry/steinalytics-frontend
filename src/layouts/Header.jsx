import { useState, useRef, useEffect } from "react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import useAuth from "../context/useAuth";

export default function Header({ setSidebarOpen }) {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
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
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">
          S
        </div>
        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Steinalytics
        </h1>
      </div>

      {/* User dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <span>{user?.username || "Guest"}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg overflow-hidden">
            {user ? (
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-red-600 transition text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <a
                  href="/login"
                  className="block px-4 py-2 hover:bg-gray-700 transition text-white"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block px-4 py-2 hover:bg-gray-700 transition text-white"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
