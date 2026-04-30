import { Router } from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
} from "../controllers/course.controller.js";

const router = Router();

// 🔹 GET /courses
router.get("/", getCourses);

// 🔹 GET /courses/:id
router.get("/:id", getCourseById);

// 🔹 POST /courses
router.post("/", createCourse);

export default router;