import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard";
import courseMarketing2 from "@/assets/course-marketing2.jpg";
import { getCourses } from "@/lib/services/api.js";
import { useEffect, useState } from "react";

interface Course {
  _id?: string;
  cid?: string;
  title: string;
  description: string;
  price: number;
  capacity: number;
  enrolledCount?: number;
  instructor?: {
    name: string;
    email: string;
  };
}

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Estados de paginación
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getCourses();

        if (response && response.courses) {
          setCourses(response.courses);
          setTotalPages(response.totalPages || 1);
        } else if (Array.isArray(response)) {
          setCourses(response);
          setTotalPages(1);
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
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-foreground font-medium">
        Cargando cursos destacados...
      </div>
    );

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

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Pág. {page}/{totalPages}
          </span>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className="bg-secondary p-2 rounded-full hover:bg-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Página Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className="bg-secondary p-2 rounded-full hover:bg-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Página Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {courses.map((course) => {
          const courseId = course._id || course.cid || "";

          return (
            <CourseCard
              key={courseId}
              id={courseId}
              image={courseMarketing2}
              description={course.description}
              title={course.title}
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
