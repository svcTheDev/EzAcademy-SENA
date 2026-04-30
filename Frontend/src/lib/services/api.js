const BASE_URL = "http://localhost:3000";

// 🔹 Obtener todos los cursos
export const getCourses = async () => {
  try {
    console.log("Haciendo fetch...");
    const response = await fetch(`${BASE_URL}/courses`);
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("Error al obtener cursos");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("API ERROR:", error);
    return [];
  }
};