// src/components/ReportUploadModal.jsx
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadReport } from "../services/ReportServices";
import ReusableChart from "./ReusableChart";
import { FaCheckCircle, FaExclamationCircle,FaInfoCircle } from "react-icons/fa"; // React Icons

const ReportUploadModal = ({ isOpen, onClose, reportType,reportTitle,reportDescription }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState("");

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

  // Sequential processing animation after upload
  const animateProcessing = (fileName) => {
    let proc = 0;
    const interval = setInterval(() => {
      proc = Math.min(proc + 3, 95); // slowly approach 95% until backend completes
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
      // Initialize progress
      setProgress(prev => ({
        ...prev,
        [file.name]: { upload: 0, processing: 0, status: "uploading", errorMsg: "" }
      }));

      const interval = animateProcessing(file.name);

      try {
        // Upload stage
        const res = await uploadReport(reportType, file, (event) => {
          if (!event.total) return;
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(prev => ({
            ...prev,
            [file.name]: { ...prev[file.name], upload: percent }
          }));
        });

        // Upload done → start processing
        clearInterval(interval); // stop any previous fake animation
        setProgress(prev => ({
          ...prev,
          [file.name]: { ...prev[file.name], upload: 100, processing: 0, status: "processing" }
        }));

        // Simulate processing animation until backend finishes
        const procInterval = setInterval(() => {
          setProgress(prev => {
            const current = prev[file.name];
            const nextProc = Math.min(current.processing + 3, 95);
            return { ...prev, [file.name]: { ...current, processing: nextProc } };
          });
        }, 100);

        // Backend response assumed processing complete now
        clearInterval(procInterval);
        setProgress(prev => ({
          ...prev,
          [file.name]: { upload: 100, processing: 100, status: "done", errorMsg: "" }
        }));

        urls.push({ name: file.name, url: res.download_url });
        if (res.chart_data) charts.push({ title: file.name, ...res.chart_data });
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
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          onClick={onClose}
        >
          ✕
        </button>

        
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

        {/* File progress */}
        {files.length > 0 && (
          <ul className="mb-4">
            {files.map((file) => {
              const prog = progress[file.name] || { upload: 0, processing: 0, status: "idle", errorMsg: "" };
              const isError = prog.status === "error";
              const isDone = prog.status === "done";

              return (
                <li key={file.name} className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-gray-200">{file.name}</p>
                    {isDone && <FaCheckCircle className="text-green-400" />}
                    {isError && <FaExclamationCircle className="text-red-500" />}
                  </div>

                  {/* Upload bar */}
                  <div className={`w-full rounded-full h-5 mb-2 overflow-hidden relative border ${isError && prog.upload < 100 ? "border-red-500" : "border-gray-700"}`}>
                    <div
                      className={`h-5 transition-all duration-300 ${isError && prog.upload < 100 ? "bg-red-500" : "bg-blue-500"}`}
                      style={{ width: `${prog.upload}%` }}
                    />
                    <span className="absolute right-2 top-0 text-xs text-white">
                      Upload {prog.upload}%
                    </span>
                    {isError && prog.upload < 100 && (
                      <span className="absolute left-2 top-0 text-xs text-white">{prog.errorMsg}</span>
                    )}
                  </div>

                  {/* Processing bar */}
                  {prog.upload === 100 && (
                    <div className={`w-full rounded-full h-5 mb-2 overflow-hidden relative border ${isError && prog.upload === 100 ? "border-red-500" : "border-gray-700"}`}>
                      <div
                        className={`h-5 transition-all duration-300 ${isError && prog.upload === 100 ? "bg-red-500" : "bg-purple-500"}`}
                        style={{ width: `${prog.processing}%` }}
                      />
                      <span className="absolute right-2 top-0 text-xs text-white">
                        Processing {prog.processing}%
                      </span>
                      {isError && prog.upload === 100 && (
                        <span className="absolute left-2 top-0 text-xs text-white">{prog.errorMsg}</span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Upload button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full mb-4 transition disabled:opacity-50"
          onClick={handleUpload}
          disabled={loading || files.length === 0}
        >
          {loading ? "Uploading..." : "Upload & Generate Reports"}
        </button>

        {/* Error summary */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Download links */}
        {downloadUrls.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-xl mb-2">Download Reports</h3>
            <ul className="space-y-1">
              {downloadUrls.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 underline hover:text-green-300 cursor-pointer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Charts */}
        {chartData.length > 0 && (
          <div className="space-y-6">
            {chartData.map((chart, idx) => (
              <ReusableChart
                key={idx}
                title={chart.title}
                type={chart.type || "line"}
                data={chart.data || []}
                xKey={chart.xKey || ""}
                yKeys={chart.yKeys || []}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportUploadModal;
