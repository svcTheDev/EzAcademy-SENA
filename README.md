# EzAcademy

EzAcademy es una plataforma web para la gestión de una academia de cursos tecnológicos, desarrollada como proyecto académico para el SENA.

Esta versión corresponde al primer prototipo del proyecto y está enfocada en implementar las funcionalidades básicas de autenticación, gestión de cursos, inscripciones y sesiones de clase.

## Índice

- [Requisitos](#requisitos)
- [Tecnologías](#Tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#Ejecución)
- [Funcionalidades principales](#Funcionalidades-principales)
- [Flujo básico de prueba](#Flujo-básico-de-prueba)
- [API](#API)
- [Estado del proyecto](#Estado-del-proyecto)

## Requisitos

- Node.js
- npm o Bun
- MongoDB local o MongoDB Atlas
- Un navegador web moderno

Las dependencias y versiones utilizadas se encuentran en `Backend/package.json` y `Frontend/package.json`.

## Tecnologías

### Frontend

- React
- TypeScript
- Vite
- Redux Toolkit
- React Query
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT

## Instalación

Desde la raíz del repositorio:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

Si se utiliza Bun, también es posible instalar las dependencias utilizando `bun install`.

## Configuración

### Backend

Crear el archivo `Backend/.env` utilizando `Backend/.env.example` como referencia:

```env
MONGO_URI=mongodb://127.0.0.1:27017/ezacademy
PORT=5000
JWT_SECRET=cambiar-por-un-secreto-largo-y-aleatorio
```

`MONGO_URI` y `JWT_SECRET` son necesarios para ejecutar el backend.

### Frontend

Crear `Frontend/.env` utilizando `Frontend/.env.template` como referencia:

```env
VITE_API_URL=http://localhost:5000/
```

La URL debe corresponder al origen donde se esté ejecutando el backend.

## Ejecución

El frontend y el backend se ejecutan por separado.

### Backend

```bash
cd Backend
npm run dev
```

### Frontend

En otra terminal:

```bash
cd Frontend
npm run dev
```

Vite mostrará la dirección local donde se puede acceder al frontend, normalmente:

`http://localhost:5173`

El backend también dispone de `GET /` como comprobación básica de que el servidor está funcionando.

## Funcionalidades principales

- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Roles de estudiante, instructor y administrador.
- CRUD de cursos.
- Paginación de cursos.
- Inscripción de estudiantes.
- Gestión de sesiones de clase en vivo.
- Control de acceso según el rol del usuario.

## Flujo básico de prueba

Para probar las funcionalidades principales:

1. Registrar un usuario mediante `POST /auth/register`.
2. Iniciar sesión mediante `POST /auth/login` para obtener el JWT.
3. Utilizar el token en la cabecera `x-token` para acceder a los endpoints protegidos.
4. Para probar la gestión de cursos como instructor, asignar el rol correspondiente al usuario directamente en la base de datos.
5. Crear, consultar, actualizar y eliminar cursos.
6. Registrar un estudiante e inscribirlo en un curso.
7. Crear y consultar sesiones de clase utilizando un instructor que tenga acceso al curso.

## API

La API utiliza REST y devuelve respuestas en formato JSON. Para los endpoints protegidos se utiliza la cabecera `x-token`.

| Método   | Ruta                             | Acceso           | Propósito                                     |
| -------- | -------------------------------- | ---------------- | --------------------------------------------- |
| `GET`    | `/`                              | Público          | Comprobar que el servidor está funcionando.   |
| `POST`   | `/auth/register`                 | Público          | Registrar un estudiante.                      |
| `POST`   | `/auth/login`                    | Público          | Iniciar sesión y obtener un JWT.              |
| `GET`    | `/auth/validation`               | JWT              | Validar una sesión existente.                 |
| `GET`    | `/courses?page=1&limit=4`        | Público          | Listar cursos paginados.                      |
| `GET`    | `/courses/:id`                   | JWT              | Consultar un curso.                           |
| `GET`    | `/courses/instructor`            | Instructor/Admin | Consultar los cursos del usuario autenticado. |
| `POST`   | `/courses`                       | Instructor/Admin | Crear un curso.                               |
| `PUT`    | `/courses/:id`                   | Instructor/Admin | Actualizar un curso propio.                   |
| `DELETE` | `/courses/:id`                   | Instructor/Admin | Eliminar un curso propio.                     |
| `POST`   | `/enrollment`                    | Student          | Inscribirse en un curso.                      |
| `GET`    | `/enrollment/me`                 | JWT              | Consultar las inscripciones propias.          |
| `GET`    | `/classSession/course/:courseId` | JWT              | Consultar las sesiones de un curso.           |
| `POST`   | `/classSession`                  | Instructor/Admin | Crear una sesión para un curso propio.        |

## Estado del proyecto

Esta versión es un **prototipo académico funcional** desarrollado para el proyecto del SENA. No debe considerarse una versión preparada para producción.

La retrospectiva del proyecto documenta las decisiones tomadas durante el desarrollo, las limitaciones técnicas identificadas posteriormente y los principales aprendizajes obtenidos durante esta primera versión.

## Documentación

- [Retrospectiva de V1](Docs/retrospective.md)
