import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
  loading: false,
  error: null,
};

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: state => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.cars = [];
    },
    clearCars: state => {
      state.cars = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setCars, setLoading, setError, clearCars } = carSlice.actions;
export default carSlice.reducer;
