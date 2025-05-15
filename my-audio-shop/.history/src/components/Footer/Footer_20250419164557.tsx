import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>QPICK</div>

      <div className={styles.links}>
        <div className={styles.column}>
          <a href="#">Избранное</a>
          <a href="#/">Корзина</a>
          <a href="#">Контакты</a>
        </div>
        <div className={styles.column}>
          <a href="#">Условия сервиса</a>
          <div className={styles.languageSwitch}>
            <img src="./src/assets/icons/globe.svg" alt="" />
            <span className={styles.globe}>🌐</span>
            <span className={styles.active}>Рус</span>
            <span>Eng</span>
          </div>
        </div>
      </div>

      <div className={styles.socials}>
        <img src="./src/assets/icons/VK.svg" className={styles.icon} alt="#" />
        <img src="./src/assets/icons/Telegram.svg" className={styles.icon} alt="#" />
        <img src="./src/assets/icons/WhatsApp.svg" className={styles.icon} alt="#" />
      </div>
    </footer>
  );
};

export default Footer;
