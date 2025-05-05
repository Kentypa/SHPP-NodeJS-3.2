import { api } from "../config/axios-config";

export function booksService(endpoint: string) {
  const addBook = async (formData: FormData) => {
    const response = await api.post(`${endpoint}add-book`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  const deleteBook = async (bookID: number) => {
    const response = await api.delete(`${endpoint}delete-book`, {
      params: { id: bookID },
    });
    return response.data;
  };

  const updateBook = async (bookID: number, newValue: FormData) => {
    const response = await api.put(
      `${endpoint}update-book`,
      { id: bookID, newBook: newValue },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };

  const getBook = async (bookID: number) => {
    const response = await api.get(`${endpoint}get-books`, {
      params: { id: bookID },
    });
    return response.data;
  };

  const getBooks = async () => {
    const response = await api.get(`${endpoint}get-books`);
    return response.data;
  };

  return { addBook, deleteBook, updateBook, getBook, getBooks };
}
