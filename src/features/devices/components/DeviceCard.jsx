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

export default function DeviceCard({ name,status, serial_no, chartData }) {
  return (
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Device</h3>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          {status}
        </span>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-500">Name</p>
        <p className="text-base font-medium text-gray-900">{name}</p>

        <div className="h-px w-full bg-gray-100 my-3" />

        <p className="text-sm text-gray-500">Serial No</p>
        <p className="text-base font-medium text-gray-900">{serial_no}</p>
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
              className="text-sm font-semibold fill-gray-700"
            >
              Clockings count
            </text>

            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis className="text-xs fill-gray-500" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="clockings"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
