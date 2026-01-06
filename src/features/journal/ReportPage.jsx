import React, { useState } from "react";
import ReportCard from "./components/ReportCard";
import ReportUploadModal from "./components/ReportUploadModal";
import { FaUserCheck, FaCopy, FaClock } from "react-icons/fa";

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
    icon: <FaClock />,
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
    icon: <FaClock />,
  },
];

const ReportPage = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Journal Reports</h1>

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
