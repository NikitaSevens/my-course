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
      setMenuOpen(false); // 📱 Закрываем меню после клика
    }
  };

  useEffect(() => {
    setActiveTab('hero');

    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>ЦОПП Академия</div>

      {/* Бургер-кнопка */}
      <div className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>

      {/* Навигация (с условной видимостью) */}
      <nav
        className={`${styles.tabContainer} ${
          menuOpen ? styles.open : styles.closed
        }`}
      >
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

      <a href="#login" className={styles.contactBtn}>
        Вход
      </a>
    </header>
  );
};

export default Header;
