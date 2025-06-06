import { FC } from "react";
import { BooksList } from "../../components/BooksList";
import { PageWrapper } from "../../components/UI/PageWrapper";

export const BooksPage: FC = () => {
  return (
    <PageWrapper>
      <BooksList />
    </PageWrapper>
  );
};
