import mongoose from "mongoose";
import course from "../models/course.js";
import express, { NextFunction } from "express";
import user from "../models/user.js"; // 👈 ¡AÑADE ESTA LÍNEA! Esto fuerza a Mongoose a registrar el esquema de usuarios.
import { CustomError } from "../middlewares/customError.js";

export const getCourses = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 4;

    const skip = (page - 1) * limit;

    const [courses, totalCourses] = await Promise.all([
      course
        .find()
        .populate("instructor", "name email")
        .sort({ createdAt: -1 }) 
        .skip(skip)
        .limit(limit),
      course.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalCourses / limit);

    res.status(200).json({
      ok: true,
      count: courses.length,
      totalCourses,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      courses,
    });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const newCourse = new course({
      ...req.body,
      instructor: req.uid,
    });
    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: "Curso creado exitosamente",
      course: savedCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const CourseId = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(CourseId)) {
      throw new CustomError(
        `El formato del ID [${CourseId}] no es un ObjectId válido.`,
        400,
      );
    }

    const courseFound = await course.findById(CourseId);

    if (!courseFound) {
      throw new CustomError("Curso no encontrado en la base de datos", 404);
    }

    if (courseFound.instructor.toString() !== req.uid) {
      throw new CustomError(
        "No tienes permiso para actualizar este curso",
        403,
      );
    }

    const newCourse = {
      ...req.body,
      user: req.uid,
    };

    const updatedCourse = await course.findByIdAndUpdate(CourseId, newCourse, {
      new: true,
    });

    res.json({ message: "Curso actualizado", course: updatedCourse });
  } catch (error) {
    return next(error);
  }
};

export const deleteCourse = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const CourseId = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(CourseId)) {
      throw new CustomError(
        `El formato del ID [${CourseId}] no es un ObjectId válido.`,
        400,
      );
    }

    const courseFound = await course.findById(CourseId);
    if (!courseFound) {
      throw new CustomError("Curso no encontrado en la base de datos", 404);
    }

    if (courseFound.instructor.toString() !== req.uid) {
      throw new CustomError("No tienes permiso para eliminar este curso", 403);
    }

    await course.findByIdAndDelete(CourseId);

    res.json({ message: "Curso eliminado" });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const courseId = await course
      .findById(id)
      .populate("instructor", "name email");
    if (!courseId) {
      return res
        .status(404)
        .json({ ok: false, message: "Curso no encontrado" });
    }

    res.status(200).json({ ok: true, courseId });
  } catch (error) {
    next(error);
  }
};

export const getCoursesByInstructor = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const instructorId = req.uid; // ID extraído del token
    const courses = await course.find({ instructor: instructorId });

    return res.status(200).json({
      ok: true,
      courses,
    });
  } catch (error) {
    console.error("Error al obtener cursos del instructor:", error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
