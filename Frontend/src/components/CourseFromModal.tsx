import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useCourseStore } from "@/hooks/useCourseStore";

interface Course {
  cid?: string; // 👈 Agrega esta propiedad
  _id?: string;
  id?: string;
  title: string;
  description: string;
  price: number;
  startDate?: string;
  capacity?: number;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseToEdit?: Course | null; // Si tiene objeto -> Edición, si es null -> Creación
}

export const CourseFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  courseToEdit,
}) => {
  const { startCreatingCourse, startUpdatingCourse } = useCourseStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isEditing = Boolean(courseToEdit);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    startDate: "",
    capacity: "20",
  });

  // Al abrir el modal o cambiar courseToEdit, rellenamos el formulario
  useEffect(() => {
    if (courseToEdit) {
      // Formatear la fecha a YYYY-MM-DD para el input type="date"
      const formattedDate = courseToEdit.startDate
        ? new Date(courseToEdit.startDate).toISOString().split("T")[0]
        : "";

      setFormData({
        title: courseToEdit.title || "",
        description: courseToEdit.description || "",
        price: String(courseToEdit.price ?? ""),
        startDate: formattedDate,
        capacity: String(courseToEdit.capacity ?? "20"),
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        startDate: "",
        capacity: "20",
      });
    }
    setErrorMessage("");
  }, [courseToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    console.log("Objeto courseToEdit:", courseToEdit);
    const payload = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      startDate: new Date(formData.startDate).toISOString(),
      capacity: Number(formData.capacity),
    };

    // 🚀 Obtenemos el ID de forma segura (_id o id)
    const courseId = courseToEdit?.cid || courseToEdit?._id || courseToEdit?.id;
    const result = isEditing
      ? await startUpdatingCourse(courseId, payload)
      : await startCreatingCourse(payload);

    setIsSubmitting(false);

    if (result.ok) {
      onClose();
    } else {
      setErrorMessage(result.msg || "Ocurrió un error al guardar los cambios");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-border/60">
          <h2 className="text-xl font-bold text-foreground">
            {isEditing ? "Editar Curso" : "Crear Nuevo Curso"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {errorMessage && (
            <div className="bg-destructive/15 border border-destructive/30 text-destructive text-xs p-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Título del Curso *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Ej: React y TypeScript Avanzado"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-secondary border border-border/80 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Descripción *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Escribe una breve descripción del contenido..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-secondary border border-border/80 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Precio (USD) *
              </label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                required
                placeholder="49.99"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-secondary border border-border/80 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Capacidad *
              </label>
              <input
                type="number"
                name="capacity"
                min="1"
                required
                value={formData.capacity}
                onChange={handleChange}
                className="w-full bg-secondary border border-border/80 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Fecha Inicio *
              </label>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleChange}
                className="w-full bg-secondary border border-border/80 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Footer / Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border/40 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isSubmitting
                ? "Guardando..."
                : isEditing
                  ? "Guardar Cambios"
                  : "Crear Curso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
