import { Link } from 'react-router-dom';
import './Header.module.css'; 
import { useCart } from '../../context/CartContext';



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