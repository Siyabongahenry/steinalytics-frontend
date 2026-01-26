export default function GroupForm({ groupName, setGroupName }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <label className="block text-sm font-semibold text-white mb-2">
        Group Name (Subject)
      </label>
      <input
        type="text"
        className="w-full rounded-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="e.g. Monthly Clocking Reports"
      />
    </div>
  );
}
