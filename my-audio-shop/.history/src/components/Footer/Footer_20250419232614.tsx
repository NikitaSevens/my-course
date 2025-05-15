import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>QPICK</div>

      <div className={styles.links}>
        <div className={styles.column}>
          <div className={styles.iconWrapper}><a href="#">Избранное</a></div>
          <div className={styles.iconWrapper}><a href="#/cart">Корзина</a></div>
          <div className={styles.iconWrapper}><a href="#">Контакты</a></div>
        </div>
        <div className={styles.column}>
          <div ><a href="#">Условия сервиса</a></div>
          <div className={styles.languageSwitch}>
            <img
              src="./src/assets/icons/rus-eng.svg"
              className={styles.globe}
              alt="#"
            />
            <span className={styles.active}>Рус</span>
            <span>Eng</span>
          </div>
        </div>
      </div>

      <div className={styles.socials}>
        <div className={styles.iconWrapper}>
          {" "}
          <img
            src="./src/assets/icons/VK.svg"
            className={styles.icon}
            alt="#"
          />
        </div>
        <div className={styles.iconWrapper}>
          <img
            src="./src/assets/icons/Telegram.svg"
            className={styles.icon}
            alt="#"
          />
        </div>
        <div className={styles.iconWrapper}>
          <img
            src="./src/assets/icons/WhatsApp.svg"
            className={styles.icon}
            alt="#"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
