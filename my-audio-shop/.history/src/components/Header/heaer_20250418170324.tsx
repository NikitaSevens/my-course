import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import './Header.module.css'; // если используешь css-модули

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/cart">Корзина</Link>
      </nav>
    </header>
  );
};

export default Header;