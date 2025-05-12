import styles from './Header.module.css';
import { useState, useEffect } from 'react';

const Header = () => {
  const [activeTab, setActiveTab] = useState('hero');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id); // 👈 Меняем активную вкладку
    }
  };

  // При загрузке можно сразу выделить первую вкладку (опционально)
  useEffect(() => {
    setActiveTab('hero');
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>ЦОПП Академия</div>

      <div className={styles.tabContainer}>
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
      </div>

      <a href="#" className={styles.contactBtn}>
        Вход
      </a>
    </header>
  );
};

export default Header;
