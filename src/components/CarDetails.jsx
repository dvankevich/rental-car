import { useSelector } from "react-redux";
import { selectSelectedCar } from "../redux/cars/selectors";

const CarDetails = () => {
  const car = useSelector(selectSelectedCar);

  if (!car)
    return (
      <div style={{ padding: "10px", background: "#f9f9f9" }}>
        Select a car to see details
      </div>
    );

  return (
    <div
      style={{
        padding: "15px",
        border: "2px solid blue",
        marginBottom: "20px",
        borderRadius: "8px",
      }}
    >
      <h3>
        Details: {car.make} {car.model}
      </h3>
      <p>
        <strong>Description:</strong> {car.description}
      </p>
      <p>
        <strong>Type:</strong> {car.type}
      </p>
      <p>
        <strong>Fuel:</strong> {car.fuelConsumption}
      </p>
      <p>
        <strong>Engine:</strong> {car.engineSize}
      </p>
      <ul>
        {car.accessories?.map((acc, i) => (
          <li key={i}>{acc}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarDetails;
