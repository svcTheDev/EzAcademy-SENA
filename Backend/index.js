import dotenv from "dotenv";
dotenv.config(); // Siempre debe ir arriba del todo

import express from "express";
import cors from "cors";
import { connectDB } from "./database.js";
import courseRoutes from "./routes/course.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto del .env o el 3000 por defecto

// // --- MIDDLEWARES ---
// app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json()); // 🔥 ¡Faltaba esto! Si no lo pones, tus POST/PUT recibirán req.body vacío.

// --- RUTAS ---
app.use("/courses", courseRoutes);
app.use("/auth", authRoutes);

// Ruta de prueba inicial
app.get("/", (req, res) => {
  res.send(`<div><h1>Bienvenido a EzAcademy API</h1></div>`);
});

// --- ARRANQUE CONTROLADO ---
async function startServer() {
  try {
    // 1. Esperamos a Mongo. Si falla, el catch lo atrapa de inmediato (sin esperar 10s)
    await connectDB();

    // 2. Solo si hay BD, escuchamos peticiones
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo exitosamente en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(
      "🔴 Error crítico: No se pudo iniciar el servidor.",
      error.message,
    );
    process.exit(1); // Cierra el proceso de Node de forma limpia debido al fallo
  }
}

startServer();
