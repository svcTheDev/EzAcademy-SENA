import Course from "../models/Course.js";
import express from "express";

export const getCourses = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const courses = await Course.find().populate("user", "name email");

    res.status(200).json(courses);
  } catch (error: string | any) {
    res.status(500).json({
      message: "Error al obtener los cursos",
      error: error.message,
    });
  }
};

export const createCourse = async (
  req: express.Request,
  res: express.Response,
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
    res.status(500).json({
      message: "Error al crear el curso",
      error: error.message,
    });
  }
};

export const updateCourse = async (
  req: express.Request,
  res: express.Response,
) => {
  const CourseId = req.params.uid;

  const courseFound = await Course.findById(CourseId);
  try {

    console.log(courseFound);
    if (!courseFound) {
      return res.status(404).json({
        message: "Curso no encontrado",
      });
    }

    if (courseFound.user.toString() !== req.uid) {
      return res.status(401).json({
        message: "No tienes permiso para actualizar este curso",
      });
    }

    const newCourse = {
      ...req.body,
      user: req.uid,
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      CourseId,
      newCourse,
      { new: true },
    );

    res.json({ message: "Curso actualizado", course: updatedCourse });
  } catch (error: string | any) {
    res.status(500).json({
      message: "Error al actualizar el curso",
    });
  }
};

export const deleteCourse = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const CourseId = req.params.uid;

    console.log(CourseId);

    const courseFound = await Course.findById(CourseId);
    if (!courseFound) {
      return res.status(404).json({
        message: "Curso no encontrado",
      });
    }

    if (courseFound.user.toString() !== req.uid) {
      return res.status(401).json({
        message: "No tienes permiso para eliminar este curso",
      });
    }

    await Course.findByIdAndDelete(CourseId);

    res.json({ message: "Curso eliminado" });
  } catch (error: string | any) {
    res.status(500).json({
      message: "Error al eliminar el curso",
    });
  }
};
