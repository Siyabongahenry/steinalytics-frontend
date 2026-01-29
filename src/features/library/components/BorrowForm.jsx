import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { borrowBook } from "../services/libraryService";

export default function BorrowForm({ book, onClose, onBorrowSuccess }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await borrowBook(book.id, {
        name,
        location,
        date,
      });
      toast.success("Book borrowed successfully!");
      onBorrowSuccess(updated);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error borrowing book");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-100 mb-4">
        Borrow "{book.title}"
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Collection Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded"
        >
          Confirm Borrow
        </button>
      </form>
      <button
        onClick={onClose}
        className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded"
      >
        Cancel
      </button>
      <Toaster position="top-right" />
    </div>
  );
}
