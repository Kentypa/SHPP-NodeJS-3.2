import { FC } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";
import { BookPageContent } from "../../components/BookPageContent";

export const BookPage: FC = () => {
  return (
    <PageWrapper>
      <BookPageContent />
    </PageWrapper>
  );
};
