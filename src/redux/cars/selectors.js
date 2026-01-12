// src/redux/cars/selectors.js
export const selectBrands = (state) => state.cars.brands;
export const selectCars = (state) => state.cars.cars;
export const selectFavorites = (state) => state.cars.favorites;
export const selectSelectedCar = (state) => state.cars.selectedCar;
export const selectFilters = (state) => state.cars.filters;
export const selectCurrentPage = (state) => state.cars.currentPage;
export const selectTotalPages = (state) => state.cars.totalPages;
export const selectPageSize = (state) => state.cars.pageSize;
export const selectLoading = (state) => state.cars.loading;
export const selectError = (state) => state.cars.error;
