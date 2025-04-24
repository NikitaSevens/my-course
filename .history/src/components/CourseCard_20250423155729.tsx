// src/components/CourseCard.tsx
import styles from './CourseCard.module.css';

const CourseCard = ({ course }: any) => {
  return (
    <div className={styles.card}>
      <h4>{course.title}</h4>
      <p>{course.description}</p>
      <p><strong>{course.price} ₽</strong></p>
    </div>
  );
};

export default CourseCard;
