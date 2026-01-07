// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import  AuthContext from "./AuthContext";
import {auth} from "../auth/authService.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      try {
        const u = await auth.currentUser();
        setUser(u);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initUser();
  }, []);

  const login = async (email, password) => {
    const u = await auth.signIn(email, password);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const signup = async (email, password) => auth.signUp(email, password);
  const confirmSignup = async (email, code) => auth.confirm(email, code);
  const getToken = async () => auth.getToken();

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        signup,
        confirmSignup,
        getToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
