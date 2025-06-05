import { FC } from "react";
import { Routes, Route } from "react-router";
import { BooksPage } from "../BooksPage";
import { MainPage } from "../MainPage";
import { SignInPage } from "../SignInPage";
import { AdminPage } from "../AdminPage";
import { ProtectedRoute } from "../../components/UI/ProtectedRoute";
import { BookPage } from "../BookPage";

export const ApplicationRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="library" element={<BooksPage />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="books/:id" element={<BookPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};
