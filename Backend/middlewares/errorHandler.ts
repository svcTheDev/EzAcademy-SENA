import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError.js";

export const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isKnownError = error instanceof Error;

  console.error(
    "[Global Error Intercepted]:",
    isKnownError ? error.name : "UnknownError",
    "->",
    isKnownError ? error.message : error,
  );

  const statusCode = error instanceof CustomError ? error.statusCode : 500;
  const message = isKnownError
    ? error.message
    : "Ocurrio un error interno en el servidor";

  res.status(statusCode).json({
    ok: false,
    message,
    error:
      process.env.NODE_ENV === "development" && isKnownError
        ? error.stack
        : undefined,
  });
};
