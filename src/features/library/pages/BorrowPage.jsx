import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooks } from "../services/libraryService";
import BorrowForm from "../components/BorrowForm";

export default function BorrowPage({ onBorrowSuccess }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBooks({ id }).then((data) => setBook(data));
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Loading borrow form...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left side: Book info */}
        <div className="bg-gray-700 p-6 flex flex-col items-center justify-center">
          <img
            src={book.cover}
            alt={book.title}
            className="w-32 h-48 object-cover rounded-lg shadow-md mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-100">{book.title}</h1>
          <p className="text-gray-400">{book.author}</p>
          <p className="text-sm text-gray-300 mt-2">
            {book.available ? (
              <span className="text-green-400">Available</span>
            ) : (
              <span className="text-red-400">Borrowed until {book.returnDate}</span>
            )}
          </p>
        </div>

        {/* Right side: Borrow form */}
        <div className="p-6">
          <BorrowForm
            book={book}
            onClose={() => navigate(-1)}
            onBorrowSuccess={onBorrowSuccess}
          />
        </div>
      </div>
    </div>
  );
}
