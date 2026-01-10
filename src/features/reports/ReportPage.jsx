import React, { useState } from "react";
import ReportCard from "./components/ReportCard";
import ReportUploadModal from "./components/ReportUploadModal";
import { FaClock, FaFingerprint, FaExclamationTriangle } from "react-icons/fa";

const reports = [
  { type: "vip-validation", title: "VIP Validation", description: "Identify incorrect VIP Codes", icon: <FaExclamationTriangle /> },
  { type: "overbooking", title: "Overbooking Reports", description: "Detect overbooked employees", icon: <FaExclamationTriangle /> },
  { type: "multiple-clockings", title: "Multiple Clocking Reports", description: "Detect multiple clockings", icon: <FaClock /> },
  { type: "exemption", title: "Exemption Report", description: "Employees with hours greater than 72 per week", icon: <FaExclamationTriangle /> },
  { type: "device-clockings", title: "Device Clockings Count", description: "Total clocking per machine", icon: <FaFingerprint /> },
];

const ReportPage = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-2">
        Reports
      </h1>
      <p className="text-gray-400 mb-6">
        Upload Excel or CSV files to generate reports instantly. Download results with one click.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard
            key={report.type}
            title={report.title}
            description={report.description}
            icon={report.icon}
            onClick={() => setSelectedReport(report)}
          />
        ))}
      </div>

      <ReportUploadModal
        isOpen={!!selectedReport}
        reportType={selectedReport?.type}
        reportTitle = {selectedReport?.title}
        reportDescription ={selectedReport?.description}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  );
};

export default ReportPage;
