import jsonwebtoken from "jsonwebtoken";
import express from "express";
import {UserToken} from "../helpers/jwt.js";
import { ENV } from "../config/env.js";


export const validateJWT = (req : express.Request, res : express.Response, next : express.NextFunction) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      message: "no hay token",
    });
  }

  try {
    const { uid, name, email } = jsonwebtoken.verify(
      token,
      ENV.JWT_SECRET,
    ) as Required<UserToken>;
    req.uid = uid;
    req.name = name;
    req.email = email;

    next();
  } catch {
    return res.status(401).json({
      message: "token no válido",
    });
  }
};
