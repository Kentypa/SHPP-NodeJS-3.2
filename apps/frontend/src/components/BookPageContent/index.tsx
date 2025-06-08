import { FC, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { booksService } from "../../services/books-service";
import { useMutation, useQuery } from "@tanstack/react-query";

type SingleBook = {
  id: number;
  name: string;
  authors: string[];
  image: string;
  year: number;
  description: string;
};

export const BookPageContent: FC = () => {
  const params = useParams();
  const { id: bookID } = params;
  const currentBookID = Number(bookID);

  const { getBook, incrementViews, incrementClicks } = booksService("/api/v1/");
  const { data, isLoading, isError } = useQuery({
    queryKey: [currentBookID, "books"],
    queryFn: () => getBook(currentBookID),
    enabled: !!currentBookID && !isNaN(currentBookID),
  });

  const { mutate: mutation1 } = useMutation({
    mutationKey: [currentBookID, "increment-clicks"],
    mutationFn: incrementClicks,
  });

  const incrementClicksMutation = useCallback(
    (param: number) => mutation1(param),
    [mutation1]
  );

  const { mutate: mutation2 } = useMutation({
    mutationKey: [currentBookID, "increment-views"],
    mutationFn: incrementViews,
  });

  const incrementViewsMutation = useCallback(
    (param: number) => mutation2(param),
    [mutation2]
  );

  useEffect(() => {
    if (currentBookID) {
      incrementViewsMutation(currentBookID);
    }
  }, [currentBookID, incrementViewsMutation]);

  if (data === undefined) return <div>Book with this ID not found</div>;

  const book = data.book as SingleBook;

  if (isLoading) return <div>Books is loading</div>;
  if (isError) return <div>Can`t load books</div>;

  return (
    <div className="flex justify-center">
      <div className="py-10 flex flex-row gap-10 w-[1280px]">
        <img
          src={`http://localhost:3000${book.image}`}
          className="w-75 h-100 object-cover"
        />
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-3xl">{book.name}</h2>
          <p>Authors: {book.authors.join(",")}</p>
          <p>Year: {book.year}</p>
          <p>Description: {book.description}</p>
          <button
            className="p-3 bg-green-500 rounded-xl cursor-pointer"
            onClick={() => {
              alert(
                "Call to phone +123456789 to get more info about this book"
              );
              incrementClicksMutation(currentBookID);
            }}
          >
            I want read!
          </button>
        </div>
      </div>
    </div>
  );
};
