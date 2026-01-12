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
  const [loading, setLoading] = useState(true);

  // Load sites initially
  useEffect(() => {
    async function fetchSites() {
      try {
        const summary = await getSiteSummary({ startDate, endDate });
        const siteNames = [...new Set(summary.map((item) => item.site))];
        setSites(siteNames);
        setSelectedSites(siteNames);
      } catch (err) {
        console.error("Failed to fetch sites", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSites();
  }, [startDate, endDate]);

  // Fetch data based on selected sites and date range
  useEffect(() => {
    async function fetchData() {
      if (!selectedSites.length) return;
      setLoading(true);

      const daysDiff = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const aggregate = daysDiff > 30 ? "weekly" : "daily";

      try {
        const summary = await getSiteSummary({
          sites: selectedSites,
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          aggregate,
        });
        setData(summary);
      } catch (err) {
        console.error("Failed to fetch site data", err);
      } finally {
        setLoading(false);
      }
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

  // Quick summary totals
  const totals = metrics.map((m) => {
    const sum = data.reduce((acc, item) => acc + (item[m.key] || 0), 0);
    return { ...m, value: sum };
  });

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
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
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

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {totals.map((t) => (
          <div
            key={t.key}
            className="bg-gray-800 rounded-lg p-6 shadow-lg text-center"
          >
            <h3 className="text-lg font-semibold mb-2">{t.title}</h3>
            <p className="text-2xl font-bold text-blue-400">{t.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : !data.length ? (
        <p className="text-center text-gray-400 py-12">
          No data available for the selected filters.
        </p>
      ) : (
        <div className="space-y-10 mt-8">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <MultiLineChart
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
