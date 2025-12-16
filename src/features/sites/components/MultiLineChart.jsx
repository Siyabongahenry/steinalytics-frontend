import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MultiLineChart({ data, title }) {
  if (!data || data.length === 0) return null;

  const dateCount = data.length;

  // Format X-axis labels dynamically
  const tickFormatter = (tick) => {
    const date = new Date(tick);
    if (dateCount > 30) return `${date.getDate()}/${date.getMonth() + 1}`; // weekly
    return `${date.getDate()}/${date.getMonth() + 1}`; // daily
  };

  // Prepare Line components for each site
  const lines = Object.keys(data[0])
    .filter((key) => key !== "date")
    .map((site, idx) => (
      <Line
        key={site}
        type="monotone"
        dataKey={site}
        stroke={getColor(idx)}
        strokeWidth={2}
        dot={false}
      />
    ));

  return (
    <div className="mb-10">
      {/* Professional centered chart title */}
      <h3 className="text-white text-xl font-semibold mb-4 text-center">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#ccc", fontSize: 12 }}
            tickFormatter={tickFormatter}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fill: "#ccc", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#2a2a2a", border: "none", color: "#fff" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ color: "#fff" }}
          />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Function to assign different colors to each line
function getColor(idx) {
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
    "#888888",
    "#ff6699",
    "#66ccff",
  ];
  return colors[idx % colors.length];
}
