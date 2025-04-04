import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  'cars/fetch',
  async (filters, thunkAPI) => {
    try {
      const {
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
        limit,
        page = 1, // За замовчуванням сторінка 1, якщо не передано
      } = filters;

      const params = {
        page,
        ...(brand && { brand }),
        ...(rentalPrice && { rentalPrice }),
        ...(minMileage && { minMileage }),
        ...(maxMileage && { maxMileage }),
        ...(limit && { limit }),
      };

      const { data } = await axios.get('/cars', {
        params,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  'brands/fetch',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/brands`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
