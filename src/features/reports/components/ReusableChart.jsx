import React, { useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import html2canvas from "html2canvas";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"];

/**
 * ReusableChart component
 * Props:
 *  - type: "line" | "bar" | "pie"
 *  - data: array of objects for chart
 *  - xKey: string for X axis / name key
 *  - yKeys: array of strings for data keys
 *  - title: optional chart title
 */
const ReusableChart = ({ type = "line", data = [], xKey = "", yKeys = [], title = "" }) => {
  const chartRef = useRef();

  const downloadChart = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current, { backgroundColor: "#1F2937" });
    const link = document.createElement("a");
    link.download = `${title || "chart"}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const renderChart = () => {
    if (!data || !data.length || !xKey || !yKeys.length)
      return <p className="text-gray-400">No data to display</p>;

    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
              <XAxis dataKey={xKey} stroke="#D1D5DB" />
              <YAxis stroke="#D1D5DB" />
              <Tooltip />
              <Legend />
              {yKeys.map((key, idx) => (
                <Bar key={key} dataKey={key} fill={COLORS[idx % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              {yKeys.map((key) => (
                <Pie
                  key={key}
                  data={data}
                  dataKey={key}
                  nameKey={xKey}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              ))}
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case "line":
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
              <XAxis dataKey={xKey} stroke="#D1D5DB" />
              <YAxis stroke="#D1D5DB" />
              <Tooltip />
              <Legend />
              {yKeys.map((key, idx) => (
                <Line key={key} type="monotone" dataKey={key} stroke={COLORS[idx % COLORS.length]} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div ref={chartRef} className="bg-gray-800 p-6 rounded-2xl shadow-lg">
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      {renderChart()}
      <button
        onClick={downloadChart}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
      >
        Download Chart
      </button>
    </div>
  );
};

export default ReusableChart;
