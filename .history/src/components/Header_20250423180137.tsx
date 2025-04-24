// src/components/Header.tsx
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>MY COURSE</h1>
      <div className={styles.actions}>
        <button className={styles.link}>Рег</button>
        <button className={styles.link}>ВХОД</button>
      </div>
    </header>
  );
};

export default Header;
