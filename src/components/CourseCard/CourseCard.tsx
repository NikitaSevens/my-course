// src/components/CourseCard/CourseCard.tsx
import styles from './CourseCard.module.css';
export interface Course { id:string; title:string; description:string; startDate:string }
const CourseCard = ({ course }: { course: Course }) => (
  <div className={styles.card}>
    <img src={`https://source.unsplash.com/200x120/?classroom`} alt="" className={styles.image} />
    <h4>{course.title}</h4>
    <p className={styles.desc}>{course.description}</p>
    <p className={styles.date}>Start: {course.startDate}</p>
    <button className={styles.viewBtn}>View More</button>
  </div>
);
export default CourseCard;
