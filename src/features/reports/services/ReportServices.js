// src/services/ReportServices.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const REPORT_ENDPOINTS = {
  "vip-validation": "/vip-validation",
  "overbooking": "/overbooking",
  "multiple-clockings": "/multiple-clockings",
  "exemption": "/exemption",
  "device-clockings": "/device-clockings",
  "lookup": "lookup",
};

export const uploadReport = async (reportType, file, onUploadProgress) => {
  const endpoint = REPORT_ENDPOINTS[reportType];
  if (!endpoint) {
    throw { detail: `Unknown report type: ${reportType}` };
  }

  const formData = new FormData();
  formData.append("contents", file); // match FastAPI Depends parameter if needed

  try {
    const response = await axios.post(`${API_BASE}${endpoint}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress, // this is the key for progress tracking
    });

    return response.data; // { download_url, chart_data? }
  } catch (error) {
    throw error.response?.data || { detail: "Upload failed" };
  }
};
