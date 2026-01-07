import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DeviceCard({ name, status, serial_no, chartData }) {
  return (
    <div className="max-w-sm rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-100">Device</h3>

        <span className="inline-flex items-center rounded-full bg-blue-900/40 px-2.5 py-1 text-xs font-medium text-blue-400">
          {status}
        </span>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-400">Name</p>
        <p className="text-base font-medium text-gray-100">{name}</p>

        <div className="my-3 h-px w-full bg-gray-700" />

        <p className="text-sm text-gray-400">Serial No</p>
        <p className="text-base font-medium text-gray-100">{serial_no}</p>
      </div>

      {/* Graph */}
      <div className="mt-6 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 30, right: 20, left: 0, bottom: 30 }}
          >
            {/* Chart Title */}
            <text
              x="50%"
              y="20"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-200 text-sm font-semibold"
            >
              Clockings count
            </text>

            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
            />

            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                color: "#e5e7eb",
              }}
              labelStyle={{ color: "#9ca3af" }}
            />

            <Line
              type="monotone"
              dataKey="clockings"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
