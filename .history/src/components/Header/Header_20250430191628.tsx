import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>kids Academy</div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Academy</Link>
        <Link to="/about" className={styles.navLink}>About Us</Link>
        <Link to="/programs" className={styles.navLink}>Program</Link>
      </nav>
      <Link to="/login" className={styles.contactBtn}>Contact</Link>
    </header>
  );
};

export default Header;
