import styles from './Home.module.css';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CourseList from '../../components/CourseList/CourseList';
import EnrollPopup from '../../components/EnrollPopup/EnrollPopup';
import { Course } from '../../components/CourseCard/CourseCard';

const Home = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleOpenPopup = (course?: Course) => {
    setSelectedCourse(course || null);
    setPopupOpen(true);
  };

  return (
    <>

      <main className={styles.main}>
        {/* Hero Section */}
        <section id="hero" className={styles.hero}>
      <Header />
          <div className={styles.cloudBackground}>
            <div className={styles.heroContent}>
              <h1>Creative Kids Academy</h1>
              <p>Мы создаём творческую среду, где дети могут раскрыть свои таланты</p>
              <div className={styles.buttons}>
                <button className={styles.cta} onClick={() => handleOpenPopup()}>
                  Начать →
                </button>
                <button className={styles.secondary}>
                  ▶ Смотреть видео
                </button>
                
              </div>
              <div className={styles.tags}>
                <span>#рисование</span>
                <span>#UI/UX</span>
                <span>#Frontend</span>
                <span>#группы</span>
                <span>#образование</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={styles.courses}>
          <h2>Доступные курсы</h2>
          <CourseList onCourseClick={handleOpenPopup} />
        </section>

        {/* Placeholder Program Section */}
        <section id="programs" className={styles.courses}>
          <h2>Программы (будет позже)</h2>
          <p>Контент добавим позже.</p>
        </section>

        {/* Contact якорь (для футера или кнопки) */}
        <section >
          <Footer />
        </section>
      </main>

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
