import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { addToFavorites, removeFromFavorites } from "../redux/cars/slice";
import { selectFavorites } from "../redux/cars/selectors";
import styles from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(car.id));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  const addressParts = car.address.split(", ");
  const city = addressParts[1];
  const country = addressParts[2];

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={car.img || car.photoLink}
          alt={`${car.make} ${car.model}`}
          className={styles.image}
        />
        <button onClick={toggleFavorite} className={styles.favorite}>
          {isFavorite ? (
            <HeartFill color="var(--button)" />
          ) : (
            <Heart color="var(--gray)" />
          )}
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <span>
            {car.make} <span className={styles.model}>{car.model}</span>,{" "}
            {car.year}
          </span>
          <span className={styles.price}>{car.rentalPrice}</span>
        </div>
        <p className={styles.details}>
          {city} | {country} | {car.rentalCompany} | {car.type}
        </p>
      </div>
      <Link to={`/catalog/${car.id}`} className={styles.button}>
        Read more
      </Link>
    </div>
  );
};

export default CarCard;
