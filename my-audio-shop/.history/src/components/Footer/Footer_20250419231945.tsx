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
            <img src="./src/assets/icons/rus-eng.svg" className={styles.globe} alt="#" />
            <span className={styles.active}>Рус</span>
            <span>Eng</span>
          </div>
        </div>
      </div>

      .socials:hover .icon:nth-child(1){
  filter: brightness(0) saturate(100%) invert(47%) sepia(94%) saturate(1708%) hue-rotate(359deg) brightness(101%) contrast(101%);
}

    </footer>
  );
};

export default Footer;
