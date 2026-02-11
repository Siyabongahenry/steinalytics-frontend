import { Link } from "react-router-dom";

export default function BookCard({ book }) {

  return (
   <div className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-3 text-center">
      <Link to={`/library/books/${book.id}`}>
        <div className="overflow-hidden rounded">
          <img
            src={book.file_url}
            alt={`Cover of ${book.title}`}
            className="h-56 aspect-[2/3] object-cover transform transition-transform duration-300 hover:scale-105 mx-auto"
          />
        </div>
        <h3 className="text-sm font-semibold mt-2 truncate">{book.title}</h3>
        <p className="text-xs text-gray-400 truncate">{book.author}</p>
      </Link>

      <p className="text-xs mt-1">
        {book.status == "available" ? (
          <span className="text-green-400">Available</span>
        ) : (
          <span className="text-red-400">
            Until {new Date(book.return_date).toLocaleDateString()}
          </span>
        )}
      </p>

      {book.status === "available" && (
        <Link
          to={`/library/books/${book.id}/borrow`}
          className="mt-2 inline-block bg-blue-600 hover:bg-blue-500 text-white text-xs py-1 px-3 rounded"
        >
          Borrow
        </Link>
      )}
  </div>

  );
}
