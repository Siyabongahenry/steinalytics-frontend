import { useState } from "react";
import FiltersPanel from "./FiltersPanel";

export default function CollapsibleFilters(props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full 
                   bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:from-blue-500 hover:to-purple-500 
                   text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        <span className="font-medium">Filters</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible Panel */}
      <div
        className={`mt-3 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <FiltersPanel {...props} />
        </div>
      </div>
    </div>
  );
}
