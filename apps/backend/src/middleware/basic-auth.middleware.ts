import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db.config";
import { User } from "../shared/entity/User";

export const basicAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Authentication required");
  }

  const base64Credentials = authHeader.split(" ")[1];

  try {
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "utf-8"
    );
    const [email, password] = credentials.split(":");

    if (!email || !password) {
      return res.status(400).send("Invalid authorization header format");
    }

    const query =
      'SELECT id, email, password, role FROM "user" WHERE email = $1';
    const result = await pool.query(query, [email]);

    const user: User | undefined = result.rows[0];

    if (!user) {
      return res.status(401).send("Invalid authentication credentials");
    }

    if (password !== user.password) {
      return res.status(401).send("Invalid authentication credentials");
    }

    (req as any).user = user;

    return next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).send("Server error during authentication");
  }
};
