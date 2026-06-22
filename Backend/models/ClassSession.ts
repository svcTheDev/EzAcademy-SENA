import { Schema, model } from 'mongoose';
import { normalizeToJSON } from '../helpers/transformSchema.js';

const classSessionSchema = new Schema({
  course: { 
    type: Schema.Types.ObjectId, 
    ref: 'Course', // 🔗 A qué curso pertenece esta clase en vivo
    required: true 
  },
  title: { 
    type: String, 
    required: true // Ej: "Clase 1: Introducción a los React Hooks"
  },
  description: { 
    type: String 
  },
  date: { 
    type: Date, 
    required: true // Fecha y hora específica de ESTA clase
  },
  meetingLink: { 
    type: String, 
    required: true,
    default: "https://meet.google.com/abc-defg-hij" // Un link simulado para la sustentación
  }
}, {
  timestamps: true,
});

classSessionSchema.method("toJSON", normalizeToJSON('cid')); 

const ClassSession = model('ClassSession', classSessionSchema);
export default ClassSession;