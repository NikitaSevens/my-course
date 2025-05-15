import { Link } from 'react-router-dom';
import styles from './Header.module.css'; 
import { useCart } from '../../context/CartContext';



const Header = () => {

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>QPICK</Link>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <img src="./src/assets/icons//" alt="" />
          <span className={styles.badge}>0</span>
        </div>
        <Link to="/cart" className={styles.icon}>
          🛒
          <span className={styles.badge}>{totalItems}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;