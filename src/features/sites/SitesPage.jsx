import { useEffect, useState } from "react";
import MultiLineChart from "./components/MultiLineChart";
import FiltersPanel from "./components/FiltersPanel";
import { getSiteSummary } from "./services/siteServices";
import { transformDataForMultiLineChart } from "./utils/chartUtils";

export default function SitePage() {
  const [sites, setSites] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2025-11-01"));
  const [endDate, setEndDate] = useState(new Date("2025-11-30"));

  useEffect(() => {
    async function fetchSites() {
      const summary = await getSiteSummary({ startDate, endDate });
      const siteNames = [...new Set(summary.map((item) => item.site))];
      setSites(siteNames);
      setSelectedSites(siteNames);
    }
    fetchSites();
  }, [endDate, startDate]);

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

  const metrics = [
    { key: "employees_count", title: "Total Employees on Site" },
    { key: "productive_hours", title: "Productive Hours Logged (hrs)" },
    { key: "non_productive_hours", title: "Non-Productive Hours (hrs)" },
    { key: "normal_hours", title: "Normal Working Hours (hrs)" },
    { key: "overtime_hours", title: "Overtime Hours Worked (hrs)" },
  ];

  const handleDownload = async (format) => {
    try {
      const params = new URLSearchParams({
        sites: selectedSites.join(","),
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        format,
      });

      const response = await fetch(`/api/download?${params.toString()}`, { method: "GET" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `site_data_${format}.${format === "csv" ? "csv" : "xlsx"}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download file");
    }
  };

  return (
    <div style={{ backgroundColor: "#1e1e1e", color: "#fff", minHeight: "100vh", padding: 30 }}>
      <h1 style={{ marginBottom: 20 }}>Site Dashboard</h1>

      <FiltersPanel
        sites={sites}
        selectedSites={selectedSites}
        setSelectedSites={setSelectedSites}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleDownload={handleDownload}
      />

      {metrics.map((metric) => (
        <MultiLineChart
          key={metric.key}
          metric={metric.key}
          title={`${metric.title} (${startDate.toISOString().split("T")[0]} to ${endDate
            .toISOString()
            .split("T")[0]})`}
          data={transformDataForMultiLineChart(data, metric.key, selectedSites)}
        />
      ))}
    </div>
  );
}
