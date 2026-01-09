import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const REPORT_ENDPOINTS = {
  "vip-validation": "/vip-validation",
  "overbooking": "/overbooking",
  "multiple-clockings": "/multiple-clockings",
  "exemption": "/exemption",
  "device-clockings": "/device-clockings",
  "lookup": "/lookup", // fixed missing slash
};

// Upload with progress
export const uploadReportWithProgress = async (reportType, file, onProgress = () => {}) => {
  const endpoint = REPORT_ENDPOINTS[reportType];
  if (!endpoint) throw { detail: `Unknown report type: ${reportType}` };

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE}${endpoint}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const total = progressEvent.total || 1;
        const percent = Math.round((progressEvent.loaded * 100) / total);
        onProgress(percent);
      },
    });
    return response.data; // expected: { download_url, chart_data? }
  } catch (error) {
    throw error.response?.data || { detail: "Upload failed" };
  }
};
