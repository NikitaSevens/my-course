// src/components/CourseCard.tsx
import styles from './CourseCard.module.css';

const CourseCard = ({ course,  }: any) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={course.image} alt={course.title} className={styles.image} />
      <h4>{course.title}</h4>
    </div>
  );
};

export default CourseCard;
