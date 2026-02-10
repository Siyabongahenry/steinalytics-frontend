import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// --------------------
// Get Books (with query, filters, pagination)
// --------------------
export async function getBooks({ query = "", filters = {}, page = 1, id = null }) {
  const response = await api.get("/books", {
    params: { query, ...filters, page, id },
  });
  return response.data;
}

// --------------------
// Get Book with id
// --------------------
export async function getBook(bookId) {
    try {
      const response = await api.get(`/books/${bookId}`);
      return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API error:", error.response.data);
    }
    throw error;
}

}
// --------------------
// Borrow Book
// --------------------
export async function borrowBook(bookId, access_token) {
  const response = await api.post(
    `/books/${bookId}/borrow`,
    {},
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
  return response.data;
}

// --------------------
// Return Book
// --------------------
export async function returnBook(bookId, access_token) {
  const response = await api.post(
    `/books/${bookId}/return`,
    {},
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
  return response.data;
}

// --------------------
// Donate Book
// --------------------
export async function donateBook(newBook, access_token) {
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
export async function getAIDescription(book, prompt) {
  const response = await api.post(
    "/books-identifier/describe",
    {
      bookId: book.id,
      prompt,
    }
  );
  return response.data.description;
}

// --------------------
// Waiting List
// --------------------
export async function joinWaitingList(bookId, access_token) {
  const response = await api.post(
    `/books/${bookId}/waiting-list`,
    {},
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
  return response.data;
}

// --------------------
// Rate Book
// --------------------
export async function rateBook(bookId, rating, access_token) {
  const response = await api.post(
    `/books/${bookId}/rate`,
    { rating },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
  return response.data;
}
