import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError.js";

export const isAdminOrInstructor = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.role !== "admin" && req.role !== "instructor") {
    throw new CustomError(
      "Acceso denegado. Se requieren permisos de Administrador o Instructor.",
      403,
    );
  }

  next();
};

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "student") {
    throw new CustomError(
      "Acceso denegado. Solo los Estudiantes pueden realizar esta accion.",
      403,
    );
  }

  next();
};
