export default function BookCard({ book, onBorrow }) {
  const isAvailable = book.available;

  return (
    <div className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-3 w-40">
      <div className="overflow-hidden rounded">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full aspect-[2/3] object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h3 className="text-sm font-semibold mt-2 truncate">{book.title}</h3>
      <p className="text-xs text-gray-400 truncate">{book.author}</p>

      <p className="text-xs mt-1">
        {isAvailable ? (
          <span className="text-green-400">Available</span>
        ) : (
          <span className="text-red-400">Until {book.returnDate}</span>
        )}
      </p>

      <p className="text-[10px] text-gray-500 mt-1">
        Borrowed {book.borrowCount} times
      </p>

      {isAvailable && (
        <button
          onClick={() => onBorrow(book.id)}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white text-xs py-1 rounded"
        >
          Borrow
        </button>
      )}
    </div>
  );
}
