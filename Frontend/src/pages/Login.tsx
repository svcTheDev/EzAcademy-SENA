import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { useToast } from "@/components/ui/use-toast"; // Ajusta la ruta a tus notificaciones de Shadcn/IA
import "@/login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Consumimos las utilidades del store real
  const { startLogin, errorMessage, status } = useAuthStore();
  const { toast } = useToast();

  // Escuchamos si hay errores devueltos por el backend
  useEffect(() => {
    if (errorMessage !== undefined) {
      toast({
        variant: "destructive",
        title: "Error de Autenticación",
        description: errorMessage,
      });
    }
  }, [errorMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") return;

    // Disparamos la autenticación real hacia Node
    startLogin({ email, password });
  };

  return (
    <div className="login-page">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="control block-cube block-input">
          <input
            name="username"
            type="text"
            placeholder="Dirección de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>

        <div className="control block-cube block-input">
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>

        <button
          className="btn block-cube block-cube-hover"
          type="submit"
          disabled={status === "checking"}
        >
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
          <div className="text">Iniciar sesión</div>
          {status === "checking" ? "Validando..." : "Ingresar"}
        </button>

        {/* <button
          type="submit"
          disabled={status === "checking"}
          className="w-full bg-primary text-white p-2 rounded"
        >
        </button> */}

        <div className="credits">
          <Link to="/">Volver al inicio</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
