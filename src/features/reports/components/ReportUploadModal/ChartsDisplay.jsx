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
      {reportType === "vip-validation" &&  <UserOriginatorCountChart data={chartData} />}
      {reportType === "overbooking" &&  (<>
        <div>
          <UserOriginatorCountChart data={chartData.duplicate_originator_count} />
        </div>
        <div>
          <UserOriginatorCountChart data={chartData.overbooking_originator_count} />
        </div>
      
      </>)}

      {/* Add other report types dynamically */}
      {/* {reportType === "vip-validation" && <VipValidationChart data={chartData} />} */}
    </div>
  );
};

export default ChartsDisplay;
