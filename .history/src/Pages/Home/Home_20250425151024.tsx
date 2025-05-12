import styles from './Home.module.css';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CourseList from '../../components/CourseList/CourseList'; // 👈 заменили импорт
import heroImage from '../../assets/hero-img.png';
import EnrollPopup from '../../components/EnrollPopup/EnrollPopup';

const Home = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpenPopup = (course = null) => {
    setSelectedCourse(course);
    setPopupOpen(true);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Block */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h2>Добро пожаловать в центр доп. образования</h2>
            <p>Заполните форму ниже, чтобы записаться на курс!</p>
            <button className={styles.cta} onClick={() => handleOpenPopup()}>
              Записаться
            </button>
          </div>
          <div className={styles.heroImage}>
            <img src={heroImage} alt="education" />
          </div>
        </section>

        {/* Курсы */}
        <section className={styles.courses}>
          <h3>Доступные курсы</h3>
          <div className={styles.courseScroll} onClick={() => handleOpenPopup()}>
            <CourseList />
          </div>
        </section>
      </main>
      <Footer />

      {popupOpen && (
        <EnrollPopup
          onClose={() => setPopupOpen(false)}
          selectedCourse={selectedCourse}
        />
      )}
    </>
  );
};

export default Home;
