# EzAcademy V1 — Retrospectiva

## Índice

- [1. Contexto — ¿Por qué nació EzAcademy?](#1-contexto--por-qué-nació-ezacademy)
- [2. Objetivo — ¿Qué intentaba conseguir con V1?](#2-objetivo--qué-intentaba-conseguir-con-v1)
- [3. Propósito y alcance](#3-propósito-y-alcance)
- [4. Arquitectura actual](#4-arquitectura-actual)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Persistencia de autenticación](#persistencia-de-autenticación)
- [5. Tecnologías utilizadas](#5-tecnologías-utilizadas)
  - [Frontend](#frontend-1)
  - [Backend](#backend-1)
- [6. Estado actual](#6-estado-actual)
- [7. Deuda técnica y limitaciones](#7-deuda-técnica-y-limitaciones)
  - [Frontend y API](#frontend-y-api)
  - [Backend](#backend-2)
  - [Seguridad](#seguridad)
  - [Integridad de datos](#integridad-de-datos)
  - [Pruebas y despliegue](#pruebas-y-despliegue)
- [8. Lecciones aprendidas](#8-lecciones-aprendidas)
  - [8.1 Una aplicación funcional no necesariamente está preparada para producción](#81-una-aplicación-funcional-no-necesariamente-está-preparada-para-producción)
  - [8.2 Separar frontend y backend requiere contratos claros](#82-separar-frontend-y-backend-requiere-contratos-claros)
  - [8.3 La arquitectura también implica distribuir responsabilidades](#83-la-arquitectura-también-implica-distribuir-responsabilidades)
  - [8.4 La seguridad no consiste únicamente en implementar autenticación](#84-la-seguridad-no-consiste-únicamente-en-implementar-autenticación)
  - [8.5 Las pruebas no deberían limitarse a comprobar manualmente que algo funciona](#85-las-pruebas-no-deberían-limitarse-a-comprobar-manualmente-que-algo-funciona)
  - [8.6 El alcance de un proyecto puede cambiar](#86-el-alcance-de-un-proyecto-puede-cambiar)
  - [8.7 Construir una solución no significa haber validado un producto](#87-construir-una-solución-no-significa-haber-validado-un-producto)

## 1. Contexto — ¿Por qué nació EzAcademy?

EzAcademy nació inicialmente como un proyecto académico para el SENA, a partir de la experiencia que tuve durante una pasantía en una academia de cursos tecnológicos para mi formación como Técnico en Diseño e Integración de Multimedia.

Durante esta experiencia pude observar que algunos procesos de gestión de la academia se realizaban mediante diferentes herramientas, entre ellas un CRM antiguo, archivos de Excel, bases de datos Access y documentación física. A partir de esto planteé la idea de desarrollar una plataforma web que permitiera modernizar y centralizar parte de esta información.

La propuesta inicial buscaba mejorar la organización de la información de los cursos y estudiantes, centralizar algunos procesos administrativos y facilitar el acceso a la información mediante una plataforma web.

Sin embargo, durante el desarrollo el alcance fue cambiando. En lugar de intentar implementar todos los procesos planteados inicialmente, terminé enfocándome en construir un prototipo funcional de una plataforma educativa.

---

## 2. Objetivo — ¿Qué intentaba conseguir con V1?

Mi objetivo con la primera versión fue desarrollar un prototipo funcional de una plataforma web para una academia de cursos tecnológicos y aplicar los conocimientos adquiridos durante mi formación.

La formulación inicial del proyecto contemplaba objetivos más amplios, como la gestión de estudiantes, facturación y administración general. Sin embargo, estos objetivos no llegaron a implementarse completamente.

Durante el desarrollo decidí concentrarme en construir las bases de una plataforma educativa, especialmente en la gestión de usuarios, cursos, inscripciones y clases en vivo.

Por esta razón, considero V1 como una primera aproximación técnica al problema y no como la implementación completa de la solución planteada originalmente.

---

## 3. Propósito y alcance

Para V1 definí un modelo orientado principalmente a cursos en vivo. Los cursos cuentan con información básica, cupos y sesiones asociadas con una fecha y un enlace para la reunión.

El alcance que finalmente implementé fue:

- Registro e inicio de sesión de usuarios.
- Manejo de roles de estudiante, instructor y administrador.
- CRUD de cursos.
- Listado paginado de cursos.
- Inscripción de estudiantes a cursos.
- Creación y consulta de sesiones en vivo.
- Control de acceso a determinadas operaciones según el rol del usuario.

También dejé fuera varias funcionalidades que aparecían en la formulación inicial o que podrían formar parte de una plataforma más completa, como pagos, contenido bajo demanda, recuperación de contraseña, notificaciones, analítica y una administración integral de la academia.

Estas exclusiones fueron resultado del alcance que finalmente pude desarrollar dentro del proyecto académico.

---

## 4. Arquitectura actual

Para V1 decidí separar la aplicación en un frontend y un backend independientes.

```text
Frontend (React + Vite)
          |
       Axios
          |
       x-token
          |
Backend (Express REST)
          |
       Mongoose
          |
       MongoDB
```

### Backend

Construí el backend utilizando Node.js, Express y TypeScript. Organicé las rutas principalmente por dominio y utilicé Mongoose para trabajar con MongoDB.

Implementé una API REST para manejar la autenticación, usuarios, cursos, inscripciones y sesiones.

### Frontend

Construí el frontend como una SPA utilizando React, Vite y TypeScript. Utilicé React Router para la navegación, Redux Toolkit para manejar el estado relacionado con la autenticación y hooks locales para trabajar con información como cursos e inscripciones.

Para las peticiones al backend utilicé Axios.

### Persistencia de autenticación

Implementé la autenticación utilizando JWT. El frontend almacena actualmente el token en `localStorage` y lo envía al backend mediante el header `x-token`.

Cada aplicación se instala y ejecuta por separado; no implementé un workspace monorepo para esta versión.

---

## 5. Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- Redux Toolkit
- React Query
- React Router
- Axios
- Tailwind CSS
- Radix/shadcn

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT

---

## 6. Estado actual

Considero que V1 cumple su propósito como proyecto académico. Probé la aplicación y puedo demostrar las funcionalidades principales que desarrollé para esta versión.

Sin embargo, no considero que esta versión esté preparada para utilizarse como un SaaS en producción. Durante una revisión técnica posterior identifiqué diferentes problemas relacionados con seguridad, validación, manejo de errores, consistencia entre frontend y backend, pruebas automatizadas, integridad de datos y despliegue.

Por lo tanto, cierro esta versión como un **prototipo académico funcional**, no como un producto listo para usuarios reales.

Mi intención tampoco es continuar desarrollando V1 hasta convertirla en una aplicación production-ready. Las limitaciones encontradas quedan registradas como parte de la retrospectiva y como aprendizaje para futuras versiones.

---

## 7. Deuda técnica y limitaciones

Al revisar V1 posteriormente, pude identificar varios problemas que durante el desarrollo inicial no había considerado o no había identificado con claridad.

### Frontend y API

Encontré algunas inconsistencias entre los contratos utilizados por el frontend y las respuestas proporcionadas por el backend. También identifiqué cierta duplicación de estado y responsabilidades en el frontend.

Algunas responsabilidades de componentes, servicios y controladores podrían estar mejor separadas para facilitar el mantenimiento.

### Backend

Encontré validaciones que podrían ser más completas y consistentes. El manejo de errores también podría estandarizarse para que la API proporcione respuestas más uniformes.

Además, algunas responsabilidades están demasiado concentradas en determinados controladores.

### Seguridad

Aunque implementé autenticación mediante JWT y autorización basada en roles, la revisión posterior me permitió identificar varios aspectos que deberían reforzarse antes de utilizar el sistema en producción.

Actualmente el token se almacena en `localStorage`, la configuración de CORS es demasiado permisiva y no implementé mecanismos como rate limiting o Helmet.

También identifiqué que algunos controles de autorización podrían ser más robustos.

### Integridad de datos

Algunos procesos, como las inscripciones, podrían presentar problemas de concurrencia o integridad bajo determinadas condiciones. Esto no fue contemplado suficientemente durante la implementación inicial.

### Pruebas y despliegue

V1 no cuenta con una estrategia de pruebas automatizadas suficientemente desarrollada. La mayor parte de la comprobación de las funcionalidades se realizó manualmente.

Tampoco desarrollé de forma completa la configuración operativa y el despliegue necesarios para considerar la aplicación preparada para usuarios reales.

Estas observaciones representan la deuda técnica y las limitaciones conocidas de V1. No las considero automáticamente tareas pendientes de esta versión, sino información que puedo utilizar para tomar mejores decisiones en futuras iteraciones.

---

## 8. Lecciones aprendidas

### 8.1 Una aplicación funcional no necesariamente está preparada para producción

Durante el desarrollo asociaba en mayor medida el concepto de "terminado" con conseguir que las funcionalidades funcionaran.

Al revisar el proyecto posteriormente entendí mejor que una aplicación funcional también necesita considerar aspectos como seguridad, validación, pruebas, manejo de errores, mantenibilidad y operación antes de poder utilizarse en producción.

### 8.2 Separar frontend y backend requiere contratos claros

Al trabajar con un frontend y un backend independientes aprendí que no basta con que ambas partes funcionen por separado. También es necesario mantener consistentes los contratos de comunicación entre ellas.

Los problemas encontrados posteriormente me permitieron entender mejor la importancia de definir claramente las estructuras de datos, respuestas y errores de una API.

### 8.3 La arquitectura también implica distribuir responsabilidades

V1 funciona aunque algunas responsabilidades estén concentradas en determinados componentes y controladores.

Sin embargo, al revisar el código posteriormente pude identificar partes que serían más fáciles de mantener si las responsabilidades estuvieran mejor separadas.

Esto me permitió comprender que una arquitectura no consiste únicamente en decidir qué tecnologías utilizar, sino también en decidir cómo distribuir las responsabilidades dentro del sistema.

### 8.4 La seguridad no consiste únicamente en implementar autenticación

Implementar JWT y roles me permitió construir un sistema básico de autenticación y autorización.

Posteriormente entendí que esto representa solamente una parte de la seguridad de una aplicación. Al revisar aspectos como el almacenamiento de tokens, CORS, validación y protección de endpoints, pude identificar requisitos que no había considerado durante el desarrollo inicial.

### 8.5 Las pruebas no deberían limitarse a comprobar manualmente que algo funciona

En V1 me concentré principalmente en implementar las funcionalidades y comprobar manualmente que funcionaran.

Al revisar posteriormente el proyecto entendí que esto no es suficiente para garantizar que el sistema continúe funcionando correctamente a medida que se modifica. Esto me mostró la importancia de incorporar una estrategia de pruebas al proceso de desarrollo.

### 8.6 El alcance de un proyecto puede cambiar

La formulación inicial de EzAcademy contemplaba objetivos más amplios, incluyendo gestión de estudiantes, facturación y administración general.

Durante el desarrollo terminé concentrándome en una parte mucho más específica de la plataforma. Esto me permitió experimentar de primera mano cómo un proyecto puede cambiar de alcance mientras se desarrolla y la importancia de reconocer qué se está construyendo realmente.

### 8.7 Construir una solución no significa haber validado un producto

Esta es probablemente la principal reflexión que me llevo de V1.

Comencé el proyecto principalmente desde una idea de solución: construir una plataforma web para una academia. Durante el desarrollo me concentré en decidir qué funcionalidades implementar y cómo construirlas.

Sin embargo, con la perspectiva que tengo ahora entiendo que desarrollar una solución no demuestra que esa solución responda necesariamente a los problemas más importantes de los usuarios.

Esto cambia la forma en que quiero abordar la siguiente versión de EzAcademy. Antes de comenzar nuevamente a desarrollar funcionalidades, quiero investigar las necesidades y problemas reales de las pequeñas academias tecnológicas y utilizar esa información para determinar qué vale la pena construir.

Este será el punto de partida de la siguiente etapa del proyecto: **Product Discovery**.
