import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cars: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  limit: 5, // Задаємо початкове значення limit тут (наприклад, 10)
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ page = 1, brand, rentalPrice, minMileage, maxMileage, reset }, { getState }) => {
    // Отримуємо значення limit з початкового стану
    const currentLimit = getState().cars.limit;

    const response = await axios.get('https://car-rental-api.goit.global/cars', {
      params: { page, limit: currentLimit, brand, rentalPrice, minMileage, maxMileage },
    });
    return { ...response.data, reset }; // Передаємо ознаку reset у payload
  }
);

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    resetCars: (state) => {
      state.cars = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;

        const existingCarIds = new Set(state.cars.map(car => car.id));
        const newCars = action.payload.cars.filter(car => !existingCarIds.has(car.id));

        if (action.payload.reset) {
          state.cars = newCars;
        } else {
          state.cars = [...state.cars, ...newCars];
        }

        state.totalPages = action.payload.totalPages;
        state.page = state.page;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCars } = carSlice.actions;
export default carSlice.reducer;