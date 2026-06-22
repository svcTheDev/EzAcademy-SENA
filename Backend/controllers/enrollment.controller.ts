import { Request, Response, NextFunction } from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import { CustomError } from "../middlewares/customError.js";
import mongoose from "mongoose";

export const createEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.body;
    const studentId = req.uid; // Extraído del token

    // 1. Verificar si el curso existe
    const course = await Course.findById(courseId);
    if (!course) {
      throw new CustomError(
        "El curso al que intenta inscribirse no existe.",
        404,
      );
    }

    // 🛠️ NUEVA VALIDACIÓN POR CÓDIGO: Verificar si ya existe esta inscripción
    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingEnrollment) {
      throw new CustomError("Ya estás inscrito en este curso.", 400);
    }

    // 2. Verificar si hay cupos disponibles
    const currentEnrollmentsCount = await Enrollment.countDocuments({
      course: courseId,
    });
    if (currentEnrollmentsCount >= course.capacity) {
      throw new CustomError(
        "Lo sentimos, este curso ya no tiene cupos disponibles en vivo.",
        400,
      );
    }

    // 3. Crear la inscripción
    const newEnrollment = new Enrollment({
      student: studentId,
      course: courseId,
    });

    await newEnrollment.save();

    res.status(201).json({
      ok: true,
      message: "Te has inscrito exitosamente al curso en vivo.",
    });
  } catch (error: any) {
    next(error);
  }
};


export const getEnrollmentsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // El ID del estudiante que viene en la URL

    // Buscamos las inscripciones de ese estudiante y traemos los datos del curso incrustados
    const enrollments = await Enrollment.find({ student: id })
      .populate({
        path: 'course',
        select: 'title description startDate capacity price instructor',
        populate: {
          path: 'instructor',
          select: 'name email' // Trae también el nombre del profesor del curso
        }
      });

    res.status(200).json({
      ok: true,
      count: enrollments.length,
      enrollments
    });
  } catch (error) {
    next(error);
  }
};