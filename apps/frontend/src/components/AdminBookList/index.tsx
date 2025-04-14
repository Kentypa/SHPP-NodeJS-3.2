import { FC } from "react";

type AdminBook = {
  title: string;
  authors: string[];
  img: string;
  year: number;
  clicks: number;
};

type AdminBookListProps = {
  booksList: AdminBook[];
};

export const AdminBookList: FC<AdminBookListProps> = ({ booksList }) => {
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
                <img src={book.img} alt="book" className="w-6 h-6" />
                <span>{book.title}</span>
              </td>
              <td className="p-3 border border-gray-300">
                {book.authors.join(", ")}
              </td>
              <td className="p-3 border border-gray-300">{book.year}</td>
              <td className="p-3 border border-gray-300">
                <button className="text-blue-600 hover:underline">
                  delete
                </button>
              </td>
              <td className="p-3 border border-gray-300">{book.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
