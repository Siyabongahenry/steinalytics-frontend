import React, { useState, useMemo } from "react";
import ReportCard from "./components/ReportCard";
import { REPORTS } from "./config/reportConfig";

const ReportListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = useMemo(() => {
    return REPORTS.filter((report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text mb-2">
        Reports
      </h1>

      <p className="text-gray-400 mb-6">
        Upload Excel or CSV files to generate reports instantly. Download results with one click.
      </p>

      {/* Search Bar */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <input
            type="text"
            aria-label="Search reports"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-gray-800 border border-gray-700 px-4 py-3 pl-11 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredReports.map((report) => {
          const Icon = report.icon;
          return (
            <ReportCard
              key={report.type}
              type={report.type}   // ✅ pass type for navigation
              title={report.title}
              description={report.description}
              icon={<Icon className="h-6 w-6" />}
            />
          );
        })}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <p className="text-gray-500 mt-8 text-sm">
          No reports found matching "{searchQuery}"
        </p>
      )}
    </div>
  );
};

export default ReportListPage;
