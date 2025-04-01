import axios from "axios";

export const api = axios.create({
  baseURL: `https://localhost:${import.meta.env.VITE_BE_PORT ?? 3000}`,
});
