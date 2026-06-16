import { check } from "express-validator";
import fieldValidator from "../middlewares/field-validators.js";
import { validateJWT } from "../middlewares/validateJWT.js";

import { Router } from "express";
import { createUser, loginUser, validateToken } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/",
  [
    check("name", "el nombre es obligatorio").notEmpty(),
    check("email", "el email es obligatorio").notEmpty(),
    check("password", "la contraseña es obligatoria").notEmpty(),
    check(
      "password",
      "la contraseña debe tener al menos 6 caracteres",
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  createUser,
);

router.post(
  "/login",
  [
    check("email", "el email es obligatorio").notEmpty(),
    check("password", "la contraseña es obligatoria").notEmpty(),
    check(
      "password",
      "la contraseña debe tener al menos 6 caracteres",
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  loginUser,
);

router.get("/validation", validateJWT, validateToken);

export default router;
