import React from "react";

const ReportCard = ({ title, description, icon, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className="bg-gray-800 hover:bg-gray-700 shadow-md rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
    >
      <div className="text-4xl mb-4 text-blue-400">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </div>
  );
};

export default ReportCard;
