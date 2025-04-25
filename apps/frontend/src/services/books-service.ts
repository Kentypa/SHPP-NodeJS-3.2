import { api } from "../config/axios-config";

export function booksService(endpoint: string) {
  const addBook = async (formData: FormData) => {
    const response = await api.post(endpoint, formData, {
      params: { action: "add-book" },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  const deleteBook = async (bookID: number) => {
    const response = await api.delete(endpoint, {
      params: { action: "delete-book", id: bookID },
    });
    return response.data;
  };

  const updateBook = async (bookID: number, newValue: FormData) => {
    const response = await api.put(
      endpoint,
      { id: bookID, newBook: newValue },
      {
        params: { action: "update-book" },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };

  const getBook = async (bookID: number) => {
    const response = await api.get(endpoint, {
      params: { action: "get-books", id: bookID },
    });
    return response.data;
  };

  const getBooks = async () => {
    const response = await api.get(endpoint, {
      params: { action: "get-books" },
    });
    return response.data;
  };

  return { addBook, deleteBook, updateBook, getBook, getBooks };
}
