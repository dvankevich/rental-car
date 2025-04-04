import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchCars } from '../../redux/operations';
import { setPage } from '../../redux/carsSlice';

const CatalogPage = () => {
  const dispatch = useDispatch();

  const brands = useSelector(state => state.car.brands);
  const cars = useSelector(state => state.car.cars);
  const loading = useSelector(state => state.car.loading);
  const error = useSelector(state => state.car.error);
  const currentPage = useSelector(state => state.car.currentPage);
  const totalPages = useSelector(state => state.car.totalPages);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCars({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      dispatch(setPage(nextPage));
      dispatch(fetchCars({ page: nextPage }));
    }
  };

  return (
    <div>
      {/* <h1>Brands</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {brands.map((brand, index) => (
          <li key={index}>{brand}</li>
        ))}
      </ul> */}

      <h1>Cars</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="cars-list">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <img
              src={car.img}
              alt={car.model}
              style={{ width: '200px', height: 'auto' }}
            />
            <h2>
              {car.brand} {car.model}
            </h2>
            <p>Year: {car.year}</p>
            <p>Type: {car.type}</p>
            <p>Price: ${car.rentalPrice} per day</p>
            <p>Address: {car.address}</p>
            <p>Description: {car.description}</p>
            <p>Mileage: {car.mileage} miles</p>
          </div>
        ))}
      </div>

      {currentPage < totalPages && (
        <button onClick={handleLoadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
