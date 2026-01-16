// components/AboutChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: "2019", growth: 10 },
  { year: "2020", growth: 20 },
  { year: "2021", growth: 40 },
  { year: "2022", growth: 60 },
  { year: "2023", growth: 80 }
];

const HomeChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="growth" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HomeChart;
