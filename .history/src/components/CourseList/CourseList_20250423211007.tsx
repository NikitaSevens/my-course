// src/components/CourseList/CourseList.tsx
import { Course } from '../CourseCard/CourseCard';
import CourseCard from '../CourseCard/CourseCard';
import styles from './CourseList.module.css';

const CourseList = ({ courses }: { courses: Course[] }) => (
  <div className={styles.wrapper}>
    <div className={styles.scroll}>
      {courses.map(c => <CourseCard key={c.id} course={c} />)}
    </div>
  </div>
);
export default CourseList;
