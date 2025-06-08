import { api } from "../config/axios-config";

export function booksService(endpoint: string) {
  const addBook = async (formData: FormData) => {
    const response = await api.post(`${endpoint}book`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  };

  const deleteBook = async (bookID: number) => {
    const response = await api.delete(`${endpoint}book/${bookID}`);
    return response.data;
  };

  const updateBook = async (bookID: number, newValue: FormData) => {
    const response = await api.put(`${endpoint}book/${bookID}`, newValue, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  };

  const getBook = async (bookID: number) => {
    const response = await api.get(`${endpoint}book/${bookID}`);
    return response.data;
  };

  const getBooks = async () => {
    const response = await api.get(`${endpoint}books`);
    return response.data;
  };

  const getBooksPaginated = async (page: number, offset = 20) => {
    const response = await api.get(`${endpoint}books/paginated`, {
      params: { page, offset },
    });
    return response.data;
  };

  const incrementViews = async (bookID: number) => {
    const response = await api.post(
      `${endpoint}books/incrementViews/${bookID}`
    );
    return response.data;
  };

  const incrementClicks = async (bookID: number) => {
    const response = await api.post(
      `${endpoint}books/incrementClicks/${bookID}`
    );
    return response.data;
  };

  return {
    addBook,
    deleteBook,
    updateBook,
    getBook,
    getBooks,
    getBooksPaginated,
    incrementViews,
    incrementClicks,
  };
}
