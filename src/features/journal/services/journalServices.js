import axios from "axios";

const API_BASE = "http://localhost:8000";

// Map report types to backend endpoints
const REPORT_ENDPOINTS = {
  "vip-validation": "/vip/validate-and-export",
  "duplicated-hours": "/duplicates/validate-and-export",
  "overbooking": "/overbooking/validate-and-export",
  // add more report types here
};

export const uploadReport = async (reportType, file) => {
  const endpoint = REPORT_ENDPOINTS[reportType];
  if (!endpoint) {
    throw { detail: `Unknown report type: ${reportType}` };
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE}${endpoint}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // e.g., { incorrect_rows, download_url }
  } catch (error) {
    throw error.response?.data || { detail: "Upload failed" };
  }
};
