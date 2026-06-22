import jsonwebtoken from "jsonwebtoken";
import express from "express";
import { UserToken } from "../helpers/jwt.js";
import { ENV } from "../config/env.js";
import { CustomError } from "./customError.js";

//  LA SOLUCIÓN DEFINITIVA: Extendemos el Request de Express globalmente
declare global {
  namespace Express {
    interface Request {
      userToken: UserToken
      role: string
    }
  }
}

export const validateJWT = (
  req: express.Request, 
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.header("x-token");

  if (!token) {
    throw new CustomError("No hay token en la petición", 401);
  }

  try {
    const { uid, name, email, role } = jsonwebtoken.verify(
      token,
      ENV.JWT_SECRET,
    ) as Required<UserToken>;
    
    req.uid = uid;
    req.name = name;
    req.email = email;
    req.role = role;

    next();
  } catch {
    // Usamos tu manejador tirando el CustomError para mantener el estándar que querías
    throw new CustomError("Token no válido o expirado", 401);
  }
};