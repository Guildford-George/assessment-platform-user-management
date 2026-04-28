import { AuthUser } from "./src/lib/type";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }

}