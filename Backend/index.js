const express = require('express');
const app = express();
const Course = require('./models/Course'); // Importamos el modelo
import './database.js';

// Middleware para entender JSON
app.use(express.json());

// --- RUTAS PARA COURSES ---

// 1. OBTENER TODOS LOS CURSOS (GET)
app.get('/api/courses', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// 2. CREAR UN NUEVO CURSO (POST)
app.post('/api/courses', async (req, res) => {
    const { titulo, precio, lecciones } = req.body;
    const nuevoCurso = new Course({ titulo, precio, lecciones });
    await nuevoCurso.save();
    res.json({ status: 'Curso guardado exitosamente' });
});

// 3. EDITAR UN CURSO (PUT)
app.put('/api/courses/:id', async (req, res) => {
    await Course.findByIdAndUpdate(req.params.id, req.body);
    res.json({ status: 'Curso actualizado' });
});

// 4. ELIMINAR UN CURSO (DELETE)
app.delete('/api/courses/:id', async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ status: 'Curso eliminado' });
});

app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en el puerto 3000');
});