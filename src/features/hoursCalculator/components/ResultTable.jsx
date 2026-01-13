export default function ResultTable({ bookings }) {
  return (
    <table className="w-full border border-gray-700 text-gray-200">
      <thead className="bg-gray-800">
        <tr>
          <th className="p-2">Code</th>
          <th className="p-2">Hours</th>
          <th className="p-2">Reason</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b, i) => (
          <tr key={i} className="border-t border-gray-700">
            <td className="p-2">{b.code}</td>
            <td className="p-2">{b.hours.toFixed(2)}</td>
            <td className="p-2 text-gray-400">{b.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
