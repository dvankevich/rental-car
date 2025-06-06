import { configureStore } from '@reduxjs/toolkit';
import carReducer from './carSlice';

export const store = configureStore({
  reducer: {
    cars: carReducer,
    // ... інші ред'юсери
  },
});
