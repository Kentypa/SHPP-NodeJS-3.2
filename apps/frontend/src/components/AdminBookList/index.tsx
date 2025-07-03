import { FC, useEffect } from "react";
import { booksService } from "../../services/books-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { AdminBook } from "../../types/admin-book";

export const AdminBookList: FC = () => {
  const { deleteBook } = booksService("admin/api/v1/");
  const { getBooksPaginated } = booksService("api/v1/");
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 7;

  useEffect(() => {
    setSearchParams({ page: String(currentPage), limit: String(limit) });
  }, [currentPage, limit, setSearchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-books", currentPage],
    queryFn: () => getBooksPaginated(currentPage, limit),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books", currentPage] });
    },
  });

  const totalPages = data?.totalPages || 1;

  const goToPage = (page: number) => {
    setSearchParams({ page: String(page), limit: String(limit) });
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading books...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center p-4 text-red-500">Error loading books</div>
    );
  }

  return (
    <div className="w-full overflow-x-auto border border-gray-600 rounded-2xl">
      <table className="w-full border-collapse table-auto">
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
          onClick={() => goToPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (pageNum) =>
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - currentPage) <= 2
            )
            .map((pageNum, index, array) => {
              const prev = array[index - 1];
              const showEllipsis = prev && pageNum - prev > 1;
              return (
                <span key={pageNum} className="flex">
                  {showEllipsis && <span className="px-2">...</span>}
                  <button
                    onClick={() => goToPage(pageNum)}
                    className={`w-10 h-10 rounded-full ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                </span>
              );
            })}
        </div>

        <button
          onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
