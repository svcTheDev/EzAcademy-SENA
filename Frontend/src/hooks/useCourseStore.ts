import api from "@/lib/services/api";
import { useState } from "react";

// En tu hook useCourseStore.ts (o similar)
export const useCourseStore = () => {
  // ... tu estado previo
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const startLoadingInstructorCourses = async () => {
    setIsLoading(true);
    try {
      // Consumimos el nuevo endpoint que acabas de probar
      const { data } = await api.get('/courses/instructor');
      setInstructorCourses(data.courses);
    } catch (error) {
      console.error("Error cargando cursos del instructor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    instructorCourses,
    isLoading,
    startLoadingInstructorCourses,
    // ... tus otras funciones
  };
};