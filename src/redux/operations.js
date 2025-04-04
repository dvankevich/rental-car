import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  'cars/fetch',
  async ({ page = 1 }, thunkAPI) => {
    try {
      const { data } = await axios.get('/cars', {
        params: {
          page,
        },
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
