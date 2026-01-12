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

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilters);
  const isLoading = useSelector(selectLoading);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    // Передаємо поточні фільтри + нову сторінку
    dispatch(getCars({ ...filters, page: nextPage }));
  };

  if (cars.length === 0 && !isLoading) {
    return <p>No cars found.</p>;
  }

  return (
    <div>
      <h3>Cars List ({cars.length} loaded)</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {currentPage < totalPages && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CarList;
