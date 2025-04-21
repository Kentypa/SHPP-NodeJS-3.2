import { Request, Response, NextFunction } from "express";
import { logout, signIn } from "../services/authService.service";
import { basicAuth } from "../middleware/basic-auth.middleware";

type RouteHandler = (req: Request, res: Response, next: NextFunction) => void;

export const routerHandler: Record<string, RouteHandler[]> = {
  ["sign-in"]: [signIn],
  ["logout"]: [basicAuth, logout],
  ["validate"]: [
    basicAuth,
    (req: Request, res: Response) => {
      res.send({ success: true });
    },
  ],
};
