// src/components/ReportUploadModal/ChartsDisplay.jsx
import React from "react";
import DeviceClockingsChart from "../charts/DeviceClockingsChart";
import UserOriginatorCountChart from "../charts/UserOriginatorCountChart"
// Import other chart components here as needed

const ChartsDisplay = ({ chartData, reportType }) => {
  if (!chartData.length) return null;

  return (
    <div className="space-y-6">
      {reportType === "device-clockings" &&  <DeviceClockingsChart data={chartData} />}
      {reportType === "vip-validation" &&  <UserOriginatorCountChart title="Entries with Incorrect VIP per Originator" data={chartData} />}
      {reportType === "overbooking" &&  (<>
        {chartData.map((group, idx) => (
            <div key={idx}>
              <UserOriginatorCountChart title={group.type} data={group.records} />
            </div>
          ))}
      </>)}

      {/* Add other report types dynamically */}
      {/* {reportType === "vip-validation" && <VipValidationChart data={chartData} />} */}
    </div>
  );
};

export default ChartsDisplay;
