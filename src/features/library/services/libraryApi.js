import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const USE_MOCK = import.meta.env.MODE === "development"; 
// 👆 or use a custom flag: import.meta.env.VITE_USE_MOCK === "true"

// --------------------
// Mock Data (Dev Only)
// --------------------
let mockBooks = [
  {
    id: 1,
    title: "Zulu Folktales",
    author: "Author A",
    cover: "/covers/zulu.jpg",
    available: true,
    returnDate: null,
    borrowCount: 5,
    language: "Zulu",
    category: "fiction",
  },
  {
    id: 2,
    title: "Afrikaans Poetry",
    author: "Author B",
    cover: "/covers/afrikaans.jpg",
    available: false,
    returnDate: "2026-02-01",
    borrowCount: 12,
    language: "Afrikaans",
    category: "nonfiction",
  },
];

// --------------------
// Real API (Prod)
// --------------------
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// --------------------
// Shared Functions
// --------------------
export async function getBooks({ query = "", filters = {}, page = 1 }) {
  if (USE_MOCK) {
    let results = mockBooks.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filters.language) {
      results = results.filter((b) => b.language === filters.language);
    }
    if (filters.category) {
      results = results.filter((b) => b.category === filters.category);
    }
    const pageSize = 3;
    const start = (page - 1) * pageSize;
    return results.slice(start, start + pageSize);
  } else {
    const response = await api.get("/books", {
      params: { search: query, language: filters.language, category: filters.category, page },
    });
    return response.data;
  }
}

export async function borrowBook(bookId) {
  if (USE_MOCK) {
    const book = mockBooks.find((b) => b.id === bookId);
    if (book && book.available) {
      book.available = false;
      book.returnDate = "2026-02-10";
      book.borrowCount += 1;
    }
    return book;
  } else {
    const response = await api.post(`/borrow/${bookId}`);
    return response.data;
  }
}

export async function donateBook(newBook) {
  if (USE_MOCK) {
    const donated = {
      id: Date.now(),
      ...newBook,
      cover: "/covers/default.jpg",
      available: true,
      returnDate: null,
      borrowCount: 0,
    };
    mockBooks.push(donated);
    return donated;
  } else {
    const response = await api.post("/donate", newBook);
    return response.data;
  }
}

export async function getMostBorrowed() {
  if (USE_MOCK) {
    return [...mockBooks]
      .sort((a, b) => b.borrowCount - a.borrowCount)
      .slice(0, 3);
  } else {
    const response = await api.get("/most-borrowed");
    return response.data;
  }
}
