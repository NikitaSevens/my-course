// src/components/CourseCard/CourseCard.tsx
import styles from './CourseCard.module.css';
//import handleView from '../../components/CreateCourse/CreateCourse.tsx';


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

const CourseCard = ({ course, onClick }: { course: Course; onClick: () => void }) => (
  <div className={styles.card}>
    <img
      src={course.image || 'https://source.unsplash.com/200x120/?classroom'}
      alt=""
      className={styles.image}
    />
    <h4>{course.title}</h4>
    <p className={styles.desc}>{course.description}</p>
    <p className={styles.date}>Старт: {course.date}</p>
    <p className={styles.limit}>Записей: 0 / {course.limit}</p>
    <button className={styles.viewBtn} onClick={onClick}>Смотреть</button>
  </div>
);

export default CourseCard;
