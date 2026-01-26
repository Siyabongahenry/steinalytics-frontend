import { useState } from "react";

export default function DonationForm({ onDonate }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDonate({ title, author, language, category });
    setTitle("");
    setAuthor("");
    setLanguage("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-100">Donate a Book</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        required
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Language</option>
        <option value="Zulu">Zulu</option>
        <option value="Xhosa">Xhosa</option>
        <option value="Afrikaans">Afrikaans</option>
        <option value="Sesotho">Sesotho</option>
        <option value="Tswana">Tswana</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Category</option>
        <option value="fiction">Fiction</option>
        <option value="nonfiction">Non-fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="history">History</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded transition-colors"
      >
        Donate Book
      </button>
    </form>
  );
}
