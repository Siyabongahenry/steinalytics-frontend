// LogoutPage.jsx
import { useAuth } from "react-oidc-context";

export default function LogoutPage() {
  const auth = useAuth();

  const signOutRedirect = async () => {
   
    await auth.signoutRedirect();
    // Clear local tokens
    auth.removeUser();
     
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Confirm Sign Out</h1>

        {auth.isAuthenticated ? (
          <>
            <p className="mb-6 text-gray-300">
              You are signed in as{" "}
              <span className="font-semibold text-blue-400">
                {auth.user?.profile?.email}
              </span>
              .
            </p>

            <button
              onClick={signOutRedirect}
              className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 transition font-semibold"
            >
              Yes, Sign Me Out
            </button>

            <a
              href="/"
              className="block mt-4 text-sm text-gray-400 hover:text-blue-400 transition"
            >
              Cancel and go back
            </a>
          </>
        ) : (
          <p className="text-gray-400">You are not signed in.</p>
        )}
      </div>
    </div>
  );
}
