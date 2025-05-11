import { FC, useState } from "react";
import { booksService } from "../../services/books-service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type AdminBook = {
  id: number;
  name: string;
  authors: string[];
  image: string;
  year: number;
  totalClick: number;
};

type AdminBookListProps = {
  booksList: AdminBook[];
};

export const AdminBookList: FC<AdminBookListProps> = ({ booksList }) => {
  const { deleteBook } = booksService("api/v1/");
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 7;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = booksList.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(booksList.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="border border-gray-600 rounded-2xl inline-block max-h-100">
      <table className="border-collapse">
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
          {currentBooks.map((book, index) => (
            <tr key={index} className="even:bg-gray-200">
              <td className="p-3 border border-gray-300 flex items-center gap-2">
                <img
                  src={`http://localhost:3000${book.image}`}
                  alt="book"
                  className="w-6 h-6"
                />
                <span>{book.name}</span>
              </td>
              <td className="p-3 border border-gray-300">
                {book.authors.join(", ")}
              </td>
              <td className="p-3 border border-gray-300">{book.year}</td>
              <td className="p-3 border border-gray-300">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    logoutMutation.mutate(book.id);
                  }}
                >
                  delete
                </button>
              </td>
              <td className="p-3 border border-gray-300">{book.totalClick}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагинация */}
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-2 py-1 px-4 rounded-full ${
              currentPage === number
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
