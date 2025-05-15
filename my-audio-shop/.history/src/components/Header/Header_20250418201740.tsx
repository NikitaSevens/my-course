import { Link } from 'react-router-dom';
import './Header.module.css'; 
import { useCart } from '../../context/CartContext';



const Header = () => {

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
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