// src/pages/LoginPage.jsx
import { useState } from "react";
//import { Auth } from "../config/awsConfig"; // from your config folder

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      //const user = await Auth.signIn(username, password);
      //console.log("Login successful:", user);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  //const handleSocialLogin = (provider) => {
    // Redirect to Cognito Hosted UI for social login
   // Auth.federatedSignIn({ provider });
  //};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md text-white">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">
          Steinalytics
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        {/* Email / Password Login */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Email or Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md font-semibold transition flex justify-center items-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-4 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <button
            //onClick={() => handleSocialLogin("Google")}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl shadow-md flex justify-center items-center font-semibold transition"
          >
            Sign in with Google
          </button>
          <button
            //onClick={() => handleSocialLogin("Facebook")}
            className="w-full py-3 bg-blue-800 hover:bg-blue-900 rounded-xl shadow-md flex justify-center items-center font-semibold transition"
          >
            Sign in with Facebook
          </button>
        </div>

        <div className="flex justify-between mt-6 text-sm text-gray-400">
          <a href="/forgot-password" className="hover:underline">
            Forgot Password?
          </a>
          <a href="/signup" className="hover:underline">
            Sign Up
          </a>
        </div>

        <div className="mt-8 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Steinalytics. All rights reserved.
        </div>
      </div>
    </div>
  );
}
