import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth.js";

export default function RegisterPage() {
  const { signup, confirmSignup, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(email, password); // Amplify signup
      setCodeSent(true); // show confirmation input
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await confirmSignup(email, confirmationCode); // confirm email
      await login(email, password); // auto-login after confirmation
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Confirmation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md text-white">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Create Account</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!codeSent ? (
          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-5 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-5 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md font-semibold"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleConfirm} className="space-y-6">
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder="Confirmation code"
              required
              className="w-full px-5 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl shadow-md font-semibold"
            >
              {loading ? "Verifying..." : "Confirm & Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
