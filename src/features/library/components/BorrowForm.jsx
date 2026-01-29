import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { borrowBook } from "../services/libraryService";

export default function BorrowForm({ book, onClose, onBorrowSuccess }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");        // collection date
  const [returnDate, setReturnDate] = useState(""); // new return date

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await borrowBook(book.id, {
        name,
        location,
        date,
        returnDate,
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
    <div className="bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-100 mb-4 text-center">
        Borrow Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Your Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Collection Location */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Collection Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Collection Date */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Collection Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded font-semibold"
        >
          Confirm Borrow
        </button>
      </form>

      {/* Cancel */}
      <button
        onClick={onClose}
        className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded font-semibold"
      >
        Cancel
      </button>

      <Toaster position="top-right" />
    </div>
  );
}
