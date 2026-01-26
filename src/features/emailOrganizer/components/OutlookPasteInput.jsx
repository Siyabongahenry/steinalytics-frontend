import React, { useState, useRef, useEffect } from "react";
import { parseOutlookBlock, dedupeByEmail, normalizeEmail } from "../utils/emailParser";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function OutlookPasteInput({ recipients, setRecipients }) {
  const [toValue, setToValue] = useState("");
  const [ccValue, setCcValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState(null);

  const toRef = useRef(null);
  const ccRef = useRef(null);

  useEffect(() => {
    if (toRef.current) {
      toRef.current.style.height = "auto";
      toRef.current.style.height = toRef.current.scrollHeight + "px";
    }
    if (ccRef.current) {
      ccRef.current.style.height = "auto";
      ccRef.current.style.height = ccRef.current.scrollHeight + "px";
    }
  }, [toValue, ccValue]);

  const updateRecipients = (list) => {
    const deduped = dedupeByEmail(list);
    setRecipients(deduped);
  };

  const handlePaste = (e, type) => {
    const text = e.clipboardData.getData("text");
    const parsed = parseOutlookBlock(text)
      .filter((c) => c.email && isValidEmail(c.email))
      .map((c) => ({ ...c, type }));

    if (parsed.length > 0) {
      e.preventDefault();
      updateRecipients([...recipients, ...parsed]);
      if (type === "to") setToValue("");
      else setCcValue("");
    }
  };

  const handleKeyDown = (e, type, valueSetter, value) => {
    if (["Enter", "Tab", ",", ";"].includes(e.key)) {
      e.preventDefault();
      const email = normalizeEmail(value);
      if (email && isValidEmail(email)) {
        const newRecipient = { name: "", surname: "", email, type };
        updateRecipients([...recipients, newRecipient]);
        valueSetter("");
        setError(null);
      } else if (email) {
        setError(`Invalid email: ${email}`);
      }
    }
  };

  const removeChip = (email) => {
    updateRecipients(recipients.filter((c) => c.email !== email));
  };

  const startEdit = (idx, email) => {
    setEditingIndex(idx);
    setEditValue(email);
    setError(null);
  };

  const saveEdit = () => {
    const email = normalizeEmail(editValue);
    if (!email || !isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }
    const updated = [...recipients];
    updated[editingIndex] = { ...updated[editingIndex], email };
    updateRecipients(updated);
    setEditingIndex(null);
    setEditValue("");
    setError(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
    setError(null);
  };

  const handleClear = () => {
    setRecipients([]);
    setToValue("");
    setCcValue("");
    setError(null);
  };

  // Helper: render chips filtered by type
  const renderChips = (type) =>
    recipients
      .map((c, idx) => ({ ...c, idx }))
      .filter((c) => c.type === type)
      .map((c) =>
        editingIndex === c.idx ? (
          <input
            key={c.idx}
            type="text"
            value={editValue}
            autoFocus
            className={`px-3 py-1 rounded-full text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 ${
              error ? "ring-red-500" : "ring-indigo-500"
            }`}
            style={{ width: "220px" }}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
          />
        ) : (
          <span
            key={c.idx}
            className={`flex items-center px-3 py-1 rounded-full text-sm cursor-pointer ${
              type === "cc"
                ? "bg-gray-200 text-gray-800"
                : "bg-green-600 text-white"
            }`}
            onClick={() => startEdit(c.idx, c.email)}
          >
            {c.name
              ? `${c.name} ${c.surname ? c.surname : ""} <${c.email}>`
              : c.email}
            <button
              type="button"
              className="ml-2 text-xs text-red-500 hover:text-red-700"
              aria-label="Remove"
              onClick={(e) => {
                e.stopPropagation();
                removeChip(c.email);
              }}
            >
              ✕
            </button>
          </span>
        )
      );

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-white">Recipients</label>
        {recipients.length > 0 && (
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1 rounded-md transition"
            onClick={handleClear}
          >
            Clear All
          </button>
        )}
      </div>

      {/* TO Section */}
      <label className="text-xs font-semibold text-gray-300">To:</label>
      <textarea
        ref={toRef}
        className="w-full rounded-md px-3 py-2 bg-gray-700 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        rows={2}
        value={toValue}
        onChange={(e) => setToValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, "to", setToValue, toValue)}
        onPaste={(e) => handlePaste(e, "to")}
        placeholder="Type or paste TO emails here..."
      />
      {recipients.some((r) => r.type === "to") && (
        <div ref={toChipsRef} className="flex flex-wrap gap-2 mt-2">
          {renderChips("to")}
        </div>
      )}

      {/* CC Section */}
      <label className="text-xs font-semibold text-gray-300 mt-3">CC:</label>
      <textarea
        ref={ccRef}
        className="w-full rounded-md px-3 py-2 bg-gray-700 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        rows={2}
        value={ccValue}
        onChange={(e) => setCcValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, "cc", setCcValue, ccValue)}
        onPaste={(e) => handlePaste(e, "cc")}
        placeholder="Type or paste CC emails here..."
      />
      {recipients.some((r) => r.type === "cc") && (
        <div ref={ccChipsRef} className="flex flex-wrap gap-2 mt-2">
          {renderChips("cc")}
        </div>
      )}

      {error && <div className="text-red-500 text-xs mt-2">{error}</div>}

      <div className="flex justify-between mt-3">
        <small className="text-gray-400">
          Paste from Outlook “To/CC” or type manually
        </small>
        {recipients.length > 0 && (
          <small className="text-gray-400">{recipients.length} total recipients</small>
        )}
      </div>
    </div>
  );
}
