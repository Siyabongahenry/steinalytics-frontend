export default function BookDetailsModal({ book, onClose, onBorrow }) {
  if (!book) return null;

  const isAvailable = book.available;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <img
              src={book.cover}
              alt={book.title}
              className="w-40 md:w-56 rounded-lg object-cover"
            />
          </div>

          {/* Book Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-100">{book.title}</h2>
            <p className="text-gray-400">by {book.author}</p>
            <p className="mt-2 text-sm text-gray-300">
              <strong>Language:</strong> {book.language}
            </p>
            <p className="mt-1 text-sm text-gray-300">
              <strong>Category:</strong> {book.category}
            </p>
            <p className="mt-1 text-sm text-gray-300">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p className="mt-1 text-sm text-gray-300">
              <strong>Status:</strong>{" "}
              {isAvailable ? (
                <span className="text-green-400">Available</span>
              ) : (
                <span className="text-red-400">Borrowed until {book.returnDate}</span>
              )}
            </p>
            <p className="mt-1 text-sm text-gray-300">
              Borrowed {book.borrowCount} times
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          {isAvailable && (
            <button
              onClick={() => {
                onBorrow(book);   // 👈 trigger borrow modal
                onClose();        // close details modal
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
            >
              Borrow This Book
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
