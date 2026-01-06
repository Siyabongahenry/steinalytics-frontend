import { useState } from "react";
import FiltersPanel from "./FiltersPanel";

export default function CollapsibleFilters(props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-gray-800 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible Panel */}
      <div
        className={`mt-3 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <FiltersPanel {...props} />
      </div>
    </div>
  );
}
