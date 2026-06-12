import mongoose, { get } from "mongoose";
mongoose.set('bufferCommands', false);

export const connectDB = async () => {
  const URI = process.env.MONGO_URI;
  try {
    console.log("🔌 Conectando a la base de datos...");


    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Conectado a la base de datos EzAcademy");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    throw error;
  }
};

export default mongoose;
