import React from "react";

export default function ConfirmDeleteModal({ 
  isOpen, 
  item, 
  onCancel, 
  onConfirm 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 px-4 py-2">
          <h5 className="text-red-500 font-semibold">Confirm Deletion</h5>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-200"
            onClick={onCancel}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-3 text-gray-200">
          {item ? (
            <>Remove <strong>{item}</strong> from this group?</>
          ) : (
            "Are you sure you want to delete this item?"
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-700 px-4 py-2">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
