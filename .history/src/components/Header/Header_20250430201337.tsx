import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>kids Academy</div>

      <div className={styles.tabContainer}>
        <a href="#home" className={`${styles.tab} `}>
          Academy
        </a>
        <a href="#about" className={styles.tab}>
          About US
        </a>
        <a href="" className={styles.tab}>
          Program
        </a>
      </div>

      <a href="/login" className={styles.contactBtn}>
        Contact
      </a>
    </header>
  );
};

export default Header;
