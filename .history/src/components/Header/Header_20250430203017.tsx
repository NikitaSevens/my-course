import styles from './Header.module.css';

const Header = () => {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>kids Academy</div>

      <div className={styles.tabContainer}>
        <a onClick={() => scrollToSection('hero')}  className={styles.tab}>Academy</a>
        <a onClick={() => scrollToSection('about')} className={styles.tab}>About US</a>
        <a href="#programs" className={styles.tab}>Program</a>
      </div>

      <a href="#contact" className={styles.contactBtn}>Contact</a>
    </header>
  );
};

export default Header;
