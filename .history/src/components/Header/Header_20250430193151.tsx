import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>kids Academy</div>

      <div className={styles.tabContainer}>
        <Link
          to="/"
          className={`${styles.tab} ${
            location.pathname === '/' ? styles.activeTab : ''
          }`}
        >
          Academy
        </Link>
        <Link
          to="/about"
          className={`${styles.tab} ${
            location.pathname === '/about' ? styles.activeTab : ''
          }`}
        >
          About US
        </Link>
        <Link
          to="/programs"
          className={`${styles.tab} ${
            location.pathname === '/programs' ? styles.activeTab : ''
          }`}
        >
          Program
        </Link>
      </div>

      <Link to="/login" className={styles.contactBtn}>
        Contact
      </Link>
    </header>
  );
};

export default Header;
