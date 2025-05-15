import styles from './Header.module.css';
import { useState, useEffect } from 'react';

const Header = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
      setMenuOpen(false); // Закрыть меню после клика
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>ЦОПП Академия</div>

      {/* Бургер */}
      <div className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>

      {/* Десктоп-меню */}
      <nav className={styles.tabContainer}>
        <a
          onClick={() => scrollToSection('hero')}
          className={`${styles.tab} ${activeTab === 'hero' ? styles.activeTab : ''}`}
        >
          Академия
        </a>
        <a
          onClick={() => scrollToSection('about')}
          className={`${styles.tab} ${activeTab === 'about' ? styles.activeTab : ''}`}
        >
          О нас
        </a>
        <a
          onClick={() => scrollToSection('programs')}
          className={`${styles.tab} ${activeTab === 'programs' ? styles.activeTab : ''}`}
        >
          Программы
        </a>
      </nav>

      {/* Мобильное меню */}
      <nav className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <a onClick={() => scrollToSection('hero')} className={styles.tab}>
          Академия
        </a>
        <a onClick={() => scrollToSection('about')} className={styles.tab}>
          О нас
        </a>
        <a onClick={() => scrollToSection('programs')} className={styles.tab}>
          Программы
        </a>
        <a href="#login" onClick={() => scrollToSection('programs')} className={styles.tab}>
        Вход
      </a>
      </nav>

      <a href="#login" className={styles.contactBtn}>
        Вход
      </a>
    </header>
  );
};

export default Header;
