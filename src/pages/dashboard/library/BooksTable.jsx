import { useEffect, useState } from "react";

/**
 * Replace with real API calls later
 */
const mockBooks = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    language: "EN",
    status: "available",
    file_url: "https://cdn.example.com/clean-code.pdf",
    borrowed_at: null,
    return_date: null,
  },
  {
    id: "2",
    title: "Design Patterns",
    author: "GoF",
    category: "Software",
    language: "EN",
    status: "borrowed",
    file_url: "https://cdn.example.com/design-patterns.pdf",
    borrowed_at: "2026-02-01",
    return_date: "2026-02-10",
  },
];

export default function BookTable() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate fetch
    setTimeout(() => {
      setBooks(mockBooks);
      setLoading(false);
    }, 600);
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || book.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const borrowBook = (id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "borrowed",
              borrowed_at: new Date().toISOString(),
              return_date: null,
            }
          : b
      )
    );
  };

  const returnBook = (id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "available",
              borrowed_at: null,
              return_date: null,
            }
          : b
      )
    );
  };

  const deleteBook = (id) => {
    if (!confirm("Delete this book?")) return;
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border text-center text-gray-500">
        Loading books...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {/* Controls */}
      <div className="p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="border rounded-lg px-3 py-2 w-full md:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2 w-full md:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Language</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No books found
                </td>
              </tr>
            )}

            {filteredBooks.map((book) => (
              <tr
                key={book.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">
                  {book.title}
                </td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">{book.category}</td>
                <td className="px-4 py-3">{book.language}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={book.status} />
                </td>
                <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                  <a
                    href={book.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </a>

                  {book.status === "available" ? (
                    <button
                      onClick={() => borrowBook(book.id)}
                      className="text-green-600 hover:underline"
                    >
                      Borrow
                    </button>
                  ) : (
                    <button
                      onClick={() => returnBook(book.id)}
                      className="text-yellow-600 hover:underline"
                    >
                      Return
                    </button>
                  )}

                  <button
                    onClick={() => deleteBook(book.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    available: "bg-green-100 text-green-700",
    borrowed: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
}
