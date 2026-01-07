import React, { useState } from "react";
import ReportCard from "./components/ReportCard";
import ReportUploadModal from "./components/ReportUploadModal";
import { FaUserCheck, FaClock, FaFingerprint, FaExclamationTriangle } from "react-icons/fa";

const reports = [
  {
    type: "vip-validation",
    title: "VIP Validation",
    description: "Identify incorrect VIP Codes",
    icon: <FaUserCheck />,
  },
  {
    type: "overbooking",
    title: "Overbooking Reports",
    description: "Detect overbooked employees",
    icon: <FaExclamationTriangle />,
  },
  {
    type: "multiple-clockings",
    title: "Multiple Clocking Reports",
    description: "Detect multiple clockings",
    icon: <FaClock />,
  },
  {
    type: "exemption",
    title: "Exemption Report",
    description: "Employees with hours greater than 72 per week",
    icon: <FaExclamationTriangle />,
  },
  {
    type: "device-clockings",
    title: "Device Clockings Count",
    description: "Total clocking sper machine",
    icon: <FaFingerprint />,
  },
];

const ReportPage = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard
            key={report.type}
            title={report.title}
            description={report.description}
            icon={report.icon}
            onClick={() => setSelectedReport(report.type)}
          />
        ))}
      </div>

      <ReportUploadModal
        isOpen={!!selectedReport}
        reportType={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  );
};

export default ReportPage;
