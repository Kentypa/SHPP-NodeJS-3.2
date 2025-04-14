import { FC } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";
import { AdminBookList } from "../../components/AdminBookList";
import { AdminBookAdd } from "../../components/AdminBookAdd";

const bookList = [
  {
    title: "PHP для початківців",
    authors: ["Жора"],
    img: "",
    year: 2021,
    clicks: 3,
  },
  {
    title: "Java для початківців",
    authors: ["Жора, Жорик"],
    img: "",
    year: 2021,
    clicks: 3,
  },
];

export const AdminPage: FC = () => {
  return (
    <PageWrapper>
      <main className="flex flex-grow justify-center">
        <div className="flex justify-between w-full max-w-[1280px] py-10">
          <AdminBookList booksList={bookList} />
          <AdminBookAdd />
        </div>
      </main>
    </PageWrapper>
  );
};
