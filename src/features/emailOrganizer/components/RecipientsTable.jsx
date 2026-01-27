import React, { useState } from "react";
import { normalizeEmail, dedupeByEmail } from "../utils/emailParser";
import { useAlert } from "../hooks/useAlert";

export default function RecipientsTable({ recipients, setRecipients }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [search, setSearch] = useState("");
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [selected, setSelected] = useState([]);

  const { show, Alert } = useAlert();

  const toggleSelect = (email) => {
    setSelected((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((r) => r.email));
    }
  };

  const bulkRemove = () => {
    setRecipients(recipients.filter((r) => !selected.includes(r.email)));
    show(`Removed ${selected.length} recipients`, "success");
    setSelected([]);
  };

  const filtered = recipients.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.surname.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (i) => {
    setEditIndex(i);
    setEditRow({ ...recipients[i] });
  };

  const saveEdit = () => {
    const newRecs = [...recipients];
    newRecs[editIndex] = editRow;
    setRecipients(dedupeByEmail(newRecs));
    setEditIndex(null);
    show(`Updated ${editRow.email}`, "success");
  };

  const addRow = () => {
    const newRow = { name: "", surname: "", email: "", type: "to" };
    setRecipients([newRow, ...recipients]);
    setEditIndex(0);
    setEditRow(newRow);
  };

  const confirmRemove = () => {
    if (!deleteCandidate) return;
    const email = deleteCandidate.email;
    setRecipients(recipients.filter((r) => r.email !== email));
    setDeleteCandidate(null);
    show(`${email} was removed from this group`, "success");
  };

  return (
    <div className="bg-gray-800 text-gray-100 rounded-lg shadow-md p-4">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h5 className="text-lg font-semibold">Recipients Table</h5>
        <div className="flex flex-wrap gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm" onClick={addRow}>
            + Add Recipient
          </button>
          {selected.length > 0 && (
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm" onClick={bulkRemove}>
              Remove Selected ({selected.length})
            </button>
          )}
          <input
            type="text"
            className="bg-gray-700 text-gray-200 border border-gray-600 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: "200px" }}
          />
        </div>
      </div>

      <div className="p-0">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-2 w-[5%]">
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-2 w-[20%]">First Name</th>
              <th className="p-2 w-[20%]">Last Name</th>
              <th className="p-2 w-[30%]">Email Address</th>
              <th className="p-2 w-[15%]">Type</th>
              <th className="p-2 w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No recipients found
                </td>
              </tr>
            )}
            {filtered.map((r, i) =>
              editIndex === i ? (
                <tr key={i} className="bg-gray-800">
                  <td></td>
                  <td>
                    <input
                      className="bg-gray-700 text-gray-200 px-2 py-1 rounded w-full"
                      placeholder="Enter first name"
                      value={editRow.name}
                      onChange={(e) => setEditRow({ ...editRow, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className="bg-gray-700 text-gray-200 px-2 py-1 rounded w-full"
                      placeholder="Enter surname"
                      value={editRow.surname}
                      onChange={(e) => setEditRow({ ...editRow, surname: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className="bg-gray-700 text-gray-200 px-2 py-1 rounded w-full"
                      placeholder="Enter email address"
                      value={editRow.email}
                      onChange={(e) =>
                        setEditRow({ ...editRow, email: normalizeEmail(e.target.value) })
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="bg-gray-700 text-gray-200 px-2 py-1 rounded w-full"
                      value={editRow.type || "to"}
                      onChange={(e) => setEditRow({ ...editRow, type: e.target.value })}
                    >
                      <option value="to">TO</option>
                      <option value="cc">CC</option>
                    </select>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={i} className="hover:bg-gray-800">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(r.email)}
                      onChange={() => toggleSelect(r.email)}
                    />
                  </td>
                  <td className="p-2">{r.name}</td>
                  <td className="p-2">{r.surname}</td>
                  <td className="p-2">{r.email}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        r.type === "cc"
                          ? "bg-gray-600 text-gray-100"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {r.type?.toUpperCase() || "TO"}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 rounded text-xs"
                      onClick={() => startEdit(i)}
                    >
                      ✏️
                    </button>
                    <button
                      className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 rounded text-xs"
                      onClick={() => setDeleteCandidate(r)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>


      <div className="card-footer text-muted small d-flex justify-content-between">
        <span>Total recipients: <strong>{recipients.length}</strong></span>
        {selected.length > 0 && (
          <span>Selected: <strong>{selected.length}</strong></span>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-700 px-4 py-2">
              <h5 className="text-red-500 font-semibold">Confirm Deletion</h5>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-200"
                onClick={() => setDeleteCandidate(null)}
              >
                ✕
              </button>
            </div>
            <div className="px-4 py-3 text-gray-200">
              Remove <strong>{deleteCandidate.email}</strong> from this group?
            </div>
            <div className="flex justify-end gap-2 border-t border-gray-700 px-4 py-2">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
                onClick={() => setDeleteCandidate(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                onClick={confirmRemove}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


      <Alert />
    </div>
  );
}