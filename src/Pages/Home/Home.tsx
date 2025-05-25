import styles from "./Home.module.css";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CourseList from "../../components/CourseList/CourseList";
import EnrollPopup from "../../components/EnrollPopup/EnrollPopup";
import { Course } from "../../components/CourseCard/CourseCard";
import CourseDetail from '../../components/CourseDetail/CourseDetail';

const Home = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // Для EnrollPopup
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null); // Для CourseDetail

  const handleCourseClick = (course: Course) => {
    setSelectedCourseDetail(course); // Открываем попап с деталями
  };

  const handleCloseDetail = () => {
    setSelectedCourseDetail(null); // Закрываем попап с деталями
  };

  const handleOpenPopup = (course?: Course) => {
    setSelectedCourse(course || null); // Открываем попап записи
    setPopupOpen(true);
  };

  return (
    <>
      <main className={styles.main}>
        {/* Hero Section */}
        <section id="hero" className={styles.hero}>
          <div className={styles.cloudBackground}>
            <div className={styles.heroContent}>
              <Header />
              <img className={styles.heroImg} src="/images/copp.svg" alt="" />
              <h1>ВЫБЕРИ СВОЙ КУРС</h1>
              <p>
                Мы создаём творческую среду,
                <br /> где люди могут раскрыть свои таланты
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
                <span style={{ top: "-200px", left: "5%", fontSize: "1.3vw" }}>#рисование</span>
                <span style={{ top: "5px", left: "12%", fontSize: "1.3vw" }}>#UI/UX</span>
                <span style={{ top: "-70px", left: "23%", fontSize: "1.3vw" }}>#Frontend</span>
                <span style={{ top: "-180px", right: "6%", fontSize: "1.3vw" }}>#группы</span>
                <span style={{ top: "-60px", right: "18%", fontSize: "1.3vw" }}>#образование</span>
                <span style={{ top: "13px", right: "4%", fontSize: "1.3vw" }}>#обучение</span>
              </div>
            </div>

            <div className={styles.reasons}>
              <div className={`${styles.reasonItem} ${styles.special}`}>
                <h2>
                  <strong>Why choose</strong> <br /> Artistry?
                </h2>
                <p className={styles.reasonP}>
                  Our students are chosen to study in <br /> our children's school
                  because of the high quality of education
                </p>
              </div>
              <div className={styles.reasonItem}>
                <img src="/images/star.png" alt="Full Development" />
                <h3>Full Development</h3>
                <p>
                  We believe that learning should contribute <br /> to the full
                  development of each child.
                </p>
              </div>
              <div className={styles.reasonItem}>
                <img src="/images/starss.png" alt="Love Children" />
                <h3>Love Children</h3>
                <p>
                  Our teachers and staff are always ready <br /> to give children
                  warmth
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={styles.courses}>
          <h2>О нас</h2>
        </section>

        {/* Programs Section */}
        <section id="programs" className={styles.courses}>
          <h2>Программы</h2>
          <CourseList onCourseClick={handleCourseClick} />
        </section>

        {/* Contact */}
        <section>
          <Footer />
        </section>
      </main>

      {/* Попап: Детали курса */}
      {selectedCourseDetail && (
        <CourseDetail course={selectedCourseDetail} onClose={handleCloseDetail} />
      )}

      {/* Попап: Запись на курс */}
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
