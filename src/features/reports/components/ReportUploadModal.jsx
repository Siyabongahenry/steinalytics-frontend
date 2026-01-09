import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadReportWithProgress } from "../services/ReportServices";
import { FaUpload } from "react-icons/fa";

const ReportUploadModal = ({ isOpen, onClose, reportType }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) => ({
        file,
        progress: 0,
        status: "pending",
        downloadUrl: null,
        chartData: null,
      }))
    );
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx", ".xls"],
      "text/csv": [".csv"],
    },
    multiple: true,
  });

  const updateFile = (index, updates) => {
    setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setLoading(true);
    setError("");

    try {
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        updateFile(i, { status: "uploading", progress: 0 });

        const res = await uploadReportWithProgress(reportType, f.file, (percent) => {
          updateFile(i, { progress: percent });
        });

        updateFile(i, {
          status: "done",
          progress: 100,
          downloadUrl: res.download_url,
          chartData: res.chart_data || null,
        });
      }
    } catch (err) {
      setError(err.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center overflow-auto p-4">
      <div className="bg-gray-900 text-white rounded-2xl w-full max-w-6xl min-h-screen p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-white text-3xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="font-bold text-3xl mb-8 capitalize">{reportType}</h2>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-xl p-12 text-center cursor-pointer mb-8 transition ${
            isDragActive ? "border-blue-400 bg-gray-800" : "border-gray-600"
          }`}
        >
          <input {...getInputProps()} />
          <FaUpload className="mx-auto text-5xl text-blue-400 mb-4" />
          {isDragActive ? (
            <p>Drop files here...</p>
          ) : (
            <p>Drag & drop Excel or CSV files here, or click to select</p>
          )}
        </div>

        {/* Files list with progress */}
        {files.length > 0 && (
          <div className="mb-8 max-h-96 overflow-y-auto space-y-4">
            {files.map((f) => (
              <div key={f.file.name} className="bg-gray-800 p-4 rounded-lg shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{f.file.name}</span>
                  <span className="text-sm text-gray-400">{f.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 h-3 rounded">
                  <div
                    className={`h-3 rounded transition-all ${
                      f.status === "error"
                        ? "bg-red-500"
                        : f.status === "done"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${f.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 capitalize">{f.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl w-full disabled:opacity-50 transition mb-4"
          onClick={handleUpload}
          disabled={loading || !files.length}
        >
          {loading ? "Uploading..." : "Upload & Generate Reports"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Download Links */}
        {files.some((f) => f.downloadUrl) && (
          <div className="mt-8">
            <h3 className="font-bold text-2xl mb-4">Download Reports</h3>
            <ul className="space-y-2">
              {files.filter((f) => f.downloadUrl).map((f) => (
                <li key={f.downloadUrl}>
                  <a
                    href={f.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 underline hover:text-green-300"
                  >
                    {f.file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Placeholder for future charts */}
        {files.some((f) => f.chartData) && (
          <div className="mt-10">
            <h3 className="font-bold text-2xl mb-4">Charts (coming soon)</h3>
            <p className="text-gray-400">Chart data will render here once implemented.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportUploadModal;
