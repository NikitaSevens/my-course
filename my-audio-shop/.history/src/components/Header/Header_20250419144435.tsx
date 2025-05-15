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
    <div className={styles.iconWrapper}>
      <img src="./src/assets/icons/like.svg" alt="like" className={styles.iconImage} />
      <span className={styles.badge}>0</span>
    </div>

    <Link to="/cart" className={styles.iconWrapper}>
      <img src="./src/assets/icons/basket.svg" alt="cart" className={styles.iconImage} />
      <span className={styles.badge}>{totalItems}</span>
    </Link>
  </div>
</header>
  );
};

export default Header;