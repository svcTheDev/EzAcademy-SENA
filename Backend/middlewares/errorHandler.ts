import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(
    "❌ [Global Error Intercepted]:",
    error.name,
    "->",
    error.message,
  );

  let statusCode = error.statusCode || 500;
  let message = error.message || "Ocurrió un error interno en el servidor";

  res.status(statusCode).json({
    ok: false,
    message,

    error: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};
