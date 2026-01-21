// OidcCallback.jsx
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export default function OidcCallback() {
  const auth = useAuth();

  useEffect(() => {
    auth.signinRedirectCallback()
      .then(() => {
        // redirect to home or dashboard after successful login
        window.location.replace("/");
      })
      .catch((err) => {
        console.error("Callback error:", err);
      });
  }, [auth]);

  return <p>Processing login...</p>;
}
