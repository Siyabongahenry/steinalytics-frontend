// src/components/ReportUploadModal/DownloadButtons.jsx
import React from "react";
import { FaDownload } from "react-icons/fa";

const DownloadButtons = ({ downloadUrls }) => {
  if (!downloadUrls.length) return null;

  return (
    <div className="mb-6">
      <h3 className="font-bold text-xl mb-4">Download Reports</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {downloadUrls.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-green-700 hover:bg-green-600 text-white font-medium px-4 py-3 rounded-lg shadow-md transition"
          >
            <span className="truncate">{item.name}</span>
            <FaDownload className="ml-2" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default DownloadButtons;
