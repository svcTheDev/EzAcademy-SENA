import { useDispatch, useSelector } from "react-redux";
import api from "../lib/services/api";
import {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
} from "../store/auth/authSlice";
import axios from "axios";

export const useAuthStore = () => {
  // Extraemos las variables del authSlice desde Redux
  const { status, user, errorMessage } = useSelector(
    (state: any) => state.auth,
  );
  const dispatch = useDispatch();

  // Función para iniciar sesión
  const startLogin = async ({ email, password }: any) => {
    dispatch(onChecking());

    try {
      // 1. Hacemos la petición real a tu backend
      const { data } = await api.post("/auth/login", { email, password });

      // 2. Guardamos el JWT real en el localStorage para mantener la sesión
      localStorage.setItem("token", data.token);

      // 3. Despachamos al State Global de Redux el usuario con su rol real
      dispatch(
        onLogin({
          uid: data.user?.uid || data.uid,
          name: data.user?.name || data.name || data.user?.nombre, // 👈 Mapeo seguro
          email: data.user?.email || data.email,
          role: data.user?.role || data.role,
        }),
      );
    } catch (error: any) {
      // 🚀 Imprime la respuesta exacta del backend en la consola
      console.log("Cuerpo del error del backend:", error.response?.data);

      const msg = error.response?.data?.message || "Credenciales incorrectas";
      dispatch(onLogout(msg));
      // ...

      // Limpiamos el mensaje de error después de unos segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 4000);
    }
  };

  // Función para cerrar sesión
  const startLogout = () => {
    localStorage.removeItem("token");
    dispatch(onLogout(undefined));
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    // Si no hay token en el localStorage, de inmediato limpiamos y exigimos login
    if (!token) return dispatch(onLogout(undefined));

    try {
      // Tu backend debe tener una ruta tipo GET /auth/renew o /auth/check
      // que use el middleware validateJWT y devuelva los datos frescos del usuario
      const { data } = await api.get("/auth/validation");

      // Renovamos el token con el nuevo que nos da el backend
      localStorage.setItem("token", data.token);

      // Logueamos al usuario automáticamente con sus datos reales
      dispatch(
        onLogin({
          uid: data.uid,
          name: data.name,
          email: data.email,
          role: data.role,
        }),
      );
    } catch (error) {
      // Si el token expiró o es falso, borramos todo y al login
      localStorage.removeItem("token");
      dispatch(onLogout(undefined));
    }
  };

  //   const checkAuthToken = async () => {
  //   const token = localStorage.getItem('token');

  //   // Si no hay token, el usuario no está logueado
  //   if (!token) return dispatch(onLogout(undefined));

  //   // 🚀 TRUCO TEMPORAL: Si hay un token, asumimos que es válido
  //   // para que no te borre la sesión al presionar F5 o escribir la URL
  //   dispatch(onLogin({
  //     uid: 'temporal-id',
  //     name: 'Estudiante EzAcademy',
  //     email: 'test@ezacademy.com',
  //     role: 'STUDENT_ROLE'
  //   }));
  // };

  return {
    //* Propiedades
    status,
    user,
    errorMessage,

    //* Métodos
    startLogin,
    startLogout,
    checkAuthToken,
  };
};
