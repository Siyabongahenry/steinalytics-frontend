// services/services.js
import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
});

// Mock data for development
const mockDevices = [
  {
    name: "Majuba-01",
    serial_no: "54648446415",
    status:"active",
    chartData: [
      { date: "2026-01-01", clockings: 5 },
      { date: "2026-01-02", clockings: 8 },
      { date: "2026-01-03", clockings: 6 },
      { date: "2026-01-04", clockings: 10 },
      { date: "2026-01-05", clockings: 7 },
    ],
  },
  {
    name: "Majuba-02",
    serial_no: "54648446416",
    status:"active",
    chartData: [
      { date: "2026-01-01", clockings: 7 },
      { date: "2026-01-02", clockings: 9 },
      { date: "2026-01-03", clockings: 4 },
      { date: "2026-01-04", clockings: 11 },
      { date: "2026-01-05", clockings: 6 },
    ],
  },
  {
    name: "Majuba-03",
    serial_no: "54648446417",
    status:"faulty",
    chartData: [
      { date: "2026-01-01", clockings: 0 },
      { date: "2026-01-02", clockings: 0 },
      { date: "2026-01-03", clockings: 0 },
      { date: "2026-01-04", clockings: 0 },
      { date: "2026-01-05", clockings: 0 },
    ],
  },
];

// Service function
export const getDevices = async () => {
  try {
    // In development, return mock data
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDevices), 500); // simulate network delay
      });
    }

    // In production, call real backend
    const response = await api.get("/devices");


    return response

  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};
