import { Link } from 'react-router-dom';
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
