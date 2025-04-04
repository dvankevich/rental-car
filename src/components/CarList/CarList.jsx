import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/operations';
import {
  selectCars,
  selectTotalCars,
  selectCarsLoading,
  selectCarsError,
  selectCurrentPage, // Імпортуємо селектор поточної сторінки
} from '../../redux/selectors';
import { incrementPage } from '../../redux/carSlice'; // Імпортуємо екшен для збільшення сторінки

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const totalCars = useSelector(selectTotalCars);
  const loading = useSelector(selectCarsLoading);
  const error = useSelector(selectCarsError);
  const filters = useSelector(state => state.cars.filters); // Приклад, скоригуйте відповідно
  const currentPage = useSelector(selectCurrentPage); // Отримуємо номер поточної сторінки зі стану

  useEffect(() => {
    dispatch(fetchCars({ ...filters, page: currentPage }));
  }, [dispatch, filters, currentPage]);

  const handleLoadMore = () => {
    dispatch(incrementPage()); // Відправляємо екшен для збільшення сторінки
  };

  if (loading) {
    return <p>Loading cars...</p>;
  }

  if (error) {
    return <p>Error loading cars: {error}</p>;
  }

  return (
    <div>
      <h2>Available Cars</h2>
      {cars.length > 0 ? (
        <ul>
          {cars.map(car => (
            <li key={car.id}>
              <h3>{`${car.brand} ${car.model} (${car.year})`}</h3>
              <img
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                style={{ maxWidth: '300px', height: 'auto' }}
              />
              <p>{car.description?.substring(0, 100)}...</p>
              <p>Rental Price: {car.rentalPrice}$ per day</p>
              <p>Mileage: {car.mileage} km</p>
              {/* Додайте іншу необхідну інформацію про автомобіль */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cars found matching your criteria.</p>
      )}

      {cars.length > 0 && cars.length < totalCars && !loading && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default CarList;
