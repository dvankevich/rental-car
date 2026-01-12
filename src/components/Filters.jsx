// src/components/Filters.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands } from "../redux/cars/selectors";
import { setFilters } from "../redux/cars/slice";
import { getCars } from "../redux/cars/operations";

const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);

  // Локальний стейт полів
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minMileage, setMinMileage] = useState(""); // Додано
  const [maxMileage, setMaxMileage] = useState(""); // Додано

  const handleSearch = () => {
    const newFilters = {
      brand,
      maxPrice,
      minMileage: minMileage ? Number(minMileage) : null,
      maxMileage: maxMileage ? Number(maxMileage) : null,
    };

    // 1. Зберігаємо фільтри в Redux
    dispatch(setFilters(newFilters));

    // 2. Робимо запит з новими фільтрами (скидаємо на 1 сторінку)
    dispatch(getCars({ ...newFilters, page: 1 }));
  };

  // Стиль для інпутів, щоб не дублювати код
  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "120px",
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
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Вибір бренду */}
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Brands</option>
          {brands.map((b, idx) => (
            <option key={idx} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* Ціна */}
        <input
          type="number"
          placeholder="Max Price ($)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={inputStyle}
        />

        {/* Пробіг ВІД */}
        <input
          type="number"
          placeholder="Min Mileage"
          value={minMileage}
          onChange={(e) => setMinMileage(e.target.value)}
          style={inputStyle}
        />

        {/* Пробіг ДО */}
        <input
          type="number"
          placeholder="Max Mileage"
          value={maxMileage}
          onChange={(e) => setMaxMileage(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
