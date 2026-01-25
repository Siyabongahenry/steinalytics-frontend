// src/services/UserReportsService.js
import axios from "axios";
import { useOidcAccessToken } from "@axa-fr/react-oidc-context";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

// Hook to get Axios instance with Authorization header
export const useAuthAxios = () => {
  const { accessToken } = useOidcAccessToken();
  
  const authAxios = axios.create({
    baseURL: API_BASE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return authAxios;
};

// Service functions now receive authAxios
export const getUserReports = async (authAxios) => {
  try {
    const response = await authAxios.get(`/reports`);
    return response.data; // Expecting array of reports
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.detail || "Failed to fetch reports");
  }
};

export const deleteUserReport = async (authAxios, reportId) => {
  try {
    const response = await authAxios.delete(`/reports/${reportId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.detail || "Failed to delete report");
  }
};
