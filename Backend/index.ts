import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import cors from "cors";
import { notFoundHandler } from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import { connectDB } from "./database/config.js";
import { ENV } from "./config/env.js";
import courseRoutes from "./routes/course.routes.js";
import authRoutes from "./routes/auth.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js"
import sessionRoutes from "./routes/session.routes.js";

const app = express();
const PORT = ENV.PORT || 5000;

app.use(cors({}));
// MIDDLEWARES
app.use(express.json()); 

// RUTAS
app.use("/courses", courseRoutes);
app.use("/auth", authRoutes);
app.use("/enrollment", enrollmentRoutes);
app.use("/classSession", sessionRoutes)


// Ruta de prueba inicial
app.get("/", (req, res) => {
  res.send(`<div><h1>Bienvenido a EzAcademy API</h1></div>`);
});

// Gloabl Errors
app.use(notFoundHandler);
app.use(globalErrorHandler);


async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo exitosamente en el puerto ${PORT}`);
    });
  } catch (error: string | any) {
    console.error(
      "🔴 Error crítico: No se pudo iniciar el servidor.",
      error.message,
    );
    process.exit(1);
  }
}

startServer();
