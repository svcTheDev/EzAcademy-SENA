import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // 'checking', 'authenticated', 'not-authenticated'
    user: {},           // Aquí guardaremos { uid, name, email, role }
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload; // Guardamos los datos que vienen del backend
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = payload; // Por si queremos mostrar un mensaje de error
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    }
  }
});

// Exportamos las acciones para poder usarlas desde los componentes
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;