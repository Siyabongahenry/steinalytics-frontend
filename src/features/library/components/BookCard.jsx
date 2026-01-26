export default function BookCard({ book, onBorrow }) {
  const isAvailable = book.available;

  return (
    <div className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-4">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
      <p className="text-sm text-gray-400">{book.author}</p>
      <p className="text-sm mt-2">
        {isAvailable ? (
          <span className="text-green-400">Available</span>
        ) : (
          <span className="text-red-400">
            Borrowed until {book.returnDate}
          </span>
        )}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Borrowed {book.borrowCount} times
      </p>
      {isAvailable && (
        <button
          onClick={() => onBorrow(book.id)}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
        >
          Borrow
        </button>
      )}
    </div>
  );
}
