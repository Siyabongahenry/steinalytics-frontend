export default function TimeInputs({ form, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="time"
        className="bg-gray-800 border border-gray-700 text-gray-100 p-2 rounded"
        value={form.startTime}
        onChange={(e) => onChange("startTime", e.target.value)}
      />
      <input
        type="time"
        className="bg-gray-800 border border-gray-700 text-gray-100 p-2 rounded"
        value={form.endTime}
        onChange={(e) => onChange("endTime", e.target.value)}
      />
    </div>
  );
}
