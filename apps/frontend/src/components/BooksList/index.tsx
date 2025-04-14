import { FC, useState } from "react";
import bookImage from "../../assets/books/book.jpg";

const books = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  title: `Books №${i + 1}`,
  image: bookImage,
}));

const ITEMS_PER_PAGE = 20;

export const BooksList: FC = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Список книг</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentBooks.map((book) => (
          <div
            key={book.id}
            className="flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-sm p-4 bg-white"
          >
            <img src={book.image} className="w-20 h-30" />
            <p
              className="text-xl font-semibold mb-2 truncate w-30"
              title={book.title}
            >
              {book.title}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
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
