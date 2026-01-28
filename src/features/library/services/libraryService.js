import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const USE_MOCK = import.meta.env.MODE === "development";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

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
      formData.append("file", newBook.file); // 👈 use "file"
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
  formData.append("file", file); // 👈 use "file"

  const response = await api.post("/books-identifier/identify", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};
