import { FC } from "react";
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
          {booksList.map((book, index) => (
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
    </div>
  );
};
