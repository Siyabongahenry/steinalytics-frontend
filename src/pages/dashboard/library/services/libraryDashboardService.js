import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export async function getBooks({ query = "", filters = {}, page = 1, id = null }) {
  const response = await api.get("/books", {
    params: { query, ...filters, page, id },
  });
  return response.data;
}
