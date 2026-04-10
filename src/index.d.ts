import { AuthUser } from "./lib/type";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}