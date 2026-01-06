import React, { useState } from "react";
import JournalCard from "./components/JournalCard";
import JournalUploadModal from "./components/JournalUploadModal";
import { FaUserCheck, FaCopy, FaClock } from "react-icons/fa";

const reports = [
  {
    type: "vip-validation",
    title: "VIP Validation",
    description: "Check VIP codes for shifts",
    icon: <FaUserCheck />,
  },
  {
    type: "duplicated-hours",
    title: "Duplicated Hours",
    description: "Detect overlapping work hours",
    icon: <FaCopy />,
  },
  {
    type: "overbooking",
    title: "Overbooking",
    description: "Detect overbooked employees",
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
          <JournalCard
            key={report.type}
            title={report.title}
            description={report.description}
            icon={report.icon}
            onClick={() => setSelectedReport(report.type)}
          />
        ))}
      </div>

      <JournalUploadModal
        isOpen={!!selectedReport}
        reportType={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  );
};

export default ReportPage;
