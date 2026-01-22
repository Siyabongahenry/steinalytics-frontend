// src/components/charts/UserOriginatorCountChart.jsx
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/**
 * Props:
 *  - data: Array of objects [{ "User Originator": "John", incorrect_entry_count: 5 }, ...]
 */
const UserOriginatorCountChart = ({ data }) => {
  // Sort descending by count for nicer chart
  const chartData = useMemo(() => {
    return [...data].sort((a, b) => b.incorrect_entry_count - a.incorrect_entry_count);
  }, [data]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full">
      <h3 className="text-white font-bold mb-2">Incorrect Entries per User Originator</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid stroke="#444" strokeDasharray="5 5" />
          <XAxis
            dataKey="User Originator"
            stroke="#fff"
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="incorrect_entry_count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserOriginatorCountChart;
