import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        RentalCar
      </NavLink>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={styles.link}>
          Catalog
        </NavLink>
        <NavLink to="/favorites" className={styles.link}>
          Favorites
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
