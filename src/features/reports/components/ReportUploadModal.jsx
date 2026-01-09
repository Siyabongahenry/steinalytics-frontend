// src/components/ReportUploadModal.jsx
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadReport } from "../services/ReportServices";
import ReusableChart from "./ReusableChart";

const ReportUploadModal = ({ isOpen, onClose, reportType }) => {
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

  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setError("");
    setDownloadUrls([]);
    setChartData([]);
    setProgress({});

    try {
      const urls = [];
      const charts = [];

      for (let file of files) {
        const res = await uploadReport(reportType, file, (event) => {
          setProgress((prev) => ({
            ...prev,
            [file.name]: Math.round((event.loaded / event.total) * 100),
          }));
        });

        urls.push({ name: file.name, url: res.download_url });

        if (res.chart_data) {
          charts.push({ title: file.name, ...res.chart_data });
        }
      }

      setDownloadUrls(urls);
      setChartData(charts);
    } catch (err) {
      setError(err.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
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

        <h2 className="font-bold text-3xl mb-6 capitalize">{reportType}</h2>

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

        {files.length > 0 && (
          <ul className="mb-4 max-h-32 overflow-y-auto">
            {files.map((file) => (
              <li key={file.name} className="text-gray-300 mb-1">
                {file.name}{" "}
                {progress[file.name] ? (
                  <span className="text-green-400">({progress[file.name]}%)</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full mb-4 transition disabled:opacity-50"
          onClick={handleUpload}
          disabled={loading || files.length === 0}
        >
          {loading ? "Uploading..." : "Upload & Generate Reports"}
        </button>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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
                    className="text-green-400 underline hover:text-green-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

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
