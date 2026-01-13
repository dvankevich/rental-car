import { useSelector } from "react-redux";
import { selectFavorites } from "../redux/cars/selectors";
import CarCard from "../components/CarCard";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={styles.page}>
      {favorites.length === 0 ? (
        <p className={styles.empty}>No favorites added yet.</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
