import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Transform backend data for Recharts using MeterID as lines
const transformData = (data) => {
  const dates = [...new Set(data.map(d => d.Date))].sort(); // unique sorted dates
  const meters = [...new Set(data.map(d => d.MeterID))];    // unique meters

  return dates.map(date => {
    const row = { Date: date };
    meters.forEach(meter => {
      const entry = data.find(d => d.Date === date && d.MeterID === meter);
      row[meter] = entry ? entry.Unique_Clock_Count : 0; // Use Unique_Clock_Count column
    });
    return row;
  });
};

const DeviceClockingsChart = ({ data }) => {
  const chartData = useMemo(() => transformData(data || []), [data]);
  const meterKeys = useMemo(() => [...new Set(data.map(d => d.MeterID))], [data]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-white font-bold mb-2">Device Clockings per Meter</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="Date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <CartesianGrid stroke="#444" strokeDasharray="5 5" />
          {meterKeys.map((key, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={key}
              stroke={`hsl(${(idx * 70) % 360}, 70%, 50%)`} // unique color per meter
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviceClockingsChart;
