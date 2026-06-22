import jsonwebtoken from "jsonwebtoken";
import { ENV } from "../config/env.js";

export type UserRole = "student" | "instructor" | "admin";

export interface UserToken {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
}

type TokenSource = Partial<UserToken> & {
  id?: string;
  _id?: unknown;
};

export const isUserRole = (role: unknown): role is UserRole => {
  return role === "student" || role === "instructor" || role === "admin";
};

const getTokenUid = (user: TokenSource): string | undefined => {
  if (user.uid) return user.uid;
  if (user.id) return user.id;
  if (user._id && typeof user._id === "object" && "toString" in user._id) {
    return user._id.toString();
  }

  return undefined;
};

export const generateToken = (user: TokenSource): Promise<string> => {
  const uid = getTokenUid(user);

  if (!uid || !user.name || !isUserRole(user.role)) {
    return Promise.reject("Datos de usuario insuficientes para generar el token");
  }

  const payload: UserToken = {
    uid,
    name: user.name,
    email: user.email ?? "",
    role: user.role,
  };

  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      payload,
      ENV.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err || !token) {
          reject("Error al generar el token");
        } else {
          resolve(token);
        }
      },
    );
  });
};
