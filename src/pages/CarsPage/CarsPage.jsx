// src/pages/CarsPage/CarsPage.jsx
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, NumberInput, Button, Group, Text } from "@mantine/core";
import CarList from "../../components/CarList/CarList";
import { getBrands, getCars } from "../../redux/cars/operations";
import { setFilters } from "../../redux/cars/slice";
import {
  selectBrands,
  selectCars,
  selectFilters,
  selectCurrentPage,
  selectTotalPages,
  selectPageSize,
  selectLoading,
  selectError,
} from "../../redux/cars/selectors";

export default function CarsPage() {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const cars = useSelector(selectCars);
  const currentFilters = useSelector(selectFilters);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const pageSize = useSelector(selectPageSize);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [filterValues, setFilterValues] = useState(currentFilters);
  const isMounted = useRef(false); // Ref для відстеження монтажу, щоб уникнути подвійного виклику в StrictMode

  useEffect(() => {
    dispatch(getBrands()); // Fetch brands один раз
  }, [dispatch]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (cars.length === 0 && !loading) {
        dispatch(getCars({ ...currentFilters, page: 1, limit: pageSize }));
      }
    }
  }, [dispatch, cars.length, loading, currentFilters, pageSize]); // Залежності тільки для ініціалізації

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    if (loading) return; // Запобігти під час завантаження
    dispatch(setFilters(filterValues)); // Скидає cars і page
    dispatch(getCars({ ...filterValues, page: 1, limit: pageSize })); // Fetch з новими filters
  };

  const handleLoadMore = () => {
    if (loading || currentPage >= totalPages) return; // Запобігти
    const nextPage = currentPage + 1;
    dispatch(getCars({ ...currentFilters, page: nextPage, limit: pageSize }));
  };

  const hasMore = currentPage < totalPages;

  return (
    <div>
      <Group position="center" mt="md">
        <Select
          placeholder="Choose a brand"
          data={brands.map((b) => ({ value: b, label: b }))}
          value={filterValues.brand}
          onChange={(value) => handleFilterChange("brand", value)}
          searchable
        />
        <Select
          placeholder="Choose a price"
          data={["30", "40", "50", "60", "70", "80"].map((p) => ({
            value: p,
            label: `To $${p}`,
          }))}
          value={filterValues.maxPrice}
          onChange={(value) => handleFilterChange("maxPrice", value)}
        />
        <NumberInput
          placeholder="From"
          value={filterValues.minMileage}
          onChange={(value) => handleFilterChange("minMileage", value)}
        />
        <NumberInput
          placeholder="To"
          value={filterValues.maxMileage}
          onChange={(value) => handleFilterChange("maxMileage", value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          Search
        </Button>
      </Group>
      {error && (
        <Text c="red" mt="md">
          Помилка: {error}
        </Text>
      )}
      {cars.length === 0 && !loading && (
        <Text mt="md">Немає автомобілів за цими фільтрами</Text>
      )}
      <CarList cars={cars} />
      {hasMore && !loading && (
        <Button fullWidth variant="outline" mt="md" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
      {loading && <Text mt="md">Завантаження...</Text>}
    </div>
  );
}
