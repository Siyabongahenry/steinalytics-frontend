export default function ShiftSelector({ value, onChange }) {
  return (
    <select
      className="bg-gray-800 border border-gray-700 text-gray-100 p-2 rounded"
      value={value}
      onChange={(e) => onChange("shiftType", e.target.value)}
    >
      <option value="DAY">Day Shift</option>
      <option value="NIGHT">Night Shift</option>
    </select>
  );
}
