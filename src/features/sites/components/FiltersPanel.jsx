// components/FiltersPanel.js
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2a2a2a",
        padding: 20,
        borderRadius: 8,
        marginBottom: 30,
      }}
    >
      <h3 style={{ color: "#fff", marginBottom: 10 }}>Filters</h3>

      {/* Site checkboxes */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 15, marginBottom: 20 }}>
        {sites.map((site) => (
          <label
            key={site}
            style={{ color: "#ccc", display: "flex", alignItems: "center", gap: 5 }}
          >
            <input
              type="checkbox"
              checked={selectedSites.includes(site)}
              onChange={(e) => {
                if (e.target.checked) setSelectedSites([...selectedSites, site]);
                else setSelectedSites(selectedSites.filter((s) => s !== site));
              }}
              style={{ width: 16, height: 16 }}
            />
            {site}
          </label>
        ))}
      </div>

      {/* Date pickers */}
      <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 10 }}>
        <div>
          <label style={{ marginRight: 10, color: "#ccc" }}>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
          />
        </div>
        <div>
          <label style={{ marginRight: 10, color: "#ccc" }}>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
          />
        </div>
      </div>

      {/* Download buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button
          onClick={() => handleDownload("csv")}
          style={{
            backgroundColor: "#444",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Download CSV
        </button>
        <button
          onClick={() => handleDownload("excel")}
          style={{
            backgroundColor: "#444",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}
