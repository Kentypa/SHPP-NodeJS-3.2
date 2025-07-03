import { User } from "../entity/User";

export interface AuthRequest extends Request {
  user?: User;
}
