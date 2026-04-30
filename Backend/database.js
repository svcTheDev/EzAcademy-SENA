import mongoose, { get } from "mongoose";

// Tu cadena de conexión de Atlas (la que usas en Compass)
const URI =
  "mongodb+srv://sergiosubs23_db_user:B9Vu5N5VCX1n37HP@cluster0.iduqrir.mongodb.net/ezacademy";

export const connectDB = async () => {
  try {
    console.log("🔌 Conectando a la base de datos...");
    await mongoose.connect(URI, {
      dbName: "ezacademy",
    });
    console.log("✅ Conectado a la base de datos EzAcademy");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    throw error;
  }
};

export default mongoose;
