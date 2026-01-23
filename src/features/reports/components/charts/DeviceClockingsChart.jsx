import React, { useState, useMemo } from "react";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

const transformData = (data, selectedMeters) => {
  const dates = [...new Set(data.map((d) => d.Date))].sort();
  const meters = selectedMeters.length
    ? selectedMeters
    : [...new Set(data.map((d) => d.MeterID))];

  return dates.map((date) => {
    const row = { Date: date };
    meters.forEach((meter) => {
      const entry = data.find((d) => d.Date === date && d.MeterID === meter);
      row[meter] = entry ? entry.Unique_Clock_Count : 0;
    });
    return row;
  });
};

const DeviceClockingsChart = ({ data }) => {
  const allMeterKeys = useMemo(
    () => [...new Set(data.map((d) => d.MeterID))],
    [data]
  );

  const [selectedMeters, setSelectedMeters] = useState(allMeterKeys);

  const chartData = useMemo(
    () => transformData(data, selectedMeters),
    [data, selectedMeters]
  );

  const meterOptions = allMeterKeys.map((m) => ({ value: m, label: m }));

  // Custom legend click handler
  const handleLegendClick = (o) => {
    const { dataKey } = o;
    if (selectedMeters.includes(dataKey)) {
      setSelectedMeters(selectedMeters.filter((m) => m !== dataKey));
    } else {
      setSelectedMeters([...selectedMeters, dataKey]);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 className="text-white font-semibold mb-4 text-lg">
        Device Clockings per Meter
      </h3>

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

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
          <XAxis
            dataKey="Date"
            stroke="#fff"
            angle={-35}
            textAnchor="end"
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#fff" tick={{ fontSize: 12 }} />
          <CartesianGrid stroke="#444" strokeDasharray="4 4" />

          {/* Threshold line */}
          <ReferenceLine
            y={150}
            stroke="red"
            strokeDasharray="6 6"
            label={{ value: "Threshold (150)", position: "top", fill: "red" }}
          />

          {/* Interactive legend */}
          <Legend
            wrapperStyle={{ color: "#fff" }}
            verticalAlign="bottom"
            height={36}
            onClick={handleLegendClick}
          />

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
