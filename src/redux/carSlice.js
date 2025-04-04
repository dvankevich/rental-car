import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchBrands } from './operations'; // Імпортуємо наші асинхронні операції

const initialState = {
  cars: [],
  brands: [],
  totalCars: 0,
  loading: false,
  error: null,
};

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    clearCars: state => {
      state.cars = [];
      state.totalCars = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Обробка fetchCars
    builder
      .addCase(fetchCars.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.cars;
        state.totalCars = action.payload.totalCars;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cars = [];
        state.totalCars = 0;
      });

    // Обробка fetchBrands
    builder
      .addCase(fetchBrands.pending, state => {
        state.loading = true;
        state.error = null;
        state.brands = []; // Очищаємо попередні бренди під час нового запиту
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.brands = [];
      });
  },
});

export const { clearCars } = carSlice.actions;
export default carSlice.reducer;
