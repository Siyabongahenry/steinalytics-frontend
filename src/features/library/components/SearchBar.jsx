export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search books..."
      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
