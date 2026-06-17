import dotenv from "dotenv";
dotenv.config(); // Siempre debe ir arriba del todo

import express from "express";
import cors from "cors";
import { connectDB } from "./database/config.js";
import { ENV } from './config/env.js';
import courseRoutes from "./routes/course.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = ENV.PORT || 5000; 

app.use(cors({}))
// // --- MIDDLEWARES ---
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
  } catch (error : string | any) {
    console.error(
      "🔴 Error crítico: No se pudo iniciar el servidor.",
      error.message,
    );
    process.exit(1); // Cierra el proceso de Node de forma limpia debido al fallo
  }
}

startServer();
