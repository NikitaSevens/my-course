// src/components/Header.tsx
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>MY COURSE</h1>
      <div className={styles.actions}>
      <button>ЗАРЕГИСТРИРОВАТЬСЯ</button>
      <Link to="/login" className={styles.link}>ВХОД</Link>
      </div>
    </header>
  );
};

export default Header;
