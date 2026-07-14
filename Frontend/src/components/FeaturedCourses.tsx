import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard";
import courseMarketing2 from "@/assets/course-marketing2.jpg";
import { getCourses } from "@/lib/services/api.js";
import { useEffect, useState } from "react";

// Agregamos tanto _id como cid al tipo para soportar el contrato real de MongoDB
interface Course {
  _id?: string;
  cid: string;
  title: string;
  description: string;
  price: number;
  capacity: number;
  enrolledCount: number;
  instructor: {
    name: string;
    email: string;
  };
}

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getCourses();

        // 🛡️ CORRECCIÓN DE CONTRATO (Codex):
        if (response && response.courses) {
          setCourses(response.courses);
        } else if (Array.isArray(response)) {
          setCourses(response);
        }

        setError(false);
      } catch (err) {
        console.error("Error al cargar cursos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Manejo de estados visuales para evitar pantallas en blanco accidentales
  if (loading)
    return <div className="text-center py-10 text-foreground">Cargando cursos en vivo...</div>;
    
  if (error)
    return (
      <div className="text-center py-10 text-destructive font-semibold">
        Hubo un error al conectar con el backend.
      </div>
    );
    
  if (courses.length === 0)
    return (
      <div className="text-center py-10 text-muted-foreground">
        No hay cursos disponibles actualmente.
      </div>
    );

  return (
    <section className="px-8 md:px-16 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-foreground text-xl font-bold">Cursos Destacados</h2>
        <div className="flex gap-2">
          <button className="bg-secondary p-1.5 rounded-full hover:bg-border transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button className="bg-secondary p-1.5 rounded-full hover:bg-border transition-colors">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4">
        {courses.map((course) => {
          // Extraemos el ID real para la inscripción (priorizando el _id de Mongo)
          const courseId = course._id || course.cid || "";

          return (
            <CourseCard
              key={courseId}
              id={courseId} // 🚀 Pasamos el ID real de MongoDB al CourseCard
              image={courseMarketing2}
              description={course.description}
              title={course.title}
              // Usamos el nombre real del instructor si viene del populate del backend
              instructor={course.instructor?.name || "Instructor Asignado"}
              rating={5}
              price={course.price}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCourses;
