import { useDispatch, useSelector } from "react-redux";
import {
  selectCars,
  selectCurrentPage,
  selectTotalPages,
  selectFilters,
  selectLoading,
} from "../redux/cars/selectors";
import { getCars } from "../redux/cars/operations";
import CarCard from "./CarCard";
import styles from "./CarList.module.css";

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilters);
  const loading = useSelector(selectLoading);

  const handleLoadMore = () => {
    dispatch(getCars({ ...filters, page: currentPage + 1 }));
  };

  if (cars.length === 0 && !loading) {
    return <p className={styles.empty}>No cars found.</p>;
  }

  return (
    <div className={styles.list}>
      <div className={styles.grid}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      {currentPage < totalPages && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className={styles.loadMore}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default CarList;
