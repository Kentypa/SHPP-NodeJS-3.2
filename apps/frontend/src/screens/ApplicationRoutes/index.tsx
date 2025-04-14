import { FC } from "react";
import { Routes, Route } from "react-router";
import { BooksPage } from "../BooksPage";
import { MainPage } from "../MainPage";
import { SignInPage } from "../SignInPage";
import { SignUpPage } from "../SignUpPage";
import { AdminPage } from "../AdminPage";

export const ApplicationRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="library" element={<BooksPage />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="admin" element={<AdminPage />} />
    </Routes>
  );
};
