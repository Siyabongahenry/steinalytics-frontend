import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from "recharts";

/* ===============================
   Custom tooltip (portal-based)
================================ */
const CustomTooltip = ({ active, payload, label, coordinate }) => {
  if (!active || !payload?.length) return null;

  // Position tooltip to the left of the cursor
  const style = {
    position: "absolute",
    left: coordinate.x - 160, // shift left (adjust as needed)
    top: coordinate.y - 40,   // slightly above cursor
    pointerEvents: "none",
    zIndex: 9999,
  };

  return (
    <div
      style={style}
      className="bg-gray-900/95 border border-gray-700 rounded-lg px-4 py-3 shadow-xl max-h-40 overflow-y-auto"
    >
      <p className="text-gray-300 text-xs mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((p) => (
          <div
            key={p.dataKey}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span style={{ color: p.stroke }}>{p.dataKey}</span>
            <span className="text-white font-medium">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


/* ===============================
   Main component
================================ */
const DeviceClockingsChart = ({ data }) => {
  const allMeterKeys = useMemo(
    () => [...new Set(data.map((d) => d.MeterID))],
    [data]
  );

  const [selectedMeters, setSelectedMeters] = useState(allMeterKeys);
  const [showThreshold, setShowThreshold] = useState(true);

  // Filter by value
  const [valueFilter, setValueFilter] = useState({ operator: ">", value: 0 });

  // Determine meters that pass the filter
  const filteredMeters = useMemo(() => {
    return allMeterKeys.filter((meter) => {
      const meterData = data.filter((d) => d.MeterID === meter);
      if (valueFilter.operator === ">") {
        return meterData.some((d) => d.Unique_Clock_Count > valueFilter.value);
      } else {
        return meterData.some((d) => d.Unique_Clock_Count < valueFilter.value);
      }
    });
  }, [allMeterKeys, data, valueFilter]);

  // Keep only selected meters that are also passing the filter
  const metersToShow = useMemo(() => {
    return selectedMeters.filter((m) => filteredMeters.includes(m));
  }, [selectedMeters, filteredMeters]);

  // Transform data for the chart
  const chartData = useMemo(() => {
    const map = {};
    data.forEach(({ Date, MeterID, Unique_Clock_Count }) => {
      if (!metersToShow.includes(MeterID)) return; // skip filtered meters
      if (!map[Date]) map[Date] = { Date };
      map[Date][MeterID] = Unique_Clock_Count;
    });
    return Object.values(map).sort((a, b) => a.Date.localeCompare(b.Date));
  }, [data, metersToShow]);

  const meterOptions = allMeterKeys.map((m) => ({
    value: m,
    label: m,
  }));

  const showDots = metersToShow.length <= 20;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-white font-semibold text-lg">
          Device Clockings per Meter
        </h3>

        {/* Threshold toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-sm text-gray-300">Show threshold (150)</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={showThreshold}
              onChange={() => setShowThreshold((v) => !v)}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition ${
                showThreshold ? "bg-red-500" : "bg-gray-600"
              }`}
            />
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                showThreshold ? "translate-x-5" : ""
              }`}
            />
          </div>
        </label>
      </div>

      {/* Meter selector */}
      <div className="mb-4">
        <Select
          options={meterOptions}
          isMulti
          closeMenuOnSelect={false}
          value={selectedMeters.map((m) => ({ value: m, label: m }))}
          onChange={(selected) =>
            setSelectedMeters(selected.map((s) => s.value))
          }
          placeholder="Select meters to display…"
          className="text-black"
        />
      </div>

      {/* Value Filter */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <select
          className="bg-gray-800 text-white px-3 py-2 rounded-lg"
          value={valueFilter.operator}
          onChange={(e) =>
            setValueFilter((prev) => ({ ...prev, operator: e.target.value }))
          }
        >
          <option value=">">Greater than</option>
          <option value="<">Less than</option>
        </select>
        <input
          type="number"
          className="bg-gray-800 text-white px-3 py-2 rounded-lg w-24"
          value={valueFilter.value}
          onChange={(e) =>
            setValueFilter((prev) => ({
              ...prev,
              value: Number(e.target.value),
            }))
          }
        />
        <span className="text-gray-400 text-sm">
          Showing meters with values {valueFilter.operator} {valueFilter.value}
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={360}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 50 }}
        >
          <CartesianGrid stroke="#333" strokeDasharray="4 4" />
          <XAxis
            dataKey="Date"
            stroke="#aaa"
            angle={-35}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 11 }}
          />
          <YAxis stroke="#aaa" tick={{ fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ pointerEvents: "auto" }} />

          {showThreshold && (
            <ReferenceLine
              y={150}
              stroke="#ef4444"
              strokeDasharray="6 6"
              ifOverflow="extendDomain"
              label={{
                value: "Threshold (150)",
                position: "right",
                fill: "#ef4444",
                fontSize: 12,
                fontWeight: 600,
              }}
            />
          )}

          {metersToShow.map((key, idx) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={`hsl(${(idx * 47) % 360}, 65%, 55%)`}
              strokeWidth={1.5}
              dot={showDots}
              opacity={metersToShow.length > 30 ? 0.55 : 0.9}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Footer */}
      <div className="mt-6 flex gap-3 flex-wrap items-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
          onClick={() => setSelectedMeters(allMeterKeys)}
        >
          Select All
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 transition text-white px-4 py-2 rounded-lg"
          onClick={() => setSelectedMeters([])}
        >
          Clear
        </button>
        <span className="text-gray-400 text-sm">
          Showing {metersToShow.length} / {allMeterKeys.length} meters
        </span>
      </div>
    </div>
  );
};

export default DeviceClockingsChart;
