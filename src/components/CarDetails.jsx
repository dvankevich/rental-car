// src/components/CarDetails.jsx
import { useSelector } from "react-redux";
import { selectSelectedCar } from "../redux/cars/selectors";

const CarDetails = () => {
  const car = useSelector(selectSelectedCar);

  if (!car) {
    return (
      <div
        style={{
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "8px",
          textAlign: "center",
          border: "1px dashed #ccc",
        }}
      >
        <p>Select a car from the list to view full details</p>
      </div>
    );
  }

  // Парсимо адресу (місто та країна зазвичай останні два елементи)
  const addressParts = car.address?.split(", ") || [];
  const location =
    addressParts.length >= 2
      ? `${addressParts[addressParts.length - 2]}, ${
          addressParts[addressParts.length - 1]
        }`
      : car.address;

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #eee",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      }}
    >
      <img
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "15px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0" }}>
          {car.brand} <span style={{ color: "#3470FF" }}>{car.model}</span>,{" "}
          {car.year}
        </h2>
        <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
          ${car.rentalPrice}
        </span>
      </div>

      <p
        style={{
          color: "#121417",
          opacity: 0.5,
          fontSize: "14px",
          marginBottom: "15px",
        }}
      >
        {location} | ID: {car.id} | Type: {car.type}
      </p>

      <p style={{ lineHeight: "1.5", marginBottom: "20px" }}>
        {car.description}
      </p>

      {/* Технічні характеристики */}
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "8px" }}>Specifications:</h4>
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            fontSize: "14px",
          }}
        >
          <span>
            <strong>Fuel:</strong> {car.fuelConsumption}
          </span>
          <span>
            <strong>Engine:</strong> {car.engineSize}
          </span>
          <span>
            <strong>Mileage:</strong> {car.mileage.toLocaleString()} km
          </span>
        </div>
      </div>

      {/* Аксесуари та функціонал */}
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "8px" }}>Accessories & Functionalities:</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {[...(car.accessories || []), ...(car.functionalities || [])].map(
            (item, index) => (
              <span
                key={index}
                style={{
                  background: "#f7f7fb",
                  padding: "4px 10px",
                  borderRadius: "15px",
                  fontSize: "12px",
                }}
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>

      {/* Умови оренди */}
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "8px" }}>Rental Conditions:</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {car.rentalConditions?.map((condition, index) => (
            <div
              key={index}
              style={{
                background: "#f9f9f9",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                border: "1px solid #eee",
              }}
            >
              {condition}
            </div>
          ))}
          <div
            style={{
              background: "#f9f9f9",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "12px",
              border: "1px solid #eee",
            }}
          >
            Mileage:{" "}
            <span style={{ color: "#3470FF", fontWeight: "bold" }}>
              {car.mileage.toLocaleString()}
            </span>
          </div>
          <div
            style={{
              background: "#f9f9f9",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "12px",
              border: "1px solid #eee",
            }}
          >
            Price:{" "}
            <span style={{ color: "#3470FF", fontWeight: "bold" }}>
              {car.rentalPrice}$
            </span>
          </div>
        </div>
      </div>

      <div style={{ fontSize: "13px", color: "#8a8a8a" }}>
        Company: {car.rentalCompany}
      </div>

      <button
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          backgroundColor: "#3470FF",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = "tel:+380730000000")}
      >
        Rental car
      </button>
    </div>
  );
};

export default CarDetails;
