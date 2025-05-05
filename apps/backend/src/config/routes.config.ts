import { Request, Response } from "express";
import { logout, signIn } from "../services/authService.service";
import { basicAuth } from "../middleware/basic-auth.middleware";
import { addBook, getBooks } from "../services/bookService.service";
import { uploadMiddleware } from "./multer.config";

export const routerHandler = {
  ["sign-in"]: [signIn],
  ["logout"]: [basicAuth, logout],
  ["validate"]: [
    basicAuth,
    (req: Request, res: Response) => {
      res.send({ success: true });
    },
  ],
  ["add-book"]: [basicAuth, uploadMiddleware.single("coverImage"), addBook],
  ["get-books"]: [getBooks],
};
