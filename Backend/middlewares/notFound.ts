import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    ok: false,
    message: `La ruta [${req.method}] ${req.originalUrl} no fue encontrada en este servidor.`
  });
};