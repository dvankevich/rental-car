// src/redux/cars/slice.js
import { createSlice } from "@reduxjs/toolkit";
import { getBrands, getCars, getCarById } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    brands: [], // Список брендів з API
    cars: [], // Пагінований список (appended при load more)
    favorites: [], // Улюблені (локально)
    selectedCar: null,
    filters: {
      // Поточні фільтри для повторного використання
      brand: "",
      maxPrice: "",
      minMileage: null,
      maxMileage: null,
    },
    currentPage: 1,
    totalPages: 1,
    pageSize: 8,
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.cars = []; // Скинути список при нових фільтрах
      state.currentPage = 1; // Почати з page 1
      state.totalPages = 1;
    },
    addToFavorites: (state, action) => {
      if (!state.favorites.find((c) => c.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((c) => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // getBrands
    builder
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // getCars
    builder
      .addCase(getCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading = false;
        const newCars = action.payload.cars.filter(
          (newCar) =>
            !state.cars.some((existingCar) => existingCar.id === newCar.id)
        ); // Додаємо тільки унікальні
        state.cars = [...state.cars, ...newCars];
        state.totalPages = action.payload.totalPages;
        state.currentPage = parseInt(action.payload.page, 10);
      })
      .addCase(getCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // getCarById
    builder
      .addCase(getCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCar = action.payload;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, addToFavorites, removeFromFavorites } =
  carsSlice.actions;
export const carsReducer = carsSlice.reducer;
