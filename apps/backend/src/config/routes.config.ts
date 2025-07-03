import { logout, signIn } from "../services/authService.service";
import { basicAuth } from "../middleware/basic-auth.middleware";
import {
  addBook,
  deleteBook,
  getBookById,
  getBooks,
  getBooksByPage,
  incrementClicks,
  incrementViews,
} from "../services/bookService.service";
import { uploadMiddleware } from "./multer.config";

export const routerHandler = {
  "GET /books": [getBooks],
  "GET /books/paginated": [getBooksByPage],
  "GET /book/:id": [getBookById],
  "POST /books/incrementViews/:id": [incrementViews],
  "POST /books/incrementClicks/:id": [incrementClicks],
};

export const routerAdminHandler = {
  "POST /sign-in": [signIn],
  "POST /logout": [basicAuth, logout],
  "POST /book": [basicAuth, uploadMiddleware.single("coverImage"), addBook],
  "DELETE /book/:id": [basicAuth, deleteBook],
  "GET /validate": [basicAuth, (req, res) => res.send({ success: true })],
};
