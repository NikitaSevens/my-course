import styles from './CourseCard.module.css';

export interface Course {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  groups: string[];
  limit: number;
  fullText: string;
  format?: string; // Добавим поле для формата обучения
}

const CourseCard = ({ course }: { course: Course }) => (
  <div className={styles.card}>
    <div className={styles.imageContainer}>
      <img
        src={course.image || 'https://source.unsplash.com/600x400/?education'}
        alt={course.title}
        className={styles.image}
      />
      {course.format && <span className={styles.formatBadge}>{course.format}</span>}
    </div>
    <div className={styles.content}>
      <h4 className={styles.title}><div><span className={styles.marqueeText}>{course.title}</span></div></h4>
      <button className={styles.viewBtn}>Смотреть</button>
    </div>
  </div>
);

export default CourseCard;