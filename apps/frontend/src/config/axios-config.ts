import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BE_PORT ?? 3000}`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const basic = localStorage.getItem("basic");
  if (basic) {
    config.headers.Authorization = `Basic ${basic}`;
  }
  return config;
});
