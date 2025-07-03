import { SignInUserDto } from "../dto/sign-in-user.dto";
import { pool } from "../config/db.config";
import { Request, Response } from "express";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as SignInUserDto;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        error: "Email and password are required",
      });
    }

    const query = 'SELECT * FROM "user" WHERE email = $1';
    const result = await pool.query(query, [email]);

    const user = result.rows[0];

    if (!user || user.password !== password) {
      return res
        .status(401)
        .send({ success: false, error: "Invalid credentials" });
    }

    const credentials = `${email}:${password}`;
    const basic = Buffer.from(credentials).toString("base64");

    return res.send({
      success: true,
      basic: basic,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res.send({
      success: true,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};