import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, getCars } from "./redux/cars/operations";
import { selectError, selectLoading } from "./redux/cars/selectors";
import Filters from "./components/Filters";
import CarList from "./components/CarList";
import Favorites from "./components/Favorites";
import CarDetails from "./components/CarDetails";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    // Завантажуємо бренди та першу сторінку машин при старті
    dispatch(getBrands());
    dispatch(getCars({ page: 1 }));
  }, [dispatch]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Car Rental Redux Test</h1>

      {error && (
        <div style={{ color: "red", border: "1px solid red", padding: "10px" }}>
          Error: {error}
        </div>
      )}
      {loading && <div style={{ color: "blue" }}>Loading data...</div>}

      <div
        style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "20px" }}
      >
        {/* Ліва колонка: Фільтри та Список */}
        <div>
          <Filters />
          <CarList />
        </div>

        {/* Права колонка: Деталі та Улюблені */}
        <div style={{ borderLeft: "1px solid #ccc", paddingLeft: "20px" }}>
          <CarDetails />
          <Favorites />
        </div>
      </div>
    </div>
  );
};

export default App;
