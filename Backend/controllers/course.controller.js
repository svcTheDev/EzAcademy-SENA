import Course from "../models/Course.js";

// 🔹 GET /courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los cursos",
      error: error.message,
    });
  }
};

// 🔹 GET /courses/:id
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el curso",
      error: error.message,
    });
  }
};

// 🔹 POST /courses
export const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);

    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el curso",
      error: error.message,
    });
  }
};