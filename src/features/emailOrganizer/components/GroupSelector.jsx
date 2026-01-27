import React, { useEffect, useState } from "react";
import { getGroup, exitGroup } from "../services/organizerService";
import { useAlert } from "../hooks/useAlert";

export default function GroupSelector({ onGroupSelect }) {
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [confirmExit, setConfirmExit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { show, Alert } = useAlert();

  useEffect(() => {
    async function loadGroups() {
      setLoading(true);
      try {
        const data =[] //await listGroups();
        setGroups(data);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
        show("Failed to load groups", "danger");
      } finally {
        setLoading(false);
      }
    }

    loadGroups();
  }, []);

  const handleChange = async (e) => {
    const groupId = e.target.value;
    setSelected(groupId);

    if (groupId) {
      try {
        const group = await getGroup(groupId);
        onGroupSelect(group);
      } catch (err) {
        console.error("Failed to fetch group details:", err);
        show("Failed to fetch group details", "danger");
      }
    } else {
      onGroupSelect(null);
    }
  };

  const handleExit = async () => {
    try {
      await exitGroup(selected);
      setGroups(groups.filter((g) => g.groupId !== selected));
      setSelected(null);
      onGroupSelect(null);
      show("Exited group successfully", "success");
    } catch (err) {
      console.error("Exit group failed:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to exit group. Try again later.";
      show(msg, "danger");
    } finally {
      setConfirmExit(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center gap-4">
        {loading ? (
          <div className="flex items-center text-gray-400">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Loading groups...
          </div>
        ) : (
          <>
            <select
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selected || ""}
              onChange={handleChange}
            >
              <option value="">Select a group...</option>
              {groups.map((g) => (
                <option key={g.groupId} value={g.groupId}>
                  {g.groupName}{" "}
                  {g.updatedAt
                    ? `(updated ${new Date(g.updatedAt).toLocaleDateString()})`
                    : ""}
                </option>
              ))}
            </select>

            {selected && (
              <button
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                onClick={() => setConfirmExit(true)}
              >
                Exit Group
              </button>
            )}
          </>
        )}
        <Alert />
      </div>

      {/* Exit confirmation modal */}
      {confirmExit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h5 className="text-lg font-semibold text-red-500 mb-4">
              Confirm Exit
            </h5>
            <p className="text-gray-300 mb-4">
              Are you sure you want to exit this group?
              <br />
              <strong>
                If you are the last manager, you must assign another manager
                before leaving.
              </strong>
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                onClick={() => setConfirmExit(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={handleExit}
              >
                Exit Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
