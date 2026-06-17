import mongoose, { Schema } from "mongoose";

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

const courseSchema = new mongoose.Schema({
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
  active: {
    type: Boolean,
    default: true,
  },
  lecture: [
    {
      type: String,
    },
  ],
  user: 
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
});

courseSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject() as any;

  object.uid = _id.toString();

  return object;
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
