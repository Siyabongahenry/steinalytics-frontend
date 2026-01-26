import React from "react";
import { useAlert } from "../hooks/useAlert";
import { formatAsOutlookList } from "../utils/emailParser";

export default function FileExport({ recipients, groupName }) {
  const { show, Alert } = useAlert();

  if (!recipients.length) return null;

  const handleCopyOutlook = async () => {
    const text = formatAsOutlookList(recipients);
    try {
      await navigator.clipboard.writeText(text);
      show("Copied in Outlook format", "success");
    } catch {
      show("Failed to copy", "danger");
    }
  };

  const handleExportCSV = () => {
    const header = "Name,Surname,Email\n";
    const rows = recipients.map((r) => `${r.name},${r.surname},${r.email}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${groupName || "recipients"}.csv`);
    link.click();

    URL.revokeObjectURL(url);
    show("CSV exported", "success");
  };

  const handleExportExcel = () => {
    const header = "Name,Surname,Email\n";
    const rows = recipients.map((r) => `${r.name},${r.surname},${r.email}`).join("\n");
    const blob = new Blob([header + rows], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${groupName || "recipients"}.xls`);
    link.click();

    URL.revokeObjectURL(url);
    show("Excel exported", "success");
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h6 className="text-lg font-semibold text-white mb-4">Export Recipients</h6>

      <div className="flex flex-wrap gap-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          onClick={handleCopyOutlook}
        >
          Copy Outlook
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          onClick={handleExportCSV}
        >
          Export CSV
        </button>
        <button
          className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          onClick={handleExportExcel}
        >
          Export Excel
        </button>
      </div>

      <div className="mt-4">
        <Alert />
      </div>
    </div>
  );
}
