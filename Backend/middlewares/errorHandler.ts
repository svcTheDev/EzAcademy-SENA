import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Imprime esto en tu consola para ver qué campos trae el error real de Mongo si vuelve a fallar
  console.error("❌ [Global Error Intercepted]:", error.name, "->", error.message);

  let statusCode = error.statusCode || 500;
  let message = error.message || "Ocurrió un error interno en el servidor";

  res.status(statusCode).json({
    ok: false,
    message,
    // Muestra la pila del error solo si estás desarrollando
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};