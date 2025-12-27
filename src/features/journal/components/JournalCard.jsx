import React from "react";

const JournalCard = ({ title, description, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 hover:bg-gray-700 shadow-md rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </div>
  );
};

export default JournalCard;
