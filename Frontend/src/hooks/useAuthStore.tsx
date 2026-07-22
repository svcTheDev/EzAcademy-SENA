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
  const startLogin = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(
        onLogin({
          uid: data.user.uid || data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        }),
      );
    } catch (error) {
      console.error("Error en login:", error);
      // Manejo de error...
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
      const { data } = await api.get("/auth/validation");

      // Renovamos el token con el nuevo que nos da el backend
      localStorage.setItem("token", data.token);

      // Extraemos la propiedad user que envía tu backend
      const userBackend = data.user;

      // Guardamos opcionalmente en localStorage para mayor persistencia
      localStorage.setItem("user", JSON.stringify(userBackend));

      // Logueamos al usuario automáticamente con sus datos reales mapeados
      dispatch(
        onLogin({
          uid: userBackend.uid || userBackend._id,
          name: userBackend.name,
          email: userBackend.email,
          role: userBackend.role, // "instructor"
        }),
      );
    } catch (error) {
      // Si el token expiró o es falso, borramos todo y al login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
