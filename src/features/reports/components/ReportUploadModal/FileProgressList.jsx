// src/components/ReportUploadModal/FileProgressList.jsx
import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const FileProgressList = ({ files, progress }) => {
  if (!files.length) return null;

  return (
    <ul className="mb-4 space-y-4">
      {files.map((file) => {
        const prog = progress[file.name] || { upload: 0, processing: 0, status: "idle", errorMsg: "" };
        const isError = prog.status === "error";
        const isDone = prog.status === "done";

        return (
          <li key={file.name}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-200 truncate">{file.name}</p>
              {isDone && <FaCheckCircle className="text-green-400" />}
              {isError && <FaExclamationCircle className="text-red-500" />}
            </div>

            {/* Upload bar */}
            <div className={`w-full rounded-full h-5 mb-2 overflow-hidden relative border ${isError && prog.upload < 100 ? "border-red-500" : "border-gray-700"}`}>
              <div
                className={`h-5 transition-all duration-300 ${isError && prog.upload < 100 ? "bg-red-500" : "bg-blue-500"}`}
                style={{ width: `${prog.upload}%` }}
              />
              <span className="absolute right-2 top-0 text-xs text-white">Upload {prog.upload}%</span>
              {isError && prog.upload < 100 && <span className="absolute left-2 top-0 text-xs text-white">{prog.errorMsg}</span>}
            </div>

            {/* Processing bar */}
            {prog.upload === 100 && (
              <div className={`w-full rounded-full h-5 mb-2 overflow-hidden relative border ${isError && prog.upload === 100 ? "border-red-500" : "border-gray-700"}`}>
                <div
                  className={`h-5 transition-all duration-300 ${isError && prog.upload === 100 ? "bg-red-500" : "bg-purple-500"}`}
                  style={{ width: `${prog.processing}%` }}
                />
                <span className="absolute right-2 top-0 text-xs text-white">Processing {prog.processing}%</span>
                {isError && <span className="absolute left-2 top-0 text-xs text-white">{prog.errorMsg}</span>}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default FileProgressList;
