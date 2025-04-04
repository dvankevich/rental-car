import React, { useEffect, useState, useRef } from 'react'; // Додали useRef
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, resetCars } from '../../redux/carSlice';
import FilterForm from '../../components/FilterForm/FilterForm';

const CarList = () => {
  const dispatch = useDispatch();
  const { cars, loading, error, page, totalPages } = useSelector(
    state => state.cars
  );

  const [filters, setFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  });

  const initialFilters = useRef(filters); // Зберігаємо початкові фільтри

  // Завантаження автомобілів при першому завантаженні компонента
  useEffect(() => {
    dispatch(fetchCars({ page: 1, ...filters, reset: true }));
  }, [dispatch]);

  // Виклик для завантаження автомобілів при змінах фільтрів (після початкових)
  useEffect(() => {
    // Порівнюємо поточні фільтри з початковими
    if (JSON.stringify(filters) !== JSON.stringify(initialFilters.current)) {
      //dispatch(resetCars());
      dispatch(fetchCars({ page: 1, ...filters, reset: true }));
    }
  }, [dispatch, filters]);

  const loadMoreCars = () => {
    dispatch(fetchCars({ page: page + 1 }));
  };

  const handleFilterChange = newFilters => {
    setFilters(newFilters);
  };

  return (
    <div>
      <h1>Car Rentals</h1>
      {/* <FilterForm
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={() =>
          dispatch(fetchCars({ page: 1, ...filters, reset: true }))
        }
      /> */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            <h2>{`${car.brand} ${car.model}`}</h2>
            <p>{car.description}</p>
            <img src={car.img} alt={`${car.brand} ${car.model}`} />
          </li>
        ))}
      </ul>
      {page < totalPages && !loading && (
        <button onClick={loadMoreCars}>Load More</button>
      )}
    </div>
  );
};

export default CarList;
