// src/components/ReportUploadModal/DownloadButtons.jsx
import React from "react";
import { FaDownload, FaFileAlt } from "react-icons/fa";

const DownloadButtons = ({ downloadUrls }) => {
  if (!downloadUrls?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-blue-300">
        Downloads
      </h3>

      <div className="space-y-3">
        {downloadUrls.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center justify-between gap-4
              bg-gray-800/60 hover:bg-gray-700/60
              border border-gray-700
              rounded-xl px-4 py-3
              transition-all
              hover:shadow-lg
            "
          >
            {/* Left: file info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-green-600/20 text-green-400 flex items-center justify-center">
                <FaFileAlt />
              </div>

              <span className="text-sm text-white truncate">
                {item.name}
              </span>
            </div>

            {/* Right: download icon */}
            <FaDownload className="text-gray-400 group-hover:text-green-400 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default DownloadButtons;
