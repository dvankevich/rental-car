import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/cars/slice";
import { selectFavorites } from "../redux/cars/selectors";
import { getCarById } from "../redux/cars/operations";

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

  const showDetails = () => {
    dispatch(getCarById(car.id));
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      <img
        src={car.img || car.photo} // API іноді має різні поля, перевірте API
        alt={car.make}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <h4>
        {car.make} {car.model}, {car.year}
      </h4>
      <p>Price: {car.rentalPrice}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <button
          onClick={toggleFavorite}
          style={{
            background: isFavorite ? "#ffcccc" : "#eee",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {isFavorite ? "♥ Saved" : "♡ Save"}
        </button>

        <button onClick={showDetails} style={{ cursor: "pointer" }}>
          Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;
