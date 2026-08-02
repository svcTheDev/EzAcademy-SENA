import api from "@/lib/services/api";
import { useState } from "react";

export const useCourseStore = () => {
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const startLoadingInstructorCourses = async () => {
    setIsLoading(true);
    try {
      // Consumimos el endpoint de cursos del instructor
      const { data } = await api.get("/courses/instructor");
      setInstructorCourses(data.courses);
    } catch (error) {
      console.error("Error cargando cursos del instructor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🚀 NUEVO: Función para enviar el POST /courses al backend
  const startCreatingCourse = async (courseData: {
    title: string;
    description: string;
    price: number;
    startDate: string;
    capacity: number;
    category?: string;
  }) => {
    try {
      // 1. Petición POST al backend
      const { data } = await api.post("/courses", courseData);

      // 2. Refrescamos la lista de cursos inmediatamente
      await startLoadingInstructorCourses();

      return { ok: true, data };
    } catch (error: any) {
      console.error("Error al crear el curso:", error);
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.errors?.[0]?.msg ||
        "Error al crear el curso";
      return { ok: false, msg: errorMessage };
    }
  };
  const startUpdatingCourse = async (
    id: string,
    courseData: {
      title: string;
      description: string;
      price: number;
      startDate: string;
      capacity: number;
      category?: string;
    },
  ) => {
    try {
      const { data } = await api.put(`/courses/${id}`, courseData);
      await startLoadingInstructorCourses();
      return { ok: true, data };
    } catch (error: any) {
      console.error("Error al actualizar el curso:", error);
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.errors?.[0]?.msg ||
        "Error al actualizar el curso";
      return { ok: false, msg: errorMessage };
    }
  };
  return {
    instructorCourses,
    isLoading,
    startLoadingInstructorCourses,
    startCreatingCourse,
    startUpdatingCourse, // 👈 Lo agregamos al return
  };
};
