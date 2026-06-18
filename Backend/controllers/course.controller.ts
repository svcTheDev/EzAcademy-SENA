import mongoose from "mongoose";
import Course from "../models/Course.js";
import express, { NextFunction } from "express";
import { CustomError } from "../middlewares/customError.js";

export const getCourses = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const courses = await Course.find().populate("user", "name email");

    res.status(200).json(courses);
  } catch (error: string | any) {
    next(error);
  }
};

export const createCourse = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    console.log(req.uid);

    const newCourse = new Course({
      ...req.body,
      user: req.uid, // <-- Se lo inyectas de una vez aquí
    });
    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: "Curso creado exitosamente",
      course: savedCourse,
    });
  } catch (error: string | any) {
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

    const courseFound = await Course.findById(CourseId);

    if (!courseFound) {
      throw new CustomError("Curso no encontrado en la base de datos", 404);
    }

    if (courseFound.user.toString() !== req.uid) {
      throw new CustomError(
        "No tienes permiso para actualizar este curso",
        403,
      );
    }

    const newCourse = {
      ...req.body,
      user: req.uid,
    };

    const updatedCourse = await Course.findByIdAndUpdate(CourseId, newCourse, {
      new: true,
    });

    res.json({ message: "Curso actualizado", course: updatedCourse });
  } catch (error: string | any) {
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

    const courseFound = await Course.findById(CourseId);
    if (!courseFound) {
      throw new CustomError("Curso no encontrado en la base de datos", 404);
    }

    if (courseFound.user.toString() !== req.uid) {
  throw new CustomError(
        "No tienes permiso para eliminar este curso",
        403,
      );
    }

    await Course.findByIdAndDelete(CourseId);

    res.json({ message: "Curso eliminado" });
  } catch (error: string | any) {
    next(error);
  }
};
