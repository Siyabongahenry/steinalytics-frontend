import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import { getAIDescription } from "../services/libraryService";

export default function BookDetailsModal({ book, onClose, onBorrow }) {
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("Summarize this book");
  const [loading, setLoading] = useState(false);

  const isAvailable = book.available;

  const handleGenerateDescription = async () => {
    if (!prompt.trim()) {
      toast.error("Please type a request first!");
      return;
    }
    try {
      setLoading(true);
      const result = await getAIDescription(book, prompt);
      setDescription(result);
      toast.success("✨ AI description ready!");
    } catch (err) {
      console.error(err);
      toast.error("Error generating description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <img
              src={book.file_url}
              alt={book.title}
              className="w-48 md:w-64 rounded-lg object-cover shadow-lg"
            />
          </div>

          {/* Book Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-100">{book.title}</h2>
            <p className="text-gray-400 text-lg">by {book.author}</p>
            <div className="mt-4 space-y-2 text-gray-300 text-sm">
              <p><strong>Language:</strong> {book.language}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p>
                <strong>Status:</strong>{" "}
                {isAvailable ? (
                  <span className="text-green-400">Available</span>
                ) : (
                  <span className="text-red-400">Borrowed until {book.returnDate}</span>
                )}
              </p>
              <p>Borrowed {book.borrowCount} times</p>
            </div>
          </div>
        </div>

        {/* AI Description Section */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold text-gray-100 mb-3 flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-purple-400" />
            AI Description
          </h3>

          {description ? (
            <p className="text-gray-300 whitespace-pre-line">{description}</p>
          ) : (
            <p className="text-gray-500 text-sm">No description yet. Request one below.</p>
          )}

          <div className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder="e.g. 'Summarize this book'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-gray-700 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleGenerateDescription}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded transition-colors"
            >
              <SparklesIcon className="w-5 h-5" />
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          {isAvailable && (
            <button
              onClick={() => {
                onBorrow(book);
                onClose();
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded text-lg"
            >
              Borrow This Book
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded text-lg"
          >
            Close
          </button>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
