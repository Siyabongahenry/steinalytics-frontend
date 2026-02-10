import { useEffect, useState } from "react";
import { getBooks } from "./services/libraryService";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books whenever query, filters, or page changes
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks({ query, filters, page });
        const booksArray = data?.books ?? [];
        setBooks((prev) => (page === 1 ? booksArray : [...prev, ...booksArray]));
        setHasMore(booksArray.length > 0);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load books. Please try again later.");
        setHasMore(false);
      }
    };
    fetchBooks();
  }, [query, filters, page]);

  // Reset page and books when search changes
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setBooks([]);
  };

  // Reset page and books when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setBooks([]);
  };

  const fetchMoreBooks = async () => {
    const nextPage = page + 1;
    try {
      const data = await getBooks({ query, filters, page: nextPage });
      const booksArray = data?.books ?? [];

      if (booksArray.length === 0) {
        setHasMore(false);
      } else {
        setBooks((prev) => [...prev, ...booksArray]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 relative">
      <h1 className="text-3xl font-bold mb-6">📚 Library</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 bg-gray-800 rounded-lg p-4 shadow">
          <FilterPanel onFilterChange={handleFilterChange} />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <SearchBar onSearch={handleSearch} />

          {error && (
            <p className="text-center text-red-400 mt-4">{error}</p>
          )}

          <InfiniteScroll
            dataLength={books.length}
            next={fetchMoreBooks}
            hasMore={hasMore}
            loader={
              <div className="flex flex-col items-center justify-center bg-gray-900 text-white">
                <Spinner />
                <p className="text-xl font-semibold animate-pulse">Loading...</p>
                <p className="text-gray-400 mt-2 text-sm text-center">
                  Please wait while we prepare the books
                </p>
              </div>
            }
            endMessage={
              <p className="text-center text-gray-500 mt-4">
                🎉 You’ve reached the end of the library!
              </p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {books.length === 0 && !hasMore ? (
                <p className="text-center text-gray-400 mt-6">
                  No books found. Try adjusting your search or filters.
                </p>
              ) : (
                books.map((book) => (
                  <BookCard key={book.id || book.isbn} book={book} />
                ))
              )}
            </div>
          </InfiniteScroll>
        </main>
      </div>

      {/* Floating Donate Button */}
      <Link
        to="/library/donate"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
        aria-label="Donate a book"
      >
        + Donate
      </Link>
    </div>
  );
}
