export default function GroupInfo({ groupId, groupName, setGroupName, createdAt, lastUpdated, formatDate }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-200">Group Name:</label>
          {groupId ? (
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Existing</span>
          ) : (
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">New</span>
          )}
        </div>
        {groupId && (
          <div className="mt-2 text-gray-400 text-sm">
            {createdAt && (
              <div>
                <i className="fas fa-calendar-alt mr-1"></i>
                Created At: {formatDate(createdAt)}
              </div>
            )}
            {lastUpdated && (
              <div>
                <i className="fas fa-clock mr-1"></i>
                Last Updated: {formatDate(lastUpdated)}
              </div>
            )}
          </div>
        )}
      </div>

      <input
        type="text"
        className="px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter a group name..."
      />
    </div>
  );
}
