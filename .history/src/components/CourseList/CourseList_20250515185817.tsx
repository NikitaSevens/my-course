import { useEffect, useState } from 'react';
import CourseCard, { Course } from '../CourseCard/CourseCard';
import styles from './CourseList.module.css';



const CourseList = ({ onCourseClick }: { onCourseClick: (course: Course) => void }) => {
  const [courses, setCourses] = useState<Course[]>(mockCourses); // Используем моки

  useEffect(() => {
    // Оставим загрузку из localStorage для реального приложения
    const stored = localStorage.getItem('courses');
    if (stored) {
      try {
        setCourses(JSON.parse(stored));
      } catch (e) {
        console.error('Ошибка при чтении courses из localStorage', e);
      }
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        {courses.map(course => (
          <div 
            key={course.id} 
            onClick={() => onCourseClick(course)}
            className={styles.cardWrapper}
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;