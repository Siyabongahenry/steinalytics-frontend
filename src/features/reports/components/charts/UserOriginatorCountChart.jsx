// src/components/charts/UserOriginatorCountChart.jsx
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
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
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full">
      <h3 className="text-white font-semibold mb-4 text-lg">
        Incorrect Entries per User Originator
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 60 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="4 4" />
          <XAxis
            dataKey="User Originator"
            stroke="#fff"
            angle={-30}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#fff" tick={{ fontSize: 12 }} />
          <Bar
            dataKey="incorrect_entry_count"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
            barSize={30}
          >
            {/* Show numbers on top of bars */}
            <LabelList
              dataKey="incorrect_entry_count"
              position="top"
              style={{ fill: "#fff", fontSize: 12, fontWeight: "bold" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserOriginatorCountChart;
