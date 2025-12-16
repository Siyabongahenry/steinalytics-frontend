import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = null; // TODO: fetch from Cognito
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username) => {
    const loggedInUser = { username }; // TODO: Cognito signIn
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async () => {
    setUser(null); // TODO: Cognito signOut
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
