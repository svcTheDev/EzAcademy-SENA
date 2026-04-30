import heroBg from "@/assets/bg.png";

const HeroSection = () => {
  return (
    <section className="relative h-[400px] md:h-[450px] overflow-hidden">
      <img
        src={heroBg}
        alt="Estudiantes aprendiendo juntos"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl">
        <h1 className="text-left text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
          Aprende lo Que Quieras,
          <br />
          Cuando Quieras
        </h1>
        <p className="text-left text-muted-foreground text-sm md:text-base mb-6 max-w-lg">
          Aprende lo que quieras, cuando quieras, podrás acceder a información
          valiosa desde cualquier lugar.
        </p>
        <button className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold w-fit hover:opacity-90 transition-opacity">
          Ver Cursos
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
