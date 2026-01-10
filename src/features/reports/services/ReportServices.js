// src/services/ReportServices.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const REPORT_ENDPOINTS = {
  "vip-validation": "/vip-validation",
  "overbooking": "/overbooking",
  "multiple-clockings": "/multiple-clockings",
  "exemption": "/exemption",
  "device-clockings": "/device-clockings",
  "lookup": "/lookup",
};

const extractFastApiError = (error) => {
  const detail = error?.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail.map(d => d.msg).join(", ");
  }

  if (typeof detail === "string") {
    return detail;
  }

  return "Upload failed";
};

export const uploadReport = async (reportType, file, onUploadProgress) => {
  const endpoint = REPORT_ENDPOINTS[reportType];

  if (!endpoint) {
    throw new Error(`Unknown report type: ${reportType}`);
  }

  const formData = new FormData();
  formData.append("file", file); // must match FastAPI param

  try {
    const response = await axios.post(
      `${API_BASE}${endpoint}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(extractFastApiError(error));
  }
};
