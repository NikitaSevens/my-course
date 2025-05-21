import { useEffect, useState } from 'react';
import CourseCard, { Course } from '../CourseCard/CourseCard';
import styles from './CourseList.module.css';

const apiUrl = import.meta.env.VITE_API_URL;

const CourseList = ({ onCourseClick }: { onCourseClick: (course: Course) => void }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error('Ошибка при загрузке курсов с сервера:', err);
      }
    };

    fetchCourses();
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
