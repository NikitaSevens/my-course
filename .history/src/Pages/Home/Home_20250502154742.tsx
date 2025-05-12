import styles from "./Home.module.css";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CourseList from "../../components/CourseList/CourseList";
import EnrollPopup from "../../components/EnrollPopup/EnrollPopup";
import { Course } from "../../components/CourseCard/CourseCard";

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
              <img src="src/assets/copp.svg" alt="" />
              <h1>ВЫБЕРИ СВОЙ КУРС</h1>
              <p>
                Мы создаём творческую среду,<br /> где дети могут раскрыть свои
                таланты
              </p>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => handleOpenPopup()}
                >
                  Записаться
                </button>
              </div>
              <div className={styles.floatingTags}>
                <span style={{ top: "-120px", left: "5%",  fontSize: "1.3vw", }}>#рисование</span>
                <span style={{ top: "-10px", left: "12%" }}>#UI/UX</span>
                <span style={{ top: "-70px", left: "23%" } }>#Frontend</span>
                <span style={{ top: "-100px", right: "6%" }}>#группы</span>
                <span style={{ top: "-60px", right: "15%" }}>#образование</span>
                <span style={{ top: "3px", right: "4%" }}>#обучение</span>
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
        <section>
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
