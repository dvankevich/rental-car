// src/components/CarList/CarList.jsx
import { useSelector, useDispatch } from "react-redux";
import { Card, Image, Text, Button, Group, ActionIcon } from "@mantine/core";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../../redux/cars/slice";
import { selectFavorites } from "../../redux/cars/selectors";
import styles from "./CarList.module.css";

export default function CarList({ cars }) {
  // Проп для cars (filtered або favorites)
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  console.log(cars);

  return (
    <div className={styles.grid}>
      {cars.map((car) => {
        const isFavorite = favorites.some((f) => f.id === car.id);
        return (
          <Card key={car.id} withBorder padding="lg" radius="md">
            <Card.Section>
              <Image
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                height={160}
                fit="cover"
              />
              <ActionIcon
                variant="transparent"
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
                onClick={() =>
                  dispatch(
                    isFavorite
                      ? removeFromFavorites(car.id)
                      : addToFavorites(car)
                  )
                }
              >
                {isFavorite ? (
                  <HeartFill color="#3470FF" size={24} />
                ) : (
                  <Heart size={24} />
                )}
              </ActionIcon>
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text fw={500}>
                {car.brand} {car.model}, {car.year}
              </Text>
              <Text c="blue">${car.rentalPrice}</Text>{" "}
            </Group>
            <Text size="sm" c="dimmed">
              {car.type} | {car.rentalCompany} | {car.mileage} km
            </Text>
            <Button
              component={Link}
              to={`/cars/${car.id}`}
              variant="filled"
              fullWidth
              mt="md"
            >
              Read more
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
