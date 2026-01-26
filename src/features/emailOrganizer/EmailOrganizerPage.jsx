import React, { useState } from "react";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import GroupInfo from "./components/GroupInfo";
import GroupSelector from "./components/GroupSelector";
import OutlookPasteInput from "./components/OutlookPasteInput";
import RecipientsTable from "./components/RecipientsTable";
import ManagersEditor from "./components/ManagersEditor";
import LogsViewer from "./components/LogsViewer";
import { exportFile, importFile, createGroup, updateGroup } from "./services/organizerService";
import { useAlert } from "./hooks/useAlert";
import { formatAsOutlookList } from "./utils/emailParser";

export default function EmailOrganizerPage() {
  const { show, Alert } = useAlert();

  const [recipients, setRecipients] = useState([]);
  const [managers, setManagers] = useState([]);
  const [groupName, setGroupName] = useState("New Group");
  const [groupId, setGroupId] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString)
      .toLocaleString("en-US", options)
      .replace(",", " ·");
  };

  // Save group (create or update)
  const handleSave = async () => {
    if (!groupName.trim()) {
      show("Please enter a group name", "danger");
      return;
    }

    try {
      let group;
      if (groupId) {
        group = await updateGroup(groupId, {
          groupName,
          recipients,
          managers,
        });
        show("Group updated successfully", "success");
      } else {
        group = await createGroup({
          groupName,
          recipients,
          managers,
        });
        show("Group created successfully", "success");
      }

      setGroupId(group.groupId);
      setCreatedAt(group.createdAt || createdAt || new Date().toISOString());
      setLastUpdated(group.updatedAt || new Date().toISOString());
    } catch {
      show("Failed to save group", "danger");
    }
  };

  // Import CSV/Excel
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imported = await importFile(groupId, file);
      setRecipients(imported);
      show(`Imported ${imported.length} recipients`, "success");
    } catch {
      show("Failed to import file", "danger");
    }
  };

  // Export CSV/Excel
  const handleExport = async (type) => {
    try {
      await exportFile(groupId, type);
      show(`Exported recipients as ${type.toUpperCase()}`, "success");
    } catch {
      show("Failed to export file", "danger");
    }
  };

  // Copy TO
  const handleCopyTo = () => {
    const toList = recipients.filter((r) => r.type !== "cc");
    if (toList.length === 0) {
      show("No TO recipients to copy", "warning");
      return;
    }
    navigator.clipboard.writeText(formatAsOutlookList(toList));
    show("Copied TO recipients", "success");
  };

  // Copy CC
  const handleCopyCc = () => {
    const ccList = recipients.filter((r) => r.type === "cc");
    if (ccList.length === 0) {
      show("No CC recipients to copy", "warning");
      return;
    }
    navigator.clipboard.writeText(formatAsOutlookList(ccList));
    show("Copied CC recipients", "success");
  };

  // Counts
  const toCount = recipients.filter((r) => r.type !== "cc").length;
  const ccCount = recipients.filter((r) => r.type === "cc").length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <Header toCount={toCount} ccCount={ccCount} recipients={recipients} />

      {/* Toolbar */}
      <Toolbar
        handleCopyTo={handleCopyTo}
        handleCopyCc={handleCopyCc}
        handleSave={handleSave}
        handleImport={handleImport}
        handleExport={handleExport}
        groupId={groupId}
      />

      {/* Group Selector */}
      <GroupSelector
        onGroupSelect={(group) => {
          if (group) {
            setGroupId(group.groupId);
            setGroupName(group.groupName);
            setRecipients(group.recipients || []);
            setManagers(group.managers || []);
            setCreatedAt(group.createdAt || null);
            setLastUpdated(group.updatedAt || null);
          } else {
            setGroupId(null);
            setGroupName("New Group");
            setRecipients([]);
            setManagers([]);
            setCreatedAt(null);
            setLastUpdated(null);
          }
        }}
      />

      {/* Group Info */}
      <GroupInfo
        groupId={groupId}
        groupName={groupName}
        setGroupName={setGroupName}
        createdAt={createdAt}
        lastUpdated={lastUpdated}
        formatDate={formatDate}
      />

      {/* Recipients Input & Table */}
      <OutlookPasteInput recipients={recipients} setRecipients={setRecipients} />
      <RecipientsTable recipients={recipients} setRecipients={setRecipients} />

      {/* Managers */}
      <ManagersEditor managers={managers} setManagers={setManagers} groupId={groupId} />

      {/* Logs */}
      <LogsViewer groupId={groupId} />

      <Alert />
    </div>
  );
}
