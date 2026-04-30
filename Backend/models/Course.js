import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  activo: {
    type: Boolean,
    default: true,
  },
  lecciones: [
    {
      type: String,
    },
  ],
}, {
  timestamps: true,
});

const Course = mongoose.model("Course", courseSchema);

export default Course;