export default function Toolbar({ handleCopyTo, handleCopyCc, handleSave, handleImport, handleExport, groupId }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-wrap gap-3">
      <button onClick={handleCopyTo} className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
        <i className="fas fa-copy mr-2"></i> Copy TO
      </button>
      <button onClick={handleCopyCc} className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
        <i className="fas fa-copy mr-2"></i> Copy CC
      </button>

      <button
        onClick={handleSave}
        className={`px-4 py-2 rounded-lg text-white ${groupId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}`}
      >
        <i className="fas fa-save mr-2"></i>
        {groupId ? "Update Group" : "Create Group"}
      </button>

      <label className="px-4 py-2 rounded-lg bg-gray-700 text-white cursor-pointer hover:bg-gray-600">
        <i className="fas fa-file-import mr-2"></i> Import
        <input type="file" accept=".csv,.xlsx" onChange={handleImport} hidden />
      </label>

      <button onClick={() => handleExport("csv")} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
        <i className="fas fa-file-csv mr-2"></i> Export CSV
      </button>
      <button onClick={() => handleExport("xlsx")} className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
        <i className="fas fa-file-excel mr-2"></i> Export Excel
      </button>
    </div>
  );
}
