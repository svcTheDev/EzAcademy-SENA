import axios from "axios";

// Creamos una instancia centralizada de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-token"] = token;
  }
  return config;
});

export const getCourses = async () => {
  try {
    const { data } = await api.get("/courses");
    return data; // Esto retorna el objeto { ok: true, count: X, courses: [...] }
  } catch (error) {
    console.error("Error en getCourses API call:", error);
    throw error;
  }
};

// 1. Crear una inscripción (POST /enrollment)
export const enrollInCourse = async (courseId: string) => {
  const { data } = await api.post('/enrollment', { courseId });
  return data; // Devuelve algo como { ok: true, enrollment: {...} }
};

// 2. Obtener mis cursos inscritos (GET /enrollment/me)
export const getMyEnrollments = async () => {
  const { data } = await api.get('/enrollment/me');
  return data; // Devuelve { ok: true, count: X, enrollments: [...] }
};

export default api;
