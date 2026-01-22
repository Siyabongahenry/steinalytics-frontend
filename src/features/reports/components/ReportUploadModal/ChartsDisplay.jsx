// src/components/ReportUploadModal/ChartsDisplay.jsx
import React from "react";
import DeviceClockingsChart from "../charts/DeviceClockingsChart";
// Import other chart components here as needed

const ChartsDisplay = ({ chartData, reportType }) => {
  if (!chartData.length) return null;

  return (
    <div className="space-y-6">
      {reportType === "device-clockings" &&  <DeviceClockingsChart data={chartData} />}

      {/* Add other report types dynamically */}
      {/* {reportType === "vip-validation" && <VipValidationChart data={chartData} />} */}
    </div>
  );
};

export default ChartsDisplay;
