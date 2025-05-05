import { Router } from "express";
import { routerHandler } from "../config/routes.config";
import { RequestHandler } from "express";

const router = Router();

Object.keys(routerHandler).forEach((action) => {
  const handlers = routerHandler[action as keyof typeof routerHandler];

  if (Array.isArray(handlers) && handlers.length > 0) {
    console.log(`Registering route for action: ${action}`);

    router.all(
      `/api/v1/${action}`,
      ...handlers.map((handler) => handler as RequestHandler)
    );
  } else {
    console.warn(`No valid handlers found for action: ${action}`);
  }
});

export default router;
