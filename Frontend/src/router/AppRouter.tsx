import { useAuthStore } from "@/hooks/useAuthStore";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MyCourses from "../pages/MyCourses.tsx";

export default function AppRouter() {
  const { status, checkAuthToken } = useAuthStore();
  const [isCheckingToken, setIsCheckingToken] = useState(true); // 🚀 ESTADO CLAVE

  useEffect(() => {
    const verify = async () => {
      await checkAuthToken();
      setIsCheckingToken(false); // Terminamos de verificar, ya sabemos el estado real
    };
    verify();
  }, []);

  // 🛡️ Mientras se esté comprobando el token en el primer render,
  // NO mostramos rutas para evitar que los Navigates de redirección se disparen antes de tiempo.
  if (isCheckingToken || status === "checking") {
    return (
      <div className="h-screen w-screen flex items-center justify-center font-bold text-lg bg-background text-foreground">
        Validando credenciales en EzAcademy...
      </div>
    );
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      ) : (
        <Route>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Index />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      )}
    </Routes>
  );
}
