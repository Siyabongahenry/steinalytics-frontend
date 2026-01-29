import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const USE_MOCK = import.meta.env.MODE === "development";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// --------------------
// Get Books (with query, filters, pagination)
// --------------------
export async function getBooks({ query = "", filters = {}, page = 1 }) {
  if (USE_MOCK) {
    // Mock some books
    const mockBooks = Array.from({ length: 10 }, (_, i) => ({
      id: page * 100 + i,
      title: `Mock Book ${i + 1}`,
      author: "Unknown Author",
      cover: "/covers/default.jpg",
      available: true,
      returnDate: null,
      borrowCount: 0,
      category: filters.category ?? "fiction",
      language: filters.language ?? "English",
    }));
    return mockBooks;
  } else {
    const response = await api.get("/books", {
      params: { query, ...filters, page },
    });
    return response.data;
  }
}

// --------------------
// Borrow Book
// --------------------
export async function borrowBook(bookId, access_token) {
  if (USE_MOCK) {
    return {
      id: bookId,
      title: `Mock Book ${bookId}`,
      author: "Unknown Author",
      cover: "/covers/default.jpg",
      available: false,
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week later
      borrowCount: 1,
    };
  } else {
    const response = await api.post(
      `/books/${bookId}/borrow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  }
}

// --------------------
// Return Book (optional)
// --------------------
export async function returnBook(bookId, access_token) {
  if (USE_MOCK) {
    return {
      id: bookId,
      title: `Mock Book ${bookId}`,
      author: "Unknown Author",
      cover: "/covers/default.jpg",
      available: true,
      returnDate: null,
      borrowCount: 1,
    };
  } else {
    const response = await api.post(
      `/books/${bookId}/return`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  }
}

// --------------------
// Donate Book (with file)
// --------------------
export async function donateBook(newBook, access_token) {
  if (USE_MOCK) {
    const donated = {
      id: Date.now(),
      ...newBook,
      cover: "/covers/default.jpg",
      available: true,
      returnDate: null,
      borrowCount: 0,
    };
    return donated;
  } else {
    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("author", newBook.author);
    formData.append("language", newBook.language);
    formData.append("category", newBook.category);
    formData.append("isbn", newBook.isbn);

    if (newBook.file) {
      formData.append("file", newBook.file);
    }

    const response = await api.post("/books/donate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  }
}

// --------------------
// Identify Book (AI)
// --------------------
export const uploadFile = async (file, access_token) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/books-identifier/identify", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};
