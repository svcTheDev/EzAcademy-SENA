import mongoose, { Schema } from "mongoose";
import { normalizeToJSON } from '../helpers/transformSchema.js';

// example course

// {
//   "title": "Introducción al Desarrollo Web",
//   "description": "Aprende los fundamentos de HTML, CSS y JavaScript para crear sitios web modernos y responsivos.",
//   "price": 49.99,
//   "active": true,
//   "lecture": [
//     "Bienvenida y configuración",
//     "Estructura básica de HTML",
//     "Estilos con CSS",
//     "Interactividad con JavaScript",
//     "Proyecto final"
//   ],
//   "user": [
//     "64b8f3c2d5a4e12f3a9b7c01",
//     "64b8f3c2d5a4e12f3a9b7c02"
//   ]
// }

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: { type: Date, required: true }, // Fecha y hora de la primera clase en vivo
    capacity: { type: Number, required: true }, // Cupos máximos (ej: 30)
    status: {
      type: String,
      required: true,
      enum: ["active", "full", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.method("toJSON", normalizeToJSON('cid')); 


const Course = mongoose.model("Course", courseSchema);

export default Course;
