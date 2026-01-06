/* -------------------- Summary Card Component -------------------- */
export default function SummaryCard({ label, count, color, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`${color} px-4 py-4 rounded-md cursor-pointer border-2 transition
        ${active ? "border-black" : "border-transparent hover:border-gray-400"}`}
    >
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}
