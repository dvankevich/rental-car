import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCars } from "../redux/cars/operations";
import Filters from "../components/Filters";
import CarList from "../components/CarList";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars({ page: 1 }));
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Filters />
      <CarList />
    </div>
  );
};

export default CatalogPage;
