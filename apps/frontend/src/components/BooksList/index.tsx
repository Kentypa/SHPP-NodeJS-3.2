import { FC, useState } from "react";
import { booksService } from "../../services/books-service";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { RoutesPath } from "../../enums/routes-path";

type Book = {
  id: number;
  name: string;
  image: string;
  authors: string[];
};

export const BooksList: FC = () => {
  const { getBooksPaginated } = booksService("/api/v1/");
  const [page, setPage] = useState(1);
  const limit = 20;
  const nav = useNavigate();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["books", page],
    queryFn: () => getBooksPaginated(page, limit),
  });

  if (isLoading) {
    return <div className="text-center mt-10">Books loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">Error loading books</div>
    );
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book list</h1>

      {isSuccess && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.books.map((book: Book) => (
              <div
                key={book.id}
                className="flex flex-col items-center border border-gray-200 rounded-2xl shadow-sm p-4 bg-white"
              >
                <img
                  src={`http://localhost:3000${book.image}`}
                  className="w-32 h-48 object-cover mb-4"
                  alt={book.name}
                />
                <p className="text-xl font-semibold mb-2 text-center truncate w-full">
                  {book.name}
                </p>
                <p className="text-sm text-gray-600 mb-3 text-center">
                  {book.authors.join(", ")}
                </p>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition"
                  onClick={() => nav(`${RoutesPath.BOOK}/${book.id}`)}
                >
                  Read
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: data.totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  page === i + 1
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
};
