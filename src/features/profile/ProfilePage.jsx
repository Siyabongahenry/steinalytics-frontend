import { useEffect, useState, useMemo } from "react";
import { getUserReports, deleteUserReport } from "./services/UserReportService";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { FaTrash, FaDownload, FaChartBar } from "react-icons/fa";
import Toast from "../../components/Toast";

export default function ProfilePage() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  // Selected reports for comparison
  const [selectedReports, setSelectedReports] = useState([]);

  const showToast = (message, type = "error") => setToast({ message, type });

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const data = await getUserReports();
        setReports(data);
      } catch (err) {
        showToast(err.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    setDeletingId(reportId);
    try {
      await deleteUserReport(reportId);
      setReports((prev) => prev.filter((r) => r.id !== reportId));
      showToast("Report deleted successfully!", "success");
    } catch (err) {
      showToast(err.message || "Failed to delete report");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReports = useMemo(
    () =>
      reports.filter((report) =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [reports, searchTerm]
  );

  const toggleSelectReport = (reportId) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleCompare = () => {
    if (selectedReports.length < 2) {
      showToast("Select at least 2 reports to compare", "error");
      return;
    }
    // Implement your comparison logic here
    console.log("Compare reports:", selectedReports);
    showToast("Comparison feature not implemented yet", "success");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative">
      <h1 className="text-3xl font-bold mb-6">My Reports</h1>

      {/* Search */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {selectedReports.length > 1 && (
          <button
            onClick={handleCompare}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition"
          >
            Compare {selectedReports.length} reports
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-md overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Download</th>
                <th className="text-left px-4 py-2">Insights</th>
                <th className="text-left px-4 py-2">Expires In</th>
                <th className="text-center px-4 py-2">Actions</th>
                <th className="text-center px-4 py-2">Compare</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-400">
                    No reports found
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2">{report.name}</td>
                    <td className="px-4 py-2">{report.type || "Unknown"}</td>

                    <td className="px-4 py-2">
                      <a
                        href={report.link}
                        download
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md transition"
                      >
                        <FaDownload /> Download
                      </a>
                    </td>

                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          showToast("Insights feature not implemented yet", "success")
                        }
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md transition"
                      >
                        <FaChartBar /> View
                      </button>
                    </td>

                    <td className="px-4 py-2">
                      {formatDistanceToNowStrict(parseISO(report.expires_at), {
                        addSuffix: true,
                      })}
                    </td>

                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(report.id)}
                        disabled={deletingId === report.id}
                        className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 disabled:opacity-60 px-3 py-1 rounded-md transition"
                      >
                        <FaTrash className="mr-2" />
                        {deletingId === report.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>

                    <td className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report.id)}
                        onChange={() => toggleSelectReport(report.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
