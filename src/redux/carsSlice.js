import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchBrands } from './operations.js';

const carSlice = createSlice({
  name: 'car',
  initialState: {
    cars: [],
    brands: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalCars: 0,
    itemsPerPage: 3,
  },
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBrands.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCars.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = [...state.cars, ...action.payload.cars];
        // state.totalCars = action.payload.totalCars;
        // state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = carSlice.actions;
export default carSlice.reducer;
