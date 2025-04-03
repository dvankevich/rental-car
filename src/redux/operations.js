import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
    "cars/fetch",
    async (body = {}, thunkAPI) => {
        try {
            const { data } = await axios.get(`/cars`, {
                params: { 
                    ...body // Передаємо всі параметри, які можуть бути у body
                }
            });
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchBrands = createAsyncThunk("brands/fetch", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`/brands`);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

// dispatch(fetchBrands());