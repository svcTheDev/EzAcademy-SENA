import { useEffect, useState } from "react";
import { useCourseStore } from "@/hooks/useCourseStore";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
// import { CreateCourseModal } from "@/components/CreateCourseModal";
import { CourseFormModal } from "@/components/CourseFromModal";

export const InstructorCourses = () => {
  const { instructorCourses, isLoading, startLoadingInstructorCourses } =
    useCourseStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  useEffect(() => {
    startLoadingInstructorCourses();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center">Cargando tus cursos...</div>;
  }

  // Handler para abrir modal en modo CREAR
  const handleOpenCreate = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };
  
  // Handler para abrir modal en modo EDITAR
  const handleOpenEdit = (course: any) => {
    console.log("Curso seleccionado para editar:", course); // 👈 Verifica en la consola si `_id` existe
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Panel de Instructor</h1>
          <p className="text-sm text-muted-foreground">
            Administra los cursos que has dictado en EzAcademy
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-primary text-primary-foreground flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Crear Nuevo Curso
        </button>
      </div>

      {/* Grid de Cursos */}
      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground">
          Cargando cursos...
        </div>
      ) : instructorCourses.length === 0 ? (
        <div className="border border-dashed border-border rounded-xl p-12 text-center text-muted-foreground">
          Aún no has creado ningún curso. ¡Haz clic en "Crear Nuevo Curso" para
          empezar!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorCourses.map((course: any) => (
            <div
              key={course._id}
              className="border border-border/60 rounded-xl p-5 bg-card flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                  {course.description}
                </p>
              </div>

              <div className="border-t border-border/40 pt-4 mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold">
                  ${course.price} USD
                </span>
                <div className="flex gap-2">
                  {/* Botón Editar conectado */}
                  <button
                    onClick={() => handleOpenEdit(course)}
                    className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
                    title="Editar Curso"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    title="Eliminar Curso"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal único para Crear y Editar */}
      <CourseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseToEdit={selectedCourse}
      />
    </div>
  );
};

export default InstructorCourses;
