// src/services/ReportServices.js
import axios from "axios";
import { useAuth } from "react-oidc-context";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const REPORT_ENDPOINTS = {
  "vip-validation": "/vip-validation",
  "overbooking": "/overbooking",
  "multiple-clockings": "/multiple-clockings",
  "exemption": "/exemption",
  "device-clockings": "/device-clockings",
  "employees-attendance": "/attendance/employee-attendance-summary",
  "employees-on-site": "/attendance/site-summary",
};

const extractFastApiError = (error) => {
  if (!error.response) {
    return "Network error. Please try again.";
  }

  const detail = error.response.data?.detail;

  if (Array.isArray(detail)) {
    return detail.map((e) => e.msg).join(", ");
  }

  if (typeof detail === "string") {
    return detail;
  }

  return `Request failed (${error.response.status})`;
};

// Hook-based function to upload report with token
export const useReportServices = () => {
  const auth = useAuth(); // gives you access to auth.user and auth.user.access_token

  const uploadReport = async (reportType, file, onUploadProgress) => {
    const endpoint = REPORT_ENDPOINTS[reportType];

    if (!endpoint) {
      throw new Error(`Unknown report type: ${reportType}`);
    }

    const formData = new FormData();
    formData.append("file", file); // must match FastAPI param

    try {
      console.log("Sending file to backend");
      console.log(`File sent to - ${API_BASE}${endpoint}`);

      const response = await axios.post(`${API_BASE}${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.user?.access_token}`, // <-- include token here
        },
        onUploadProgress,
      });

      console.log(`File sent to - ${API_BASE}${endpoint}`);

      return response.data;
    } catch (error) {
      throw new Error(extractFastApiError(error));
    }
  };

  return { uploadReport };
};
