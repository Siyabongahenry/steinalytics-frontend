// src/components/ReportUploadModal.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { uploadReport } from "../services/ReportServices";
import { FaInfoCircle, FaUpload } from "react-icons/fa";
import FileProgressList from "./ReportUploadModal/FileProgressList";
import DownloadButtons from "./ReportUploadModal/DownloadButtons";
import ChartsDisplay from "./ReportUploadModal/ChartsDisplay";
import { useInView } from "react-intersection-observer";

// LazyChart wrapper inside same file
const LazyChart = ({ data }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // load when 20% visible
  });

  return (
    <div ref={ref} className="min-h-[250px] flex items-center justify-center">
      {inView ? (
        <ChartsDisplay chartData={[data]} />
      ) : (
        <p className="text-gray-500">Loading chart...</p>
      )}
    </div>
  );
};

const ReportUploadModal = ({ isOpen, onClose, reportType, reportTitle, reportDescription }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState("");

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

        setProgress(prev => ({
          ...prev,
          [file.name]: { upload: 100, processing: 100, status: "done", errorMsg: "" }
        }));

        urls.push({ name: file.name, url: res.download_url });
        if (res.data) charts.push(...res.data);

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

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: Dropzone + File Progress + Upload */}
          <div>
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl h-32 flex items-center justify-center text-center cursor-pointer mb-6 transition ${
                isDragActive ? "border-blue-400 bg-blue-900/20" : "border-gray-600 bg-gray-800/40"
              } hover:border-blue-500 hover:bg-gray-800/60`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="flex items-center gap-2 text-blue-300 font-medium">
                  <FaUpload /> Drop files here...
                </p>
              ) : (
                <p className="flex items-center gap-2 text-gray-400">
                  <FaUpload /> Drag & drop Excel/CSV or click to select
                </p>
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
          </div>

          {/* Right column: Downloads + Charts */}
          <div className="relative">
            {/* Sticky header */}
            <div className="sticky top-0 bg-gray-900 z-10 pb-2">
              <h3 className="text-xl font-semibold text-blue-300">Report Results</h3>
              <DownloadButtons downloadUrls={downloadUrls} />
            </div>

            {/* Charts with scrollable container */}
            <div className="min-h-[400px] max-h-[600px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chartData.map((chart, idx) => (
                  <LazyChart key={idx} data={chart} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportUploadModal;
