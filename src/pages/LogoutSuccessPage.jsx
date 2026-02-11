// LogoutSuccessPage.jsx
import { Link } from "react-router-dom";

export default function LogoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-green-400 mb-4">
          You’ve Signed Out
        </h1>

        <p className="mb-6 text-gray-300">
          Your session has ended successfully. Thanks for visiting!
        </p>

        <Link
          to="/"
          className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold block"
        >
          Return to Home
        </Link>

        <Link
          to="/login"
          className="block mt-4 text-sm text-gray-400 hover:text-blue-400 transition"
        >
          Sign back in
        </Link>
      </div>
    </div>
  );
}
