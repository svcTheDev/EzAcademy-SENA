import { response } from "express";
import { validationResult } from "express-validator";
import { Request } from "express-validator/lib/base.js";
import express from "express";

const fieldValidator = (req: express.Request, res = express.response, next: () => void) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped(),
    });
  }
  next();
};

export default fieldValidator;
