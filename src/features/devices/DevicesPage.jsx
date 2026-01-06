import React, { useEffect, useState } from "react";
import DeviceCard from "./components/DeviceCard";
import { getDevices } from "./services/services";

export default function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDevices() {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (error) {
        console.error("Failed to load devices:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDevices();
  }, []);

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    const lastA = a.chartData[a.chartData.length - 1]?.clockings || 0;
    const lastB = b.chartData[b.chartData.length - 1]?.clockings || 0;
    return sortOrder === "asc" ? lastA - lastB : lastB - lastA;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Device clockings count
      </h1>

      {/* Search + Sort Controls */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by device name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Sort by clockings (High → Low)</option>
          <option value="asc">Sort by clockings (Low → High)</option>
        </select>
      </div>

      {/* Device Cards */}
      {loading ? (
        <p>Loading devices...</p>
      ) : sortedDevices.length === 0 ? (
        <p>No devices found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDevices.map((device) => (
            <DeviceCard
              key={device.serial_no}
              name={device.name}
              status={device.status}
              serial_no={device.serial_no}
              chartData={device.chartData}
            />
          ))}
        </div>
      )}
    </div>
  );
}
