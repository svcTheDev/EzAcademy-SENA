import { Router } from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import fieldvalidator from "../middlewares/field-validators.js";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
} from "../controllers/course.controller.js";
import { check } from "express-validator";
import { isAdminOrInstructor } from "../middlewares/checkRole.js";

const router = Router();

// PÚBLICAS
router.get("/", getCourses);
router.get("/:id", getCourseById);

// PRIVADOS
router.use(validateJWT);

router.post(
  "/",
  [
    isAdminOrInstructor,
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("price", "El precio debe ser un número válido").isNumeric(),
    check(
      "startDate",
      "La fecha de inicio es obligatoria y válida",
    ).isISO8601(),
    check("capacity", "La capacidad debe ser un número entero").isInt({
      min: 1,
    }),

    fieldvalidator,
  ],
  createCourse,
);

router.put(
  "/:id",
  [
    isAdminOrInstructor,
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("price", "El precio debe ser un número válido").isNumeric(),
    check(
      "startDate",
      "La fecha de inicio es obligatoria y válida",
    ).isISO8601(),
    check("capacity", "La capacidad debe ser un número entero").isInt({
      min: 1,
    }),
    fieldvalidator,
  ],
  updateCourse,
);

router.delete("/:id", isAdminOrInstructor, deleteCourse);

export default router;
