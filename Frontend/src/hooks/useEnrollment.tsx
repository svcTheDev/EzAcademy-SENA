import { useState } from 'react';
import { enrollInCourse, getMyEnrollments } from '../lib/services/api';
import { useToast } from '@/components/ui/use-toast';

export const useEnrollment = () => {
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 🚀 Lógica para inscribirse en un curso
  const startEnrollment = async (courseId: string) => {
    try {
      setLoading(true);
      const data = await enrollInCourse(courseId);
      
      toast({
        title: "¡Inscripción Exitosa!",
        description: "Ya tienes acceso al curso. ¡A aprender!",
      });
      
      return data;
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || 'No se pudo completar la inscripción';
      toast({
        variant: "destructive",
        title: "Error al inscribirte",
        description: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  // 📚 Lógica para traer mis cursos asignados
  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const data = await getMyEnrollments();
      // Guardamos el arreglo de inscripciones que devuelve el backend
      setMyCourses(data.enrollments || []);
    } catch (error) {
      console.error("Error cargando mis cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    myCourses,
    startEnrollment,
    fetchMyCourses
  };
};