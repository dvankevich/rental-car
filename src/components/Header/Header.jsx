import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import s from './Header.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};

const Header = () => {
  return (
    <>
      <header className={s.header}>
        <nav className={s.navigation}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={buildLinkClass}>
            Catalog
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
