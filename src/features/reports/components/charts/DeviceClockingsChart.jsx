import React, { useState, useMemo } from "react";
import Select from "react-select";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Transform backend data for Recharts
const transformData = (data, selectedMeters) => {
  const dates = [...new Set(data.map(d => d.Date))].sort();
  const meters = selectedMeters.length ? selectedMeters : [...new Set(data.map(d => d.MeterID))];

  return dates.map(date => {
    const row = { Date: date };
    meters.forEach(meter => {
      const entry = data.find(d => d.Date === date && d.MeterID === meter);
      row[meter] = entry ? entry.Unique_Clock_Count : 0; // Fill missing dates with 0
    });
    return row;
  });
};

const DeviceClockingsChart = ({ data }) => {
  // Extract all meters
  const allMeterKeys = useMemo(() => [...new Set(data.map(d => d.MeterID))], [data]);

  // Selected meters for compare mode
  const [selectedMeters, setSelectedMeters] = useState(allMeterKeys);

  // Recharts data filtered by selected meters
  const chartData = useMemo(() => transformData(data, selectedMeters), [data, selectedMeters]);

  // react-select options
  const meterOptions = allMeterKeys.map(m => ({ value: m, label: m }));

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-white font-bold mb-2">Device Clockings per Meter</h3>

      {/* Device multi-select */}
      <div className="mb-4">
        <Select
          options={meterOptions}
          isMulti
          value={selectedMeters.map(m => ({ value: m, label: m }))}
          onChange={selected => setSelectedMeters(selected.map(s => s.value))}
          placeholder="Select meters to compare..."
          className="text-black"
        />
      </div>

      {/* Line chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="Date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <CartesianGrid stroke="#444" strokeDasharray="5 5" />
          {selectedMeters.map((key, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={key}
              stroke={`hsl(${(idx * 70) % 360}, 70%, 50%)`}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Buttons */}
      <div className="mt-2 flex gap-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
          onClick={() => setSelectedMeters(allMeterKeys)}
        >
          Select All
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => setSelectedMeters([])}
        >
          Deselect All
        </button>
      </div>
    </div>
  );
};

export default DeviceClockingsChart;
