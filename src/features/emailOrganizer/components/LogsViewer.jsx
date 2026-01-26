import React, { useState, useEffect } from "react";
import { getLogs } from "../services/organizerService";
import { useAlert } from "../hooks/useAlert";

export default function LogsViewer({ groupId }) {
  const { show, Alert } = useAlert();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  // Group logs into Today, Yesterday, This Week, Older
  const groupLogsByDate = (logs) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - 7);

    const groups = {
      Today: [],
      Yesterday: [],
      "This Week": [],
      Older: [],
    };

    logs.forEach((log) => {
      const logDate = new Date(log.timestamp);
      const logDay = logDate.toDateString();
      if (logDay === today.toDateString()) {
        groups.Today.push(log);
      } else if (logDay === yesterday.toDateString()) {
        groups.Yesterday.push(log);
      } else if (logDate >= startOfWeek) {
        groups["This Week"].push(log);
      } else {
        groups.Older.push(log);
      }
    });

    return groups;
  };

  // Fetch logs from backend
  useEffect(() => {
    if (!groupId) return;

    const fetchLogs = async () => {
      try {
        setLoading(true);
        const data = await getLogs(groupId);
        setLogs(data || []);
      } catch {
        show("Failed to load activity logs", "danger");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [groupId]);

  const grouped = groupLogsByDate(logs);

  // Decide which groups to display based on filter
  const visibleGroups =
    filter === "All" ? grouped : { [filter]: grouped[filter] || [] };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md mb-6">
      {/* Collapsible Header */}
      <div
        className="flex justify-between items-center px-6 py-3 cursor-pointer border-b border-gray-700"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <h6 className="text-white font-semibold">Activity Logs</h6>
          {logs && logs.length > 0 && (
            <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {logs.length}
            </span>
          )}
        </div>
        <span className="text-white">{open ? "▾" : "▸"}</span>
      </div>

      {open && (
        <div className="p-6">
          {/* Filter Dropdown */}
          <div className="flex justify-end mb-3">
            <select
              className="bg-gray-700 text-white text-sm rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{ maxWidth: "200px" }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="This Week">This Week</option>
              <option value="Older">Older</option>
            </select>
          </div>

          {loading ? (
            <p className="text-gray-400">Loading logs...</p>
          ) : logs.length === 0 ? (
            <p className="text-gray-400">No activity yet</p>
          ) : (
            Object.entries(visibleGroups).map(([section, items]) =>
              items.length > 0 ? (
                <div key={section} className="mb-4">
                  {filter === "All" && (
                    <h6 className="text-gray-300 font-semibold mb-2">{section}</h6>
                  )}
                  <ul className="space-y-2">
                    {items.map((log, idx) => (
                      <li
                        key={idx}
                        className="bg-gray-700 rounded-md p-3 text-sm text-white"
                      >
                        <div>
                          <strong>{log.action}</strong>
                        </div>
                        <div className="text-gray-400">
                          by {log.userId || "Unknown"} on{" "}
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )
          )}
          <Alert />
        </div>
      )}
    </div>
  );
}
