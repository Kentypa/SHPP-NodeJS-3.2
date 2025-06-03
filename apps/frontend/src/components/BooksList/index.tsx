import { FC, useState } from "react";
import { booksService } from "../../services/books-service";
import { useQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 20;

type Book = {
  id: number;
  name: string;
  image: string;
  authors: string[];
};

export const BooksList: FC = () => {
  const { getBooks } = booksService("api/v1/");
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const [page, setPage] = useState(1);

  if (isLoading) {
    return <div className="text-center mt-10">Books loading...</div>;
  }

  const totalPages = Math.ceil(data.books.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const currentBooks: Book[] = data.books.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error at books loading
      </div>
    );
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book list</h1>
      {isSuccess && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className="flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-sm p-4 bg-white"
            >
              <img
                src={`http://localhost:3000${book.image}`}
                className="w-20 h-30"
              />
              <p
                className="text-xl font-semibold mb-2 truncate w-30"
                title={book.name}
              >
                {book.name}
              </p>
              <p className="text-sm font-semibold mb-2 truncate w-30">
                {book.authors.join(",")}
              </p>
              <button
                className="bg-green-400 rounded-xl px-3 py-1 cursor-pointer"
                onClick={() => {
                  console.log(book.id);
                }}
              >
                Read
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg border ${
              page === i + 1
                ? "bg-gray-600 text-white"
                : "bg-white text-gray-600 border-gray-600 hover:bg-blue-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
};
