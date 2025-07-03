import { User } from "../entities/User";

export interface AuthRequest extends Request {
  user?: User;
}
