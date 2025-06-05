import { FC, useState } from "react";
import { booksService } from "../../services/books-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AdminBook = {
  id: number;
  name: string;
  authors: string[];
  image: string;
  year: number;
  totalClick: number;
};

export const AdminBookList: FC = () => {
  const { deleteBook, getBooksPaginated } = booksService("/api/v1/");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const booksPerPage = 7;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooksPaginated(currentPage, booksPerPage),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading books...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center p-4 text-red-500">Error loading books</div>
    );
  }

  return (
    <div className="border border-gray-600 rounded-2xl inline-block max-h-100">
      <table className="border-collapse w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border border-gray-400">Book name</th>
            <th className="p-3 border border-gray-400">Authors</th>
            <th className="p-3 border border-gray-400">Year</th>
            <th className="p-3 border border-gray-400">Actions</th>
            <th className="p-3 border border-gray-400">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {data.books.map((book: AdminBook) => (
            <tr key={book.id} className="even:bg-gray-100">
              <td className="p-3 border border-gray-300 flex items-center gap-2">
                <img
                  src={`http://localhost:3000${book.image}`}
                  alt="book cover"
                  className="w-8 h-10 object-cover"
                />
                <span className="truncate max-w-xs">{book.name}</span>
              </td>
              <td className="p-3 border border-gray-300 max-w-xs truncate">
                {book.authors.join(", ")}
              </td>
              <td className="p-3 border border-gray-300">{book.year}</td>
              <td className="p-3 border border-gray-300">
                <button
                  className="text-red-600 hover:text-red-800 transition-colors"
                  onClick={() => deleteMutation.mutate(book.id)}
                >
                  Delete
                </button>
              </td>
              <td className="p-3 border border-gray-300 text-center">
                {book.totalClick}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагинация */}
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {data.totalPages > 5 && (
            <span className="px-2">... of {data.totalPages}</span>
          )}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, data.totalPages))
          }
          disabled={currentPage === data.totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
