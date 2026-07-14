import { useEffect } from "react";
import { useEnrollment } from "../hooks/useEnrollment";
import courseMarketing2 from "@/assets/course-marketing2.jpg"; // Tu imagen comodín
import Navbar from "@/components/Navbar";

export const MyCourses = () => {
  const { myCourses, fetchMyCourses, loading } = useEnrollment();

  // Cargamos los cursos del usuario autenticado inmediatamente al abrir la página
  useEffect(() => {
    fetchMyCourses();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20">Cargando tus cursos inscritos...</div>
    );

  return (
    <>
    <Navbar />
    <div className="px-8 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Mis Cursos Inscritos
      </h1>

      {myCourses.length === 0 ? (
        <div className="text-muted-foreground text-center py-10">
          Aún no te has inscrito en ningún curso. ¡Ve a la página de inicio y
          elige uno!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myCourses.map((enrollment: any) => {
            // Nota: Dependiendo de tu populate en el backend, los datos del curso
            // suelen venir dentro de una propiedad 'course'
            const course = enrollment.course;

            if (!course) return null;

            return (
              <div
                key={enrollment._id}
                className="border rounded-lg p-4 shadow-sm bg-card"
              >
                <img
                  src={courseMarketing2}
                  alt={course.title}
                  className="rounded-md w-full h-40 object-cover mb-3"
                />
                <h3 className="font-bold text-lg text-foreground">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {course.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Inscrito el:{" "}
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </span>
                  <span className="bg-green-100 text-green-800 font-semibold px-2 py-1 rounded">
                    Activo
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </>
  );
};

export default MyCourses;
