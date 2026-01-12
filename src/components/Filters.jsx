import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands } from "../redux/cars/selectors";
import { setFilters } from "../redux/cars/slice";
import { getCars } from "../redux/cars/operations";

const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);

  // Локальний стейт форми перед відправкою в Redux
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    // 1. Зберігаємо фільтри в Redux (це також скидає cars в [] і page в 1)
    dispatch(setFilters({ brand, maxPrice }));

    // 2. Робимо запит з новими фільтрами (сторінка 1)
    dispatch(getCars({ brand, maxPrice, page: 1 }));
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        background: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <h3>Filters</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {/* Вибір бренду */}
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">All Brands</option>
          {brands.map((b, idx) => (
            <option key={idx} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* Ввід ціни */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button
          onClick={handleSearch}
          style={{ background: "blue", color: "white", cursor: "pointer" }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
