import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FiltersPanel({
  sites,
  selectedSites,
  setSelectedSites,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleDownload,
}) {
  return (
    <div className="flex flex-col bg-gray-900 p-5 rounded-lg mb-8">
      <h3 className="text-white mb-3 text-lg font-semibold">Filters</h3>

      {/* Site checkboxes */}
      <div className="flex flex-wrap gap-4 mb-5">
        {sites.map((site) => (
          <label
            key={site}
            className="flex items-center gap-2 text-gray-300 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedSites.includes(site)}
              onChange={(e) => {
                if (e.target.checked) setSelectedSites([...selectedSites, site]);
                else setSelectedSites(selectedSites.filter((s) => s !== site));
              }}
              className="w-4 h-4 accent-blue-500"
            />
            {site}
          </label>
        ))}
      </div>

      {/* Date pickers */}
      <div className="flex flex-wrap gap-6 items-center mb-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-300">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            className="px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-700"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-300">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            className="px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-700"
          />
        </div>
      </div>

      {/* Download buttons */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => handleDownload("csv")}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
        >
          Download CSV
        </button>
        <button
          onClick={() => handleDownload("excel")}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}
