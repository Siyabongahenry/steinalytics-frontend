import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

// Factory function (NO hooks here)
export const createAuthAxios = (accessToken) => {
  return axios.create({
    baseURL: API_BASE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const getUserReports = async (authAxios) => {
  try {
    const response = await authAxios.get("/reports");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.detail || "Failed to fetch reports"
    );
  }
};

export const deleteUserReport = async (authAxios, reportId) => {
  try {
    const response = await authAxios.delete(`/reports/${reportId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.detail || "Failed to delete report"
    );
  }
};
