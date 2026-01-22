import React, { useState } from "react";
import ReportCard from "./components/ReportCard";
import ReportUploadModal from "./components/ReportUploadModal";
import { REPORTS } from "./config/reportConfig"; // <-- import centralized reports

const ReportPage = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text mb-2">
        Reports
      </h1>

      <p className="text-gray-400 mb-6">
        Upload Excel or CSV files to generate reports instantly. Download results with one click.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {REPORTS.map((report) => {
          const Icon = report.icon;
          return (
            <ReportCard
              key={report.type}
              title={report.title}
              description={report.description}
              icon={<Icon />}
              onClick={() => setSelectedReport(report)}
            />
          );
        })}
      </div>

      <ReportUploadModal
        isOpen={!!selectedReport}
        reportType={selectedReport?.type}
        reportTitle={selectedReport?.title}
        reportDescription={selectedReport?.description}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  );
};

export default ReportPage;
