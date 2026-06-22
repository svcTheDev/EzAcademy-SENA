import { Request, Response, NextFunction } from "express";
import ClassSession from "../models/classSession.js";
import Course from "../models/course.js";
import { CustomError } from "../middlewares/customError.js";

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId, title, description, date, meetingLink } = req.body;

    // Verificar que el curso exista y que le pertenezca a este instructor
    const course = await Course.findById(courseId);
    if (!course) throw new CustomError("El curso no existe", 404);

    if (course.instructor.toString() !== req.uid) {
      throw new CustomError(
        "No tienes permisos para añadir sesiones a un curso que no es tuyo.",
        403,
      );
    }

    const newSession = new ClassSession({
      course: courseId,
      title,
      description,
      date,
      meetingLink,
    });

    await newSession.save();
    res
      .status(201)
      .json({
        ok: true,
        message: "Sesión en vivo agendada",
        session: newSession,
      });
  } catch (error) {
    next(error);
  }
};

export const getSessionsByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const sessions = await ClassSession.find({ course: courseId }).sort({
      date: 1,
    }); // Ordenadas de la más cercana a la más lejana
    res.status(200).json({ ok: true, count: sessions.length, sessions });
  } catch (error) {
    next(error);
  }
};
