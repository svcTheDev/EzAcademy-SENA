import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/hooks/useAuthStore";
import { LogOut, User } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, user, startLogout } = useAuthStore();
  const navigate = useNavigate();

  // 🚀 Normalizamos el string del rol (a minúsculas y tolerante a 'role' o 'rol')
  const userRole = (user?.role || user?.rol || "").toLowerCase();

  // 🚀 Evaluamos si incluye 'instructor' o 'admin'
  const isInstructor =
    userRole.includes("instructor") || userRole.includes("admin");

  const coursesLink = isInstructor ? "/instructor/courses" : "/my-courses";

  const handleLogout = () => {
    startLogout();
    navigate("/login", { replace: true });
    setIsOpen(false);
  };

  return (
    <nav className="bg-nav px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-2xl font-bold text-foreground flex items-center pb-2"
        >
          ez<span className="text-primary">↗</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-foreground hover:text-primary hover:border-primary border-b-2 transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/catalog"
            className="text-sm text-muted-foreground hover:text-primary hover:border-primary border-b-2 transition-colors"
          >
            Cursos
          </Link>
          <Link
            to="/instructors"
            className="text-sm text-muted-foreground hover:text-primary hover:border-primary border-b-2 transition-colors"
          >
            Instructores
          </Link>

          {/* 🚀 LINK DINÁMICO */}
          {status === "authenticated" && (
            <Link
              to={coursesLink}
              className="text-sm text-muted-foreground hover:text-primary hover:border-primary border-b-2 transition-colors"
            >
              {isInstructor ? "Cursos impartidos" : "Mis cursos"}
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-secondary rounded-lg px-3 py-1.5">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-32"
          />
        </div>

        {/* 🚀 ESTADO DE SESIÓN (DESKTOP) */}
        {status === "not-authenticated" ? (
          <Link
            to="/login"
            className="text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
                <User className="w-4 h-4 text-foreground" />
              </div>
              <span className="hidden sm:inline">
                Hola,{" "}
                <strong className="text-foreground">
                  {user?.name || "Usuario"}
                </strong>
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20 px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Cerrar Sesión
            </button>
          </div>
        )}

        {/* BOTÓN MÓVIL */}
        <button
          className="md:hidden text-foreground z-[101]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* MENÚ MÓVIL */}
        <>
          <div
            className={`fixed top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-nav transform transition-transform duration-300 z-[100] ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 flex flex-col gap-6 text-center">
              <Link
                className="text-white text-lg font-medium"
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                className="text-white text-lg font-medium"
                to="/catalog"
                onClick={() => setIsOpen(false)}
              >
                Cursos
              </Link>
              <Link
                className="text-white text-lg font-medium"
                to="/instructors"
                onClick={() => setIsOpen(false)}
              >
                Instructores
              </Link>

              {status === "authenticated" && (
                <Link
                  className="text-white text-lg font-medium"
                  to={coursesLink}
                  onClick={() => setIsOpen(false)}
                >
                  {isInstructor ? "Mis cursos impartidos" : "Mis cursos"}
                </Link>
              )}

              {status === "not-authenticated" ? (
                <Link
                  className="text-primary text-lg font-semibold"
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-destructive text-lg font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar Sesión
                </button>
              )}
            </div>
          </div>

          {isOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-[90]"
              onClick={() => setIsOpen(false)}
            />
          )}
        </>
      </div>
    </nav>
  );
};

export default Navbar;