import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Registramos la autenticación global
    // Aquí registrarás más adelante otros reducers si los necesitas (ej. cursos)
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false // Evita advertencias molestas con las fechas de Mongo
  })
});