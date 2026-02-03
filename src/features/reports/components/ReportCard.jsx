import React from "react";
import { Link } from "react-router-dom";

const ReportCard = ({ type, title, description, icon }) => {
  return (
    <Link
      to={`/reports/${type}`}   // ✅ navigate to analyzer page
      className="bg-gray-800 hover:bg-gray-700 shadow-md rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <div className="text-4xl mb-4 text-blue-400">{icon}</div>
      <h3 className="font-bold text-lg mb-2 text-center">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </Link>
  );
};

export default ReportCard;
