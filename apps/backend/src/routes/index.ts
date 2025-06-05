import { Router } from "express";
import { routerHandler } from "../config/routes.config";

const router = Router();

Object.entries(routerHandler).forEach(([endpoint, handlers]) => {
  const [method, path] = endpoint.split(" ");
  router[method.toLowerCase()](`/api/v1${path}`, ...handlers);
});

export default router;
