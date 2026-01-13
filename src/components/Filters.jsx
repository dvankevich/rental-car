import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands } from "../redux/cars/selectors";
import { setFilters } from "../redux/cars/slice";
import { getCars } from "../redux/cars/operations";
import styles from "./Filters.module.css";

const PRICE_OPTIONS = [30, 40, 50, 60, 70, 80, 90, 100];

const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);

  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const handleSearch = () => {
    const filters = {
      brand,
      maxPrice: maxPrice ? Number(maxPrice) : "",
      minMileage: minMileage ? Number(minMileage.replace(/,/g, "")) : "",
      maxMileage: maxMileage ? Number(maxMileage.replace(/,/g, "")) : "",
    };
    dispatch(setFilters(filters));
    dispatch(getCars({ ...filters, page: 1 }));
  };

  const formatMileage = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className={styles.filters}>
      <div className={styles.field}>
        <label>Car brand</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={styles.select}
        >
          <option value="">Choose a brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label>Price/ 1 hour</label>
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={styles.select}
        >
          <option value="">To $</option>
          {PRICE_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.mileage}>
        <label>Car mileage / km</label>
        <div className={styles.mileageInputs}>
          <input
            type="text"
            placeholder="From"
            value={formatMileage(minMileage)}
            onChange={(e) => setMinMileage(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="To"
            value={formatMileage(maxMileage)}
            onChange={(e) => setMaxMileage(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
      <button onClick={handleSearch} className={styles.button}>
        Search
      </button>
    </div>
  );
};

export default Filters;
