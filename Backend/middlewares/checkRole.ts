import { Request, Response, NextFunction } from 'express';
import { CustomError } from './customError.js';

export const isAdminOrInstructor = (req: Request, res: Response, next: NextFunction) => {
  // Asumiendo que tu validateJWT guarda el rol en req.role
  if (req.role !== 'instructor') {
    throw new CustomError("Acceso denegado. Se requieren permisos de Instructor.", 403);
  }
  next();
};

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== 'student') {
    throw new CustomError("Acceso denegado. Solo los Estudiantes pueden realizar esta acción.", 403);
  }
  next();
};