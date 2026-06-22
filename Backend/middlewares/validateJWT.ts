import jsonwebtoken from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { isUserRole, UserToken } from "../helpers/jwt.js";
import { ENV } from "../config/env.js";
import { CustomError } from "./customError.js";

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("x-token");

  if (!token) {
    throw new CustomError("No hay token en la peticion", 401);
  }

  try {
    const { uid, name, email, role } = jsonwebtoken.verify(
      token,
      ENV.JWT_SECRET,
    ) as UserToken;

    if (!uid || !name || !isUserRole(role)) {
      throw new CustomError("Token no valido o expirado", 401);
    }

    req.uid = uid;
    req.name = name;
    req.email = email ?? "";
    req.role = role;

    next();
  } catch {
    throw new CustomError("Token no valido o expirado", 401);
  }
};
