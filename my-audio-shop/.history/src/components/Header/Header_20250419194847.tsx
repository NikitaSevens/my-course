import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; 
import { useCart } from '../../context/CartContext';



const Header = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {

    
    const trigger = document.getElementById("headerTrigger");
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, []);

  const headerClass = `${styles.header} ${!isCartPage && scrolled ? styles.scrolled : ""}`;

  return (
    <header className={headerClass}>
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
