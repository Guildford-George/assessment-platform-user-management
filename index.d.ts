import { AuthUser } from "./src/lib/type";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      role?: {
            id: string;
            name: string;
            is_system: boolean;
            organization_id: string;
        }
    }
  }

}