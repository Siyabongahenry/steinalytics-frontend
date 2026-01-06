import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadReport } from "../services/ReportServices";

const ReportUploadModal = ({ isOpen, onClose, reportType }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setDownloadUrls([]);
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx", ".xls"], "text/csv": [".csv"] },
    multiple: true,
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setError("");
    setDownloadUrls([]);

    try {
      const urls = [];
      for (let file of files) {
        const res = await uploadReport(reportType, file);
        urls.push({ name: file.name, url: res.download_url });
      }
      setDownloadUrls(urls);
    } catch (err) {
      setError(err.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="font-bold text-xl mb-4 capitalize">{reportType}</h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-4 transition ${
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
              <li key={file.name} className="text-gray-300">
                {file.name}
              </li>
            ))}
          </ul>
        )}

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full disabled:opacity-50 transition"
          onClick={handleUpload}
          disabled={loading || files.length === 0}
        >
          {loading ? "Uploading..." : "Upload & Generate Reports"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {downloadUrls.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">Download Reports</h3>
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
      </div>
    </div>
  );
};

export default ReportUploadModal;
