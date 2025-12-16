import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts";

export default function EmployeesCountChart({ data }) {
  if (!data || data.length === 0) return <p>Loading...</p>;

  const siteKeys = Object.keys(data[0]).filter(key => key !== "date");

  const getColor = (index) => {
    const colors = [
      "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d0ed57",
      "#a4de6c", "#888888", "#ffbb28", "#0088FE", "#00C49F"
    ];
    return colors[index % colors.length];
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Total Employees on Site</h2>
      <div style={{ width: "95%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <XAxis 
              dataKey="date" 
              type="category" 
              interval={0} 
              angle={-45} 
              textAnchor="end"
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            {siteKeys.map((site, index) => (
              <Line
                key={site}
                type="monotone"
                dataKey={site}
                stroke={getColor(index)}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        {/* Custom Legend */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          flexWrap: "wrap", 
          marginTop: 10, 
          width: "100%" 
        }}>
          {siteKeys.map((site, index) => (
            <div key={site} style={{ display: "flex", alignItems: "center", margin: "5px 15px" }}>
              <div style={{ 
                width: 12, 
                height: 12, 
                backgroundColor: getColor(index), 
                marginRight: 5 
              }} />
              <span>{site}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
