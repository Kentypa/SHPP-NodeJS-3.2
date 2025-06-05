import { Request, Response } from "express";
import { logout, signIn } from "../services/authService.service";
import { basicAuth } from "../middleware/basic-auth.middleware";
import {
  addBook,
  deleteBook,
  getBookById,
  getBooks,
  getBooksByPage,
} from "../services/bookService.service";
import { uploadMiddleware } from "./multer.config";

export const routerHandler = {
  "POST /sign-in": [signIn],
  "POST /logout": [basicAuth, logout],
  "GET /validate": [basicAuth, (req, res) => res.send({ success: true })],
  "POST /book": [basicAuth, uploadMiddleware.single("coverImage"), addBook],
  "DELETE /book/:id": [basicAuth, deleteBook],
  "GET /books": [getBooks],
  "GET /books/paginated": [getBooksByPage],
  "GET /book/:id": [getBookById],
};
