import { Schema, model } from 'mongoose';
import { normalizeToJSON } from '../helpers/transformSchema.js';


const enrollmentSchema = new Schema({
  student: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // 🔗 Quién se inscribe
    required: true 
  },
  course: { 
    type: Schema.Types.ObjectId, 
    ref: 'Course', // 🔗 A qué curso se inscribe
    required: true 
  },
  enrollmentDate: { 
    type: Date, 
    default: Date.now // Se guarda la fecha exacta del clic
  }
}, {
  timestamps: true,
  autoIndex: true
});

enrollmentSchema.method("toJSON", normalizeToJSON('eid')); 

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const Enrollment = model('Enrollment', enrollmentSchema);
export default Enrollment;