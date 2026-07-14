import { Star } from "lucide-react";
import { useEnrollment } from "../hooks/useEnrollment";

interface CourseCardProps {
  id: string; // 🚀 Requerido para poder procesar la inscripción en la base de datos
  image?: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  price: number;
}

const CourseCard = ({ id, image, title, description, instructor, rating, price }: CourseCardProps) => {
  // Consumimos el hook real de inscripciones
  const { startEnrollment, loading } = useEnrollment();

  const handleInscribe = () => {
    if (!id) return;
    startEnrollment(id);
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden flex flex-col min-w-[220px] max-w-[280px] border border-border/40 hover:border-border transition-all">
      <img src={image} alt={title} className="w-full h-36 object-cover" loading="lazy" width={640} height={512} />
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-foreground font-semibold text-sm mb-1">{title}</h3>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < rating ? "fill-star text-star" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-foreground">
              {instructor ? instructor[0] : "I"}
            </div>
            <span className="text-xs text-muted-foreground">{instructor}</span>
          </div>
          <span className="text-foreground font-bold text-sm">${price}</span>
        </div>

        {/* 🎯 BOTÓN "INSCRIBIRME" INTEGRADO REAL */}
        <button
          onClick={handleInscribe}
          disabled={loading}
          className="w-full mt-auto bg-primary text-primary-foreground text-xs font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Inscribiendo..." : "Inscribirme"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;