// src/features/reports/config/reportConfig.js
import { FaClock, FaFingerprint, FaExclamationTriangle, FaUserCheck, FaUsers } from "react-icons/fa";

export const REPORTS = [
  {
    type: "vip-validation",
    title: "VIP Validation",
    description: "Identify incorrect VIP Codes",
    icon: FaExclamationTriangle,
    allowMultipleFiles: true,
  },
  {
    type: "overbooking",
    title: "Overbooking Reports",
    description: "Detect overbooked employees",
    icon: FaExclamationTriangle,
    allowMultipleFiles: true,
  },
  {
    type: "multiple-clockings",
    title: "Multiple Clocking Reports",
    description: "Detect multiple clockings",
    icon: FaClock,
    allowMultipleFiles: true,
  },
  {
    type: "exemption",
    title: "Exemption Report",
    description: "Employees with hours greater than 72 per week",
    icon: FaExclamationTriangle,
    allowMultipleFiles: true,
  }
  ,
  {
    type: "exemption/pivoted",
    title: "Exemption Report Pivoted",
    description: "Employees with hours greater than 72 per week",
    icon: FaExclamationTriangle,
    allowMultipleFiles: true,
  }
  ,
  {
    type: "device-clockings",
    title: "Device Clockings Count",
    description: "Total clocking per machine",
    icon: FaFingerprint,
    allowMultipleFiles: true,
  },
  {
    type: "employees-attendance",
    title: "Employees Attendance",
    description: "Count total attendance per employee",
    icon: FaUserCheck,
    allowMultipleFiles: true,
  },
  {
    type: "employees-on-site",
    title: "Summary of Employees per Site",
    description: "Count total employees per site",
    icon: FaUsers,
    allowMultipleFiles: true,
  },
];
