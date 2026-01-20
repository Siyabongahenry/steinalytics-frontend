import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export default function Callback() {
  const auth = useAuth();

  useEffect(() => {
    auth.signinRedirectCallback().catch(console.error);
  }, [auth]);

  return <p>Signing you in...</p>;
}
