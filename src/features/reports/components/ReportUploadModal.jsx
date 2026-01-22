// src/components/ReportUploadModal.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { uploadReport } from "../services/ReportServices";
import { FaInfoCircle } from "react-icons/fa";
import FileProgressList from "./ReportUploadModal/FileProgressList";
import DownloadButtons from "./ReportUploadModal/DownloadButtons";
import ChartsDisplay from "./ReportUploadModal/ChartsDisplay";

// Main Modal Component
const ReportUploadModal = ({ isOpen, onClose, reportType, reportTitle, reportDescription }) => {
  // --- State ---
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState("");

  // --- Reset modal state on close ---
  useEffect(() => {
    if (!isOpen) {
      setFiles([]);
      setLoading(false);
      setDownloadUrls([]);
      setChartData([]);
      setProgress({});
      setError("");
    }
  }, [isOpen]);

  // --- Dropzone callback ---
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setDownloadUrls([]);
    setChartData([]);
    setProgress({});
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

  // --- Animate processing bar ---
  const animateProcessing = (fileName) => {
    let proc = 0;
    const interval = setInterval(() => {
      proc = Math.min(proc + 3, 95);
      setProgress(prev => ({
        ...prev,
        [fileName]: { ...prev[fileName], processing: proc }
      }));
    }, 100);
    return interval;
  };

  // --- Upload files and generate reports ---
  const handleUpload = async () => {
    if (!files.length) return;

    setLoading(true);
    setError("");
    setDownloadUrls([]);
    setChartData([]);
    setProgress({});

    const urls = [];
    const charts = [];

    for (const file of files) {
      // Initialize progress
      setProgress(prev => ({
        ...prev,
        [file.name]: { upload: 0, processing: 0, status: "uploading", errorMsg: "" }
      }));

      const interval = animateProcessing(file.name);

      try {
        const res = await uploadReport(reportType, file, (event) => {
          if (!event.total) return;
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(prev => ({
            ...prev,
            [file.name]: { ...prev[file.name], upload: percent }
          }));
        });

        clearInterval(interval);

        setProgress(prev => ({
          ...prev,
          [file.name]: { ...prev[file.name], upload: 100, processing: 0, status: "processing" }
        }));

        // Finish processing instantly (can adjust if backend provides progress)
        setProgress(prev => ({
          ...prev,
          [file.name]: { upload: 100, processing: 100, status: "done", errorMsg: "" }
        }));

        // Collect download URLs and chart data
        urls.push({ name: file.name, url: res.download_url });
      
        if (res.data) charts.push( ...res.data );
            

         console.log(charts[0].Date)

      } catch (err) {
        clearInterval(interval);
        console.error(err);

        setProgress(prev => ({
          ...prev,
          [file.name]: {
            ...prev[file.name],
            processing: prev[file.name].upload === 100 ? 100 : prev[file.name].processing,
            status: "error",
            errorMsg: err.message || "Upload failed"
          }
        }));

        setError(err.message || "Upload failed");
      }
    }

    setDownloadUrls(urls);
    setChartData(charts);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-start overflow-y-auto z-50 p-6">
      <div className="bg-gray-900 text-white rounded-2xl w-full max-w-6xl p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title & Description */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            {reportTitle}
          </h2>
          {reportDescription && (
            <div className="flex items-center text-gray-300 text-base sm:text-lg gap-2">
              <FaInfoCircle className="text-blue-400 mt-1" />
              <span>{reportDescription}</span>
            </div>
          )}
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-4 transition ${
            isDragActive ? "border-blue-400" : "border-gray-600"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop files here...</p>
          ) : (
            <p>Drag & drop Excel or CSV files here, or click to select</p>
          )}
        </div>

        {/* File Progress */}
        <FileProgressList files={files} progress={progress} />

        {/* Upload Button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full mb-4 transition disabled:opacity-50"
          onClick={handleUpload}
          disabled={loading || files.length === 0}
        >
          {loading ? "Uploading..." : "Upload & Generate Reports"}
        </button>

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Download Buttons */}
        <DownloadButtons downloadUrls={downloadUrls} />

        {/* Charts */}
        <ChartsDisplay chartData={chartData} reportType={reportType} />
      </div>
    </div>
  );
};

export default ReportUploadModal;
