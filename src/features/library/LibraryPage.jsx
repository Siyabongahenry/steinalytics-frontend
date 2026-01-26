import { useEffect, useState } from "react";
import { getBooks, borrowBook, donateBook, getMostBorrowed } from "./services/libraryApi";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import Pagination from "./components/Pagination";
import DonationForm from "./components/DonationForm";

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [mostBorrowed, setMostBorrowed] = useState([]);

  useEffect(() => {
    getBooks({ query, filters, page }).then(setBooks);
    getMostBorrowed().then(setMostBorrowed);
  }, [query, filters, page]);

  const handleBorrow = async (bookId) => {
    const updated = await borrowBook(bookId);
    setBooks((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
    getMostBorrowed().then(setMostBorrowed);
  };

  const handleDonate = async (newBook) => {
    const donated = await donateBook(newBook);
    setBooks((prev) => [...prev, donated]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Library</h1>

      {/* Most Borrowed Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">⭐ Most Borrowed Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostBorrowed.map((book) => (
            <BookCard key={book.id} book={book} onBorrow={handleBorrow} />
          ))}
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 bg-gray-800 rounded-lg p-4 shadow">
          <FilterPanel onFilterChange={setFilters} />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <SearchBar onSearch={setQuery} />

          {/* Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onBorrow={handleBorrow} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination currentPage={page} onPageChange={setPage} />
          </div>

          {/* Donation Form */}
          <div className="mt-10">
            <DonationForm onDonate={handleDonate} />
          </div>
        </main>
      </div>
    </div>
  );
}
