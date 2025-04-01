import { FC } from "react";
import { Header } from "../../components/Header";
import { BooksList } from "../../components/BooksList";
import { Footer } from "../../components/Footer";

export const BooksPage: FC = () => {
  return (
    <main className="flex flex-col h-full min-h-screen">
      <Header />
      <BooksList />
      <Footer />
    </main>
  );
};
