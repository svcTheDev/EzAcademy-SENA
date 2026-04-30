import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            className="text-sm text-foreground hover:text-primary hover:border-primary border-b-2  transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary hover:border-primary border-b-2  transition-colors"
          >
            Cursos
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary hover:border-primary border-b-2 transition-colors"
          >
            Instructores
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        <div className="flex items-center bg-secondary rounded-lg px-3 py-1.5 ">
          <Search className="w-4 h-4  text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-32"
          />
        </div>
        <Link
          to="/login"
          className="hidden md:inline-block border border-accent text-accent text-sm px-4 py-1.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Log in
        </Link>
        <button
          className="md:hidden text-foreground z-[101]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        <>
          {/* MENU */}
          <div
            className={`fixed top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-nav transform transition-transform duration-300 z-[100] ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 flex flex-col gap-6">
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
                to="/about"
                onClick={() => setIsOpen(false)}
              >
                Instructores
              </Link>
              <Link
                className="text-white text-lg font-medium"
                to="/about"
                onClick={() => setIsOpen(false)}
              >
                Log in
              </Link>
            </div>
          </div>

          {/* OVERLAY */}
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
