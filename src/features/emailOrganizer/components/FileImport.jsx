import React, { useRef } from "react";
import { importFile } from "../services/organizerService";
import { useAlert } from "../hooks/useAlert";

export default function FileImport({ setRecipients, groupId }) {
  const { show, Alert } = useAlert();
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const imported = await importFile(groupId, formData);

      setRecipients((prev) => {
        const emails = new Map();
        [...prev, ...imported].forEach((r) => {
          if (r.email) emails.set(r.email.toLowerCase(), r);
        });
        return Array.from(emails.values());
      });

      show("File imported successfully!", "success");
    } catch {
      show("Failed to import file", "danger");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h6 className="text-lg font-semibold text-white mb-4">Import Recipients</h6>

      <div className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv,.xlsx"
          className="hidden"
          id="fileUpload"
          onChange={handleFileChange}
        />

        <label
          htmlFor="fileUpload"
          className="cursor-pointer w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          📂 Choose File
        </label>

        <small className="text-gray-400">Supports CSV or Excel (.xlsx)</small>
      </div>

      <div className="mt-4">
        <Alert />
      </div>
    </div>
  );
}
