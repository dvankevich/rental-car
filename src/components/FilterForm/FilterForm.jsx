import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/operations';
import { clearCars } from '../../redux/carSlice';
import { selectBrands, selectCarsLoading } from '../../redux/selectors';

const FilterForm = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const loading = useSelector(selectCarsLoading);

  const [brand, setBrand] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [limit, setLimit] = useState(5); // Початкове значення ліміту

  useEffect(() => {
    // Завантажуємо список брендів при монтуванні компонента
    dispatch({ type: 'brands/fetch/pending' }); // Викликаємо вручну pending стан
    fetch('https://car-rental-api.goit.global/brands')
      .then(response => response.json())
      .then(data => dispatch({ type: 'brands/fetch/fulfilled', payload: data }))
      .catch(error =>
        dispatch({ type: 'brands/fetch/rejected', payload: error.message })
      );
  }, [dispatch]);

  const handleFilterSubmit = e => {
    e.preventDefault();
    dispatch(clearCars()); // Очищаємо попередні результати перед новим запитом
    dispatch(
      fetchCars({
        brand,
        rentalPrice,
        minMileage: minMileage !== '' ? parseInt(minMileage) : undefined,
        maxMileage: maxMileage !== '' ? parseInt(maxMileage) : undefined,
        limit: limit !== '' ? parseInt(limit) : undefined,
        page: 1, // Завжди починаємо з першої сторінки при нових фільтрах
      })
    );
  };

  const handleResetFilters = () => {
    setBrand('');
    setRentalPrice('');
    setMinMileage('');
    setMaxMileage('');
    setLimit(5);
    dispatch(clearCars());
    dispatch(fetchCars({ limit: 5, page: 1 })); // Завантажуємо початковий список
  };

  return (
    <form onSubmit={handleFilterSubmit}>
      <div>
        <label htmlFor="brand">Brand:</label>
        <select
          id="brand"
          value={brand}
          onChange={e => setBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands &&
            brands.map(b => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="rentalPrice">Rental Price per Day:</label>
        <input
          type="number"
          id="rentalPrice"
          value={rentalPrice}
          onChange={e => setRentalPrice(e.target.value)}
          placeholder="e.g., 40"
        />
      </div>

      <div>
        <label htmlFor="minMileage">Min Mileage:</label>
        <input
          type="number"
          id="minMileage"
          value={minMileage}
          onChange={e => setMinMileage(e.target.value)}
          placeholder="e.g., 1000"
        />
      </div>

      <div>
        <label htmlFor="maxMileage">Max Mileage:</label>
        <input
          type="number"
          id="maxMileage"
          value={maxMileage}
          onChange={e => setMaxMileage(e.target.value)}
          placeholder="e.g., 2000"
        />
      </div>

      <div>
        <label htmlFor="limit">Cars per Page:</label>
        <input
          type="number"
          id="limit"
          value={limit}
          onChange={e => setLimit(parseInt(e.target.value))}
          min="1"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Filtering...' : 'Apply Filters'}
      </button>
      <button type="button" onClick={handleResetFilters} disabled={loading}>
        Reset Filters
      </button>
    </form>
  );
};

export default FilterForm;
