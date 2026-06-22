import type { UserRole } from "./helpers/jwt.js";

declare global {
  namespace Express {
    interface Request {
      uid: string;
      name: string;
      email: string;
      role: UserRole;
    }
  }
}

export {};
