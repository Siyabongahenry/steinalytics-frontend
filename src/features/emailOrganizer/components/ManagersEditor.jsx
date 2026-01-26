import React, { useState, useEffect } from "react";
import { getGroup, addManager, removeManager } from "../services/organizerService";
import { useAlert } from "../hooks/useAlert";

export default function ManagersEditor({ managers, setManagers, groupId }) {
  const { show, Alert } = useAlert();
  const [newManager, setNewManager] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [confirmInput, setConfirmInput] = useState("");

  // Fetch managers when groupId changes
  useEffect(() => {
    if (!groupId) return;

    const fetchManagers = async () => {
      try {
        setLoading(true);
        const group = await getGroup(groupId);
        if (group && group.managers) {
          setManagers(group.managers);
        }
      } catch {
        show("Failed to fetch managers", "danger");
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, [groupId]);

  const handleAddManager = async () => {
    if (!newManager.trim()) return;
    try {
      if (groupId) {
        const updated = await addManager(groupId, newManager.trim());
        setManagers(updated.managers);
      } else {
        setManagers([...managers, newManager.trim()]);
      }
      show("Manager added successfully", "success");
      setNewManager("");
    } catch {
      show("Failed to add manager", "danger");
    }
  };

  const confirmRemove = async () => {
    if (!deleteCandidate || confirmInput !== deleteCandidate) return;
    try {
      if (groupId) {
        const updated = await removeManager(groupId, deleteCandidate);
        setManagers(updated.managers);
      } else {
        setManagers(managers.filter((m) => m !== deleteCandidate));
      }
      show(`Manager "${deleteCandidate}" removed`, "success");
    } catch {
      show("Failed to remove manager", "danger");
    } finally {
      setDeleteCandidate(null);
      setConfirmInput("");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md mb-6">
      {/* Collapsible Header */}
      <div
        className="flex justify-between items-center px-6 py-3 cursor-pointer border-b border-gray-700"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <h6 className="text-white font-semibold">Group Managers</h6>
          {managers && managers.length > 0 && (
            <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {managers.length}
            </span>
          )}
        </div>
        <span className="text-white">{open ? "▾" : "▸"}</span>
      </div>

      {open && (
        <div className="p-6">
          {loading ? (
            <p className="text-gray-400">Loading managers...</p>
          ) : managers.length === 0 ? (
            <p className="text-gray-400">No managers assigned yet</p>
          ) : (
            <ul className="space-y-2 mb-3">
              {managers.map((m, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-gray-700 rounded-md px-4 py-2 text-white"
                >
                  {m}
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1 rounded-md transition"
                    onClick={() => setDeleteCandidate(m)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 rounded-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              placeholder="Enter manager ID or email"
              value={newManager}
              onChange={(e) => setNewManager(e.target.value)}
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
              onClick={handleAddManager}
            >
              Add
            </button>
          </div>
          <div className="mt-4">
            <Alert />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold text-red-500">
                Confirm Manager Removal
              </h5>
              <button
                className="text-gray-400 hover:text-gray-200"
                onClick={() => {
                  setDeleteCandidate(null);
                  setConfirmInput("");
                }}
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 mb-4">
              To remove manager <strong>{deleteCandidate}</strong>, please type their ID/email below
              to confirm:
            </p>
            <input
              type="text"
              className="w-full rounded-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm mb-4"
              placeholder={`Type "${deleteCandidate}" to confirm`}
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setDeleteCandidate(null);
                  setConfirmInput("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={confirmRemove}
                disabled={confirmInput !== deleteCandidate}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
