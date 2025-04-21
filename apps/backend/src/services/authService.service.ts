import { SignInUserDto } from "../dto/sign-in-user.dto";
import { AppDataSource } from "../data-source";
import { User } from "../shared/entity/User";
import { Request, Response } from "express";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as SignInUserDto;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
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
      .send({ success: false, message: "Internal server error" });
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
      .send({ success: false, message: "Internal server error" });
  }
};
