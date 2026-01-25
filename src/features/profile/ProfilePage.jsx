// src/pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import { getUserReports, deleteUserReport } from "../services/UserReportsService";
import { useOidc } from "@axa-fr/react-oidc-context";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { FaTrash } from "react-icons/fa";

export default function ProfilePage() {
  const { oidcUser } = useOidc();
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getUserReports();
      setReports(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    setDeleting(reportId);
    try {
      await deleteUserReport(reportId);
      setReports(reports.filter(r => r.id !== reportId));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {oidcUser?.profile?.name || "User"}</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-md overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Report Name</th>
                <th className="text-left px-4 py-2">Link</th>
                <th className="text-left px-4 py-2">Expires In</th>
                <th className="text-center px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    No reports found
                  </td>
                </tr>
              ) : (
                filteredReports.map(report => (
                  <tr key={report.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="px-4 py-2">{report.name}</td>
                    <td className="px-4 py-2">
                      <a href={report.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                        View
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      {formatDistanceToNowStrict(parseISO(report.expires_at), { addSuffix: true })}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(report.id)}
                        disabled={deleting === report.id}
                        className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition"
                      >
                        <FaTrash className="mr-2" /> {deleting === report.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
