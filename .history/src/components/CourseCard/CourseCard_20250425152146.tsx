// src/components/CourseCard/CourseCard.tsx
import styles from './CourseCard.module.css';
// src/components/CreateCourse/CreateCourse.tsx

export interface Course {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  groups: string[];
  limit: number;
  fullText: string;
}

const CourseCard = ({ course }: { course: Course }) => (
  <div className={styles.card}>
    <img
      src={course.image || 'https://source.unsplash.com/200x120/?classroom'}
      alt=""
      className={styles.image}
    />
    <h4>{course.title}</h4>
    <p className={styles.desc}>{course.description}</p>
    <p className={styles.date}>Старт: {course.date}</p>
    <p className={styles.limit}>Записей: 0 / {course.limit}</p> {/* позже заменим 0 на реальное число */}
    <button onClick={() => handleView(course)} className={styles.viewBtn}>Смотреть</button>
  </div>
);

export default CourseCard;
