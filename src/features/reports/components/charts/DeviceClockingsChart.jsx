import React, { useState, useMemo } from "react";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Transform backend data for Recharts
const transformData = (data, selectedMeters) => {
  const dates = [...new Set(data.map((d) => d.Date))].sort();
  const meters = selectedMeters.length
    ? selectedMeters
    : [...new Set(data.map((d) => d.MeterID))];

  return dates.map((date) => {
    const row = { Date: date };
    meters.forEach((meter) => {
      const entry = data.find((d) => d.Date === date && d.MeterID === meter);
      row[meter] = entry ? entry.Unique_Clock_Count : 0; // Fill missing dates with 0
    });
    return row;
  });
};

const DeviceClockingsChart = ({ data }) => {
  // Extract all meters
  const allMeterKeys = useMemo(
    () => [...new Set(data.map((d) => d.MeterID))],
    [data]
  );

  // Selected meters for compare mode
  const [selectedMeters, setSelectedMeters] = useState(allMeterKeys);

  // Recharts data filtered by selected meters
  const chartData = useMemo(
    () => transformData(data, selectedMeters),
    [data, selectedMeters]
  );

  // react-select options
  const meterOptions = allMeterKeys.map((m) => ({ value: m, label: m }));

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 className="text-white font-semibold mb-4 text-lg">
        Device Clockings per Meter
      </h3>

      {/* Device multi-select */}
      <div className="mb-4">
        <Select
          options={meterOptions}
          isMulti
          value={selectedMeters.map((m) => ({ value: m, label: m }))}
          onChange={(selected) => setSelectedMeters(selected.map((s) => s.value))}
          placeholder="Select meters to compare..."
          className="text-black"
        />
      </div>

      {/* Line chart */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
          <XAxis
            dataKey="Date"
            stroke="#fff"
            angle={-35}
            textAnchor="end"
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#fff" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", border: "none" }}
            labelStyle={{ color: "#fff" }}
          />
          <CartesianGrid stroke="#444" strokeDasharray="4 4" />
          {selectedMeters.map((key, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={key}
              stroke={`hsl(${(idx * 70) % 360}, 70%, 50%)`}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-lg shadow"
          onClick={() => setSelectedMeters(allMeterKeys)}
        >
          Select All
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 transition-colors text-white px-4 py-2 rounded-lg shadow"
          onClick={() => setSelectedMeters([])}
        >
          Deselect All
        </button>
      </div>
    </div>
  );
};

export default DeviceClockingsChart;
