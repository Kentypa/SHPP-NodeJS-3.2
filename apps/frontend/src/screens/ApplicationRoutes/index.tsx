import { FC } from "react";
import { Routes, Route } from "react-router";
import { BooksPage } from "../BooksPage";
import { MainPage } from "../MainPage";
import { SignInPage } from "../SignInPage";
import { AdminPage } from "../AdminPage";
import { ProtectedRoute } from "../../components/UI/ProtectedRoute";

export const ApplicationRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="library" element={<BooksPage />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};
