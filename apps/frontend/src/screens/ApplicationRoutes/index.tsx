import { FC } from "react";
import { Routes, Route } from "react-router";
import { BooksPage } from "../BooksPage";

export const ApplicationRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BooksPage />} />
    </Routes>
  );
};
