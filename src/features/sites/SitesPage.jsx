import { useEffect, useState } from "react";
import MultiLineChart from "./components/MultiLineChart";
import CollapsibleFilters from "./components/CollapsibleFilters";
import { getSiteSummary } from "./services/siteServices";
import { transformDataForMultiLineChart } from "./utils/chartUtils";

export default function SitePage() {
  const [sites, setSites] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2025-11-01"));
  const [endDate, setEndDate] = useState(new Date("2025-11-30"));

  // Fetch site names
  useEffect(() => {
    async function fetchSites() {
      const summary = await getSiteSummary({ startDate, endDate });
      const siteNames = [...new Set(summary.map((item) => item.site))];
      setSites(siteNames);
      setSelectedSites(siteNames);
    }
    fetchSites();
  }, [startDate, endDate]);

  // Fetch data based on selected sites and date range
  useEffect(() => {
    async function fetchData() {
      if (!selectedSites.length) return;

      const daysDiff = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const aggregate = daysDiff > 30 ? "weekly" : "daily";

      const summary = await getSiteSummary({
        sites: selectedSites,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        aggregate,
      });

      setData(summary);
    }

    fetchData();
  }, [selectedSites, startDate, endDate]);

  // Metrics to show
  const metrics = [
    { key: "employees_count", title: "Total Employees on Site" },
    { key: "productive_hours", title: "Productive Hours Logged (hrs)" },
    { key: "non_productive_hours", title: "Non-Productive Hours (hrs)" },
    { key: "normal_hours", title: "Normal Working Hours (hrs)" },
    { key: "overtime_hours", title: "Overtime Hours Worked (hrs)" },
  ];

  // Download handler
  const handleDownload = async (format) => {
    try {
      const params = new URLSearchParams({
        sites: selectedSites.join(","),
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        format,
      });

      const response = await fetch(`/api/download?${params.toString()}`);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `site_data.${format === "csv" ? "csv" : "xlsx"}`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download file");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Dashboard Title */}
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
          Site Statistics
        </h1>
        <p className="text-gray-400 mt-1">
          Overview of employees, hours, and productivity for selected sites
        </p>
      </div>

      {/* Collapsible Filters Panel */}
      <CollapsibleFilters
        sites={sites}
        selectedSites={selectedSites}
        setSelectedSites={setSelectedSites}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleDownload={handleDownload}
      />

      {/* Charts */}
      <div className="space-y-10 mt-8">
        {metrics.map((metric) => (
          <MultiLineChart
            key={metric.key}
            metric={metric.key}
            title={`${metric.title} (${startDate
              .toISOString()
              .split("T")[0]} to ${endDate.toISOString().split("T")[0]})`}
            data={transformDataForMultiLineChart(
              data,
              metric.key,
              selectedSites
            )}
            theme="bg-gray-800"
          />
        ))}
      </div>
    </div>
  );
}
