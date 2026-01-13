import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GeoAlt,
  Calendar3,
  CarFront,
  FuelPump,
  Gear,
  CheckCircle,
} from "react-bootstrap-icons";
import { getCarById } from "../redux/cars/operations";
import {
  selectSelectedCar,
  selectLoading,
  selectError,
} from "../redux/cars/selectors";
import styles from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectSelectedCar);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getCarById(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit
    console.log({ name, email, date, comment });
    alert("Booking sent!");
    setName("");
    setEmail("");
    setDate("");
    setComment("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!car) return <p>Car not found.</p>;
  console.log("car in CarDetailsPage: ", car);
  console.log("car.rentalConditions", car.rentalConditions);

  const addressParts = car.address.split(", ");
  const city = addressParts[1];
  const country = addressParts[2];
  //const conditions = car.rentalConditions.split("\n");
  const conditions = car.rentalConditions;
  const mileageFormatted = car.mileage.toLocaleString();

  return (
    <div className={styles.page}>
      <img
        src={car.img}
        alt={`${car.make} ${car.model}`}
        className={styles.image}
      />
      <div className={styles.info}>
        <h2 className={styles.title}>
          {car.make} <span className={styles.model}>{car.model}</span>,{" "}
          {car.year}
        </h2>
        <p className={styles.details}>
          <GeoAlt /> {city}, {country} | Id: {car.id} | Year: {car.year} | Type:{" "}
          {car.type} | Mileage: {mileageFormatted} km
        </p>
        <p className={styles.description}>{car.description}</p>
      </div>
      <div className={styles.section}>
        <h3>Rental Conditions:</h3>
        <ul className={styles.list}>
          {conditions.map((cond, idx) => (
            <li key={idx}>
              <CheckCircle className={styles.icon} /> {cond}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Car Specifications:</h3>
        <ul className={styles.list}>
          <li>
            <Calendar3 className={styles.icon} /> Year: {car.year}
          </li>
          <li>
            <CarFront className={styles.icon} /> Type: {car.type}
          </li>
          <li>
            <FuelPump className={styles.icon} /> Fuel Consumption:{" "}
            {car.fuelConsumption}
          </li>
          <li>
            <Gear className={styles.icon} /> Engine Size: {car.engineSize}
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Accessories and functionalities:</h3>
        <ul className={styles.list}>
          {[...car.accessories, ...car.functionalities].map((item, idx) => (
            <li key={idx}>
              <CheckCircle className={styles.icon} /> {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.formSection}>
        <h3>Book your car now</h3>
        <p>Stay connected! We are always ready to help you.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Booking date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.textarea}
          />
          <button type="submit" className={styles.button}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarDetailsPage;
