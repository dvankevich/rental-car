import { useSelector, useDispatch } from "react-redux";
import { selectFavorites } from "../redux/cars/selectors";
import { removeFromFavorites } from "../redux/cars/slice";

const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Favorites ({favorites.length})</h3>
      {favorites.length === 0 ? (
        <p>List is empty</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {favorites.map((car) => (
            <li
              key={car.id}
              style={{
                borderBottom: "1px solid #eee",
                padding: "5px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {car.make} {car.model}
              </span>
              <button
                onClick={() => dispatch(removeFromFavorites(car.id))}
                style={{
                  color: "red",
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
