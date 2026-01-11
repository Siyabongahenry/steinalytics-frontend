import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const sampleTrendData = [
  { day: "Mon", value: 30 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 28 },
  { day: "Thu", value: 50 },
  { day: "Fri", value: 38 },
];

const sampleAttendanceData = [
  { site: "Station A", employees: 120 },
  { site: "Station B", employees: 95 },
  { site: "Station C", employees: 140 },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gray-900 px-8 py-12 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Welcome to Steinalytics
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Your transparent workspace for live insights, trend detection, and reporting.
            Use the side menu to navigate between sections.
          </p>
        </div>

        {/* Navigation Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="/site"
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:bg-gray-700 transition text-white text-center"
          >
            <div className="text-blue-500 text-3xl mb-2">🏢</div>
            <h3 className="font-semibold">Site Statistics</h3>
            <p className="text-gray-400 text-sm mt-1">View employee attendance & site performance</p>
          </a>

          <a
            href="/devices"
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:bg-gray-700 transition text-white text-center"
          >
            <div className="text-blue-500 text-3xl mb-2">🕒</div>
            <h3 className="font-semibold">Clocking Machines</h3>
            <p className="text-gray-400 text-sm mt-1">Track devices and user activity</p>
          </a>

          <a
            href="/reports"
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:bg-gray-700 transition text-white text-center"
          >
            <div className="text-blue-500 text-3xl mb-2">📄</div>
            <h3 className="font-semibold">Reports</h3>
            <p className="text-gray-400 text-sm mt-1">Select templates, upload Excel, generate reports</p>
          </a>
        </div>

        {/* Live Data Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Analysis */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Trend Analysis</h3>
            <p className="text-gray-400 text-sm mb-4">
              Monitor trends in employee attendance over the week.
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleTrendData}>
                  <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderRadius: 4 }} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Site Attendance */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Site Attendance</h3>
            <p className="text-gray-400 text-sm mb-4">
              See the number of employees at each power station.
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleAttendanceData}>
                  <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                  <XAxis dataKey="site" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderRadius: 4 }} />
                  <Bar dataKey="employees" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <p className="mt-12 text-sm text-gray-500 text-center">
          Use the side menu to navigate: Site Statistics, Clocking Machines, and Reports.
        </p>
      </div>
    </div>
  );
}
