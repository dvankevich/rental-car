// redux/selectors.js
export const selectCars = state => state.cars.cars;
export const selectTotalCars = state => state.cars.totalCars;
export const selectCarsLoading = state => state.cars.loading;
export const selectCarsError = state => state.cars.error;
export const selectBrands = state => state.cars.brands;
export const selectCurrentPage = state => state.cars.currentPage || 1;
