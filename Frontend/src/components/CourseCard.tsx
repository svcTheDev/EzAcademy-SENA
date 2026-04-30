import { Star } from "lucide-react";

interface CourseCardProps {
  image?: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  price: number;
}

const CourseCard = ({ image, title, description, instructor, rating, price }: CourseCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden flex flex-col min-w-[220px] max-w-[280px]">
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
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-foreground">
              {instructor[0]}
            </div>
            <span className="text-xs text-muted-foreground">{instructor}</span>
          </div>
          <span className="text-foreground font-bold text-sm">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
