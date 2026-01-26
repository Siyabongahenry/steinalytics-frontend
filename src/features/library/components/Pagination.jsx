export default function Pagination({ currentPage, onPageChange }) {
  return (
    <div className="flex gap-2">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="px-4 py-2 bg-gray-800 text-gray-100 rounded">
        {currentPage}
      </span>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
