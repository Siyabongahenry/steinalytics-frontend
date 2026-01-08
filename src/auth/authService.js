// src/auth/authService.js
// Change the import path to your generated JSON file
import amplifyconfig from "../config/amplifyconfiguration.json"; 

import { Amplify } from "aws-amplify";
import {
  signUp as amplifySignUp,
  confirmSignUp as amplifyConfirm,
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  getCurrentUser,
  fetchAuthSession,
} from "aws-amplify/auth";

// Configure Amplify with the imported JSON configuration
Amplify.configure(amplifyconfig);

export const auth = {
  // Register a new user
  signUp: async (email, password) => {
    try {
      // In v6, 'username' is typically the primary identifier (email or actual username)
      const result = await amplifySignUp({ username: email, password });
      return result; // includes nextStep if confirmation is required
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    }
  },

  // Confirm sign-up with code
  confirm: async (email, code) => {
    try {
      const result = await amplifyConfirm({
        username: email,
        confirmationCode: code,
      });
      return result;
    } catch (error) {
      console.error("Confirmation error:", error);
      throw error;
    }
  },

  // Sign in user
  signIn: async (email, password) => {
    try {
      const result = await amplifySignIn({ username: email, password });
      // result = { isSignedIn, userId, nextStep }
      return result;
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      return await amplifySignOut();
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  },

  // Get current authenticated user
  currentUser: async () => {
    try {
      // Returns a User object with username, userId, and attributes
      return await getCurrentUser();
    } catch (error) {
      console.error("Current user error:", error);
      throw error;
    }
  },

  // Get tokens (ID, Access, Refresh)
  getTokens: async () => {
    try {
      const session = await fetchAuthSession();
      // Tokens are now accessed slightly differently on the session object in v6
      return {
        idToken: session.tokens?.idToken?.toString(),
        accessToken: session.tokens?.accessToken?.toString(),
        refreshToken: session.tokens?.refreshToken?.toString(),
      };
    } catch (error) {
      // Catches if the user is not authenticated/session is invalid
      console.error("Token retrieval error:", error);
      throw error;
    }
  },
};
