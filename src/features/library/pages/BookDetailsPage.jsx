import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBook, getAIDescription, joinWaitingList, rateBook } from "../services/libraryService";
import {
  SparklesIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getBook(id).then((data) => setBook(data));
  }, [id]);

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

  const handleJoinWaitingList = async () => {
    try {
      await joinWaitingList(book.id);
      toast.success("Added to waiting list!");
      const updated = await getBook(id);
      setBook(updated);
    } catch (err) {
      console.error(err);
      toast.error("Error joining waiting list");
    }
  };

  const handleRateBook = async (value) => {
    try {
      setRating(value);
      await rateBook(book.id, value);
      toast.success(`You rated this book ${value} stars!`);
      const updated = await getBook(id);
      setBook(updated);
    } catch (err) {
      console.error(err);
      toast.error("Error rating book");
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Navigation */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>
          <Link
            to="/library"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <BookOpenIcon className="w-5 h-5" />
            Back to Library
          </Link>
        </div>

        {/* Book Info */}
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={book.file_url}
            alt={book.title}
            className="w-48 h-72 object-cover rounded-lg shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-gray-400 mb-4">by {book.author}</p>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Language: {book.language}</li>
              <li>Category: {book.category}</li>
              <li>ISBN: {book.isbn}</li>
              <li>
                Status:{" "}
                {book.available ? (
                  <span className="text-green-400">Available</span>
                ) : (
                  <span className="flex items-center gap-2 text-red-400">
                    <ClockIcon className="w-4 h-4" />
                    {`Borrowed until ${new Date(book.returnDate).toLocaleDateString()}`}
                  </span>
                )}
              </li>
              <li>Borrowed {book.borrowCount} times</li>
              <li className="flex items-center gap-2">
                <UserGroupIcon className="w-4 h-4 text-blue-400" />
                Waiting list: {book.waitingListCount || 0} people
              </li>
            </ul>

            {/* Borrow / Waiting List */}
            {book.available ? (
              <Link
                to={`/library/books/${book.id}/borrow`}
                className="mt-6 inline-block bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
              >
                Borrow This Book
              </Link>
            ) : (
              <button
                onClick={handleJoinWaitingList}
                className="mt-6 inline-block bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
              >
                Join Waiting List
              </button>
            )}

            {/* Rating Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Rate this Book</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRateBook(value)}
                    className={`p-2 rounded-full ${
                      rating >= value ? "bg-yellow-400 text-black" : "bg-gray-700 text-gray-300"
                    } hover:bg-yellow-500 transition-colors`}
                  >
                    <StarIcon className="w-6 h-6" />
                  </button>
                ))}
              </div>
              {book.averageRating && (
                <p className="text-sm text-gray-400 mt-2">
                  Average rating: {book.averageRating.toFixed(1)} / 5
                </p>
              )}
            </div>
          </div>
        </div>

        {/* AI Description */}
        <div className="mt-10 border-t border-gray-700 pt-6">
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
              className="flex-1 bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleGenerateDescription}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
            >
              <SparklesIcon className="w-5 h-5" />
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
