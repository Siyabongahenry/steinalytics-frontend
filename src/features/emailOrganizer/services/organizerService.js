import axios from "axios";

// In Vite, env vars are accessed via import.meta.env
const API_URL = import.meta.env.VITE_API_URL ?? "";

// =======================
// GROUPS
// =======================

// Create a new group
export const createGroup = async (data) => {
  const res = await axios.post(`${API_URL}/email-organizer/groups`, data, {
    withCredentials: true,
  });
  return res.data;
};

// Update group (name, managers, recipients, etc.)
export const updateGroup = async (groupId, data) => {
  const res = await axios.put(`${API_URL}/email-organizer/groups/${groupId}`, data, {
    withCredentials: true,
  });
  return res.data;
};

// Fetch a single group (with recipients + managers)
export const getGroup = async (groupId) => {
  const res = await axios.get(`${API_URL}/email-organizer/groups/${groupId}`, {
    withCredentials: true,
  });
  return res.data;
};

// Delete a group
export const deleteGroup = async (groupId) => {
  const res = await axios.delete(`${API_URL}/email-organizer/groups/${groupId}`, {
    withCredentials: true,
  });
  return res.data;
};

// =======================
// RECIPIENTS
// =======================

// Add recipients to group
export const addEmails = async (groupId, recipients) => {
  const res = await axios.post(
    `${API_URL}/email-organizer/groups/${groupId}/emails`,
    { emails: recipients },
    { withCredentials: true }
  );
  return res.data;
};

// Replace all recipients in group
export const replaceEmails = async (groupId, recipients) => {
  const res = await axios.put(
    `${API_URL}/email-organizer/groups/${groupId}/emails`,
    { emails: recipients },
    { withCredentials: true }
  );
  return res.data;
};

// Remove single email from group
export const removeEmail = async (groupId, email) => {
  const res = await axios.delete(
    `${API_URL}/email-organizer/groups/${groupId}/emails/${encodeURIComponent(email)}`,
    { withCredentials: true }
  );
  return res.data;
};

// =======================
// MANAGERS
// =======================

// Add manager
export const addManager = async (groupId, userId) => {
  const res = await axios.post(
    `${API_URL}/email-organizer/groups/${groupId}/managers`,
    { userId },
    { withCredentials: true }
  );
  return res.data;
};

// Remove manager
export const removeManager = async (groupId, userId) => {
  const res = await axios.delete(
    `${API_URL}/email-organizer/groups/${groupId}/managers/${userId}`,
    { withCredentials: true }
  );
  return res.data;
};

// =======================
// FILES
// =======================

// Import CSV/Excel (backend parses)
export const importFile = async (groupId, formData) => {
  const res = await axios.post(`${API_URL}/email-organizer/groups/${groupId}/import`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return res.data;
};

// Export recipients (CSV/Excel)
export const exportFile = async (groupId, format = "csv") => {
  const res = await axios.get(
    `${API_URL}/email-organizer/groups/${groupId}/export?format=${format}`,
    {
      responseType: "blob",
      withCredentials: true,
    }
  );
  return res.data; // will be a blob for download
};

// =======================
// LOGS
// =======================

// Fetch activity logs
export const getLogs = async (groupId) => {
  const res = await axios.get(`${API_URL}/email-organizer/groups/${groupId}/logs`, {
    withCredentials: true,
  });
  return res.data;
};

// List groups (only ids + names)
export const listGroups = async () => {
  const res = await axios.get(`${API_URL}/email-organizer/groups?summary=true`, {
    withCredentials: true,
  });
  return res.data; // [{ groupId, groupName }]
};

// Exit group (leave as member/manager)
export const exitGroup = async (groupId) => {
  const res = await axios.post(`${API_URL}/email-organizer/groups/${groupId}/exit`, {}, {
    withCredentials: true,
  });
  return res.data;
};
