import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard";
import courseIa from "@/assets/course-ia.jpg";
import courseUxui from "@/assets/course-uxui.jpg";
import courseMarketing from "@/assets/course-marketing.jpg";
import courseMarketing2 from "@/assets/course-marketing2.jpg";
import { getCourses } from "@/lib/services/api.js";
import { useEffect, useState } from "react";


const coursesMock = [
  {
    image: courseIa,
    title: "Intro a la IA",
    description: "Aprende los conceptos fundamentales de inteligencia artificial y machine learning.",
    instructor: "Federico Ramos",
    rating: 5,
    price: 70,
  },
  {
    image: courseUxui,
    title: "Diseño UX/UI",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    instructor: "Bruno Social",
    rating: 5,
    price: 70,
  },
  {
    image: courseMarketing,
    title: "Marketing Digital",
    description: "Aprende a competir en el mundo digital con estrategias de marketing efectivas.",
    instructor: "Josai Mdonado",
    rating: 5,
    price: 10,
  },
  {
    image: courseMarketing2,
    title: "Marketing Digital",
    description: "Fusión de estrategias digitales para tu crecimiento profesional.",
    instructor: "Rome Martinezos",
    rating: 5,
    price: 10,
  },
];


const FeaturedCourses = () => {

  const [courses, setCourses] = useState([]);

  
 useEffect(() => {
   const fetchCourses = async () => {
      // console.log("llamando a la api");
      const data = await getCourses();
      // console.log("data recibida", data);
      setCourses(data);
    };

    fetchCourses();
  }, []);

  console.log(courses );
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
        {courses.map((course) => (
          <CourseCard key={course._id} 
          image={courseMarketing2}
          description={course.description}
          title={course.title}
          instructor="Josai Mdonado"
          rating={5}
          price={course.price}/>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;
