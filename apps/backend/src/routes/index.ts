import { routerHandler } from "../config/routes.config";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.all(
  "/api/v1/",
  async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const action = req.query.action as string;

    if (!routerHandler[action]) {
      res.status(404).json({ error: `Action '${action}' not found` });
      return Promise.resolve();
    }

    try {
      await Promise.all(
        routerHandler[action].map((handler) => handler(req, res, next))
      );
    } catch (error) {
      console.error("Error processing request:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Internal server error" });
      }
      next(error);
    }
  }
);

export default router;
