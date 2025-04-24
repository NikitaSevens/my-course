// src/pages/Home.tsx
import styles from './Home.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import mockCourses from '../mock/courses';
import CourseCard from '../components/CourseCard';
import heroImage from '../assets/hero-img.png';

const Home = () => {
  return (
    <>
      <main className={styles.main}>
        {/* Hero Block */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h2>Добро пожаловать в центр доп. образования</h2>
            <p>Заполните форму ниже, чтобы записаться на курс!</p>
            <button className={styles.cta}>Записаться</button>
          </div>
          <div className={styles.heroImage}>
            <img src={heroImage} alt="education" />
          </div>
        </section>

        {/* Курсы */}
        <section className={styles.courses}>
          <h3>Доступные курсы</h3>
          <div className={styles.courseScroll}>
            {mockCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
