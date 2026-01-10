import { useAuth } from "react-oidc-context";

export default function AuthPage() {
  const auth = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <button
        onClick={() => auth.signinRedirect()}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold"
      >
        Login / Register
      </button>
    </div>
  );
}
