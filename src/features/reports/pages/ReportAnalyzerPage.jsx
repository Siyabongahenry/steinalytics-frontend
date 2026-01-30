import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { uploadReport } from "../services/ReportServices";
import { FaUpload, FaInfoCircle } from "react-icons/fa";
import FileProgressList from "../components/FileProgressList";
import DownloadButtons from "../components/DownloadButtons";
import ChartsDisplay from "../components/ChartsDisplay";
import { useAuth } from "react-oidc-context";

const ReportAnalyzerPage = ({ reportType, reportTitle, reportDescription }) => {
  const auth = useAuth();

  // State
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");

  // Reset state when files cleared
  useEffect(() => {
    if (files.length === 0) {
      setProgress({});
      setDownloadUrls([]);
      setChartData([]);
      setError("");
    }
  }, [files]);

  // Handle files dropped or selected
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
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
        ".xls",
      ],
      "text/csv": [".csv"],
    },
    multiple: true,
  });

  // Animate processing progress
  const animateProcessing = (fileName) => {
    let proc = 0;
    const interval = setInterval(() => {
      proc = Math.min(proc + 3, 95);
      setProgress((prev) => ({
        ...prev,
        [fileName]: { ...prev[fileName], processing: proc },
      }));
    }, 100);
    return interval;
  };

  // Handle upload and processing
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
      setProgress((prev) => ({
        ...prev,
        [file.name]: {
          upload: 0,
          processing: 0,
          status: "uploading",
          errorMsg: "",
        },
      }));

      const interval = animateProcessing(file.name);

      try {
        const res = await uploadReport(reportType, file, (event) => {
          if (!event.total) return;
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress((prev) => ({
            ...prev,
            [file.name]: { ...prev[file.name], upload: percent },
          }));
        }, auth.user?.access_token);

        clearInterval(interval);

        setProgress((prev) => ({
          ...prev,
          [file.name]: {
            upload: 100,
            processing: 100,
            status: "done",
            errorMsg: "",
          },
        }));

        urls.push({ name: file.name, url: res.download_url });
        if (res.data) charts.push(...res.data);
      } catch (err) {
        clearInterval(interval);
        setProgress((prev) => ({
          ...prev,
          [file.name]: {
            ...prev[file.name],
            status: "error",
            errorMsg: err.message || "Upload failed",
          },
        }));
        setError(err.message || "Upload failed");
      }
    }

    setDownloadUrls(urls);
    setChartData(charts);
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text">
        {reportTitle || "Data Analyzer"}
      </h1>
      {reportDescription && (
        <div className="flex items-center gap-2 text-gray-300 mb-6">
          <FaInfoCircle className="text-blue-400" />
          <span>{reportDescription}</span>
        </div>
      )}

      {/* Upload section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {/* Drag & drop */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl h-36 flex flex-col items-center justify-center gap-2 cursor-pointer mb-6 transition
              ${isDragActive ? "border-blue-400 bg-blue-900/30" : "border-gray-600 bg-gray-800/40"}
              hover:border-blue-500 hover:bg-gray-800/60`}
          >
            <input {...getInputProps()} />
            <p className="flex items-center gap-2 text-gray-300">
              <FaUpload />
              Drag & drop Excel/CSV or click to select
            </p>
          </div>

          {/* File progress list */}
          <div className="space-y-3 mb-6">
            <FileProgressList files={files} progress={progress} />
          </div>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={loading || files.length === 0}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg w-full mb-4 font-semibold transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload & Analyze"}
          </button>

          {/* Error message */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 rounded-lg px-4 py-2">
              {error}
            </div>
          )}
        </div>

        {/* Download links */}
        <div>
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-4">
            <DownloadButtons downloadUrls={downloadUrls} />
          </div>
        </div>
      </div>

      {/* Charts section */}
      {chartData.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            Analytics & Insights
          </h2>
          <ChartsDisplay chartData={chartData} reportType={reportType} />
        </div>
      )}
    </div>
  );
};

export default ReportAnalyzerPage;
