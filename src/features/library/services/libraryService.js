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
export async function getBooks({ query = "", filters = {}, page = 1, id = null }) {
  if (USE_MOCK) {
    if (id) {
      return {
        id,
        title: `Mock Book ${id}`,
        author: "Mock Author",
        cover: "/books/book1.jpg",
        available: false,
        returnDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // ✅ ISO string
        borrowCount: 3,
        category: "fiction",
        language: "English",
        waitingListCount: 2,
        averageRating: 4.2,
      };
    }

    const mockBooks = Array.from({ length: 10 }, (_, i) => ({
      id: page * 100 + i,
      title: `Book ${i + 1}`,
      author: "Unknown Author",
      cover: "/books/book1.jpg",
      available: true,
      returnDate: null,
      borrowCount: 0,
      category: filters.category ?? "fiction",
      language: filters.language ?? "English",
      waitingListCount: 0,
      averageRating: null,
    }));
    return mockBooks;
  } else {
    const response = await api.get("/books", {
      params: { query, ...filters, page, id },
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
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // ✅ ISO string
      borrowCount: 1,
      waitingListCount: 0,
      averageRating: 3.5,
    };
  } else {
    const response = await api.post(
      `/books/${bookId}/borrow`,
      {},
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return response.data;
  }
}

// --------------------
// Return Book
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
      waitingListCount: 0,
      averageRating: 3.5,
    };
  } else {
    const response = await api.post(
      `/books/${bookId}/return`,
      {},
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return response.data;
  }
}

// --------------------
// Donate Book
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
      waitingListCount: 0,
      averageRating: null,
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

// --------------------
// Get AI Description
// --------------------
export async function getAIDescription(book, prompt, access_token) {
  if (USE_MOCK) {
    return `AI description for "${book.title}" (mock): This is a fascinating book that explores themes of knowledge and imagination. Prompt: ${prompt}`;
  } else {
    const response = await api.post(
      "/books-identifier/describe",
      {
        bookId: book.id,
        prompt,
      },
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return response.data.description;
  }
}

// --------------------
// Waiting List
// --------------------
export async function joinWaitingList(bookId, access_token) {
  if (USE_MOCK) {
    return {
      id: bookId,
      waitingListCount: Math.floor(Math.random() * 5) + 1,
    };
  } else {
    const response = await api.post(
      `/books/${bookId}/waiting-list`,
      {},
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return response.data;
  }
}

// --------------------
// Rate Book
// --------------------
export async function rateBook(bookId, rating, access_token) {
  if (USE_MOCK) {
    return {
      id: bookId,
      averageRating: (Math.random() * 2 + 3).toFixed(1),
    };
  } else {
    const response = await api.post(
      `/books/${bookId}/rate`,
      { rating },
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return response.data;
  }
}
