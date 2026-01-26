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
    <div className="card email-card mb-4">
      <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h5 className="mb-0">Recipients Table</h5>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-success btn-sm btn-rounded" onClick={addRow}>
            + Add Recipient
          </button>
          {selected.length > 0 && (
            <button className="btn btn-danger btn-sm btn-rounded" onClick={bulkRemove}>
              Remove Selected ({selected.length})
            </button>
          )}
          <input
            type="text"
            className="form-control form-control-sm rounded-pill"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: "200px" }}
          />
        </div>
      </div>

      <div className="card-body p-0">
        <table className="table table-hover align-middle email-table mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: "5%" }}>
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th style={{ width: "20%" }}>First Name</th>
              <th style={{ width: "20%" }}>Last Name</th>
              <th style={{ width: "30%" }}>Email Address</th>
              <th style={{ width: "15%" }}>Type</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="text-muted text-center">
                  No recipients found
                </td>
              </tr>
            )}
            {filtered.map((r, i) =>
              editIndex === i ? (
                <tr key={i}>
                  <td></td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      placeholder="Enter first name"
                      value={editRow.name}
                      onChange={(e) => setEditRow({ ...editRow, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      placeholder="Enter surname"
                      value={editRow.surname}
                      onChange={(e) =>
                        setEditRow({ ...editRow, surname: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      placeholder="Enter email address"
                      value={editRow.email}
                      onChange={(e) =>
                        setEditRow({ ...editRow, email: normalizeEmail(e.target.value) })
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={editRow.type || "to"}
                      onChange={(e) => setEditRow({ ...editRow, type: e.target.value })}
                    >
                      <option value="to">TO</option>
                      <option value="cc">CC</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm btn-rounded me-2" onClick={saveEdit}>
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm btn-rounded"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={i}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(r.email)}
                      onChange={() => toggleSelect(r.email)}
                    />
                  </td>
                  <td>{r.name}</td>
                  <td>{r.surname}</td>
                  <td>{r.email}</td>
                  <td>
                    <span className={`badge ${r.type === "cc" ? "bg-secondary" : "bg-success"}`}>
                      {r.type?.toUpperCase() || "TO"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm btn-rounded me-2"
                      onClick={() => startEdit(i)}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm btn-rounded"
                      onClick={() => setDeleteCandidate(r)}
                    >
                      <i className="fas fa-trash"></i>
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
        <div className="modal fade show email-modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title text-danger">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteCandidate(null)}></button>
              </div>
              <div className="modal-body">
                Remove <strong>{deleteCandidate.email}</strong> from this group?
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary btn-rounded" onClick={() => setDeleteCandidate(null)}>
                  Cancel
                </button>
                <button className="btn btn-danger btn-rounded" onClick={confirmRemove}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Alert />
    </div>
  );
}