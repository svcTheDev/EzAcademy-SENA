import dotenv from 'dotenv';
dotenv.config(); // Lee el archivo .env de la raíz

// Validación de seguridad para que el backend no arranque si falta el secreto de los tokens
if (!process.env.JWT_SECRET) {
  throw new Error('⚠️ ¡Falta la variable de entorno JWT_SECRET en el archivo .env!');
}

if (!process.env.MONGO_URI) {
  throw new Error('⚠️ ¡Falta la variable de entorno MONGO_URI en el archivo .env!');
}

export const ENV = {
  PORT: process.env.PORT || '5000',
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET
};