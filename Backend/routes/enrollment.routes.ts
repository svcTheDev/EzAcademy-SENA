import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/validateJWT.js';
import { isStudent } from '../middlewares/checkRole.js';
import fieldValidator from '../middlewares/field-validators.js';
import { createEnrollment, getEnrollmentsByUser } from '../controllers/enrollment.controller.js';

const router = Router();

router.use(validateJWT); // Todas las inscripciones requieren estar logueado

// Inscribirse a un curso (Solo Estudiantes)
router.post('/', 
  [
    isStudent,
    check('courseId', 'El ID del curso es obligatorio y válido').isMongoId(),
    fieldValidator
  ], 
  createEnrollment
);

// Ver los cursos de un estudiante específico
router.get('/user/:id', getEnrollmentsByUser);

export default router;