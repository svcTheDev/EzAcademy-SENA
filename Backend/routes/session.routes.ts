import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/validateJWT.js';
import { isAdminOrInstructor } from '../middlewares/checkRole.js';
import fieldValidator from '../middlewares/field-validators.js';
import { createSession, getSessionsByCourse } from '../controllers/session.controller.js';

const router = Router();

// Cualquier usuario logueado puede ver el cronograma de un curso
router.get('/course/:courseId', validateJWT, getSessionsByCourse);

// Solo el instructor puede agendar una nueva clase en vivo para su curso
router.post('/', 
  [
    validateJWT,
    isAdminOrInstructor,
    check('courseId', 'El ID del curso es requerido y debe ser válido').isMongoId(),
    check('title', 'El título de la sesión es obligatorio').not().isEmpty(),
    check('date', 'La fecha de la clase en vivo debe ser válida').isISO8601(),
    fieldValidator
  ], 
  createSession
);

export default router;