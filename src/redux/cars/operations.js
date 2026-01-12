// src/redux/cars/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://car-rental-api.goit.global";

export const getBrands = createAsyncThunk(
    "cars/getBrands",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/brands`, {
                headers: { Accept: "application/json" },
            });
            return response.data; // Масив брендів
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getCars = createAsyncThunk(
    "cars/getCars",
    async (
        {
            brand = "",
            maxPrice = "",
            minMileage = "",
            maxMileage = "",
            page = 1,
            limit = 8,
        } = {},
        { rejectWithValue }
    ) => {
        try {
            const params = { page, limit };
            if (brand) params.brand = brand;
            if (maxPrice) params.maxPrice = maxPrice;
            if (minMileage) params.minMileage = minMileage;
            if (maxMileage) params.maxMileage = maxMileage;

            const response = await axios.get(`${BASE_URL}/cars`, {
                params,
                headers: { Accept: "application/json" },
            });
            return response.data; // { cars, totalCars, page, totalPages }
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getCarById = createAsyncThunk(
    "cars/getCarById",
    async (carId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/cars/${carId}`, {
                headers: { Accept: "application/json" },
            });
            return response.data; // Об'єкт автомобіля
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
