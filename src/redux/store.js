import { configureStore } from '@reduxjs/toolkit';
import carReducer from './carsSlice.js';

export const store = configureStore({
  reducer: {
    car: carReducer,
  },
});
