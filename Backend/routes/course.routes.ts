import { Router } from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import fieldvalidator from "../middlewares/field-validators.js";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { check } from "express-validator";

const router = Router();

router.use(validateJWT); // Aplica el middleware a todas las rutas de este router

router.get("/", getCourses);

router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("price", "El precio es obligatorio")
      .not()
      .isEmpty()
      .isFloat({ gt: 0 }),

    fieldvalidator,
  ], createCourse,
);

router.put("/:id", 
  [
     check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("price", "El precio es obligatorio")
      .not()
      .isEmpty()
      .isFloat({ gt: 0 }),
      fieldvalidator,
  ],updateCourse);

router.delete("/:id", deleteCourse);

export default router;
