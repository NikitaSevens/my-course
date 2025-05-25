import { useEffect, useState } from 'react';
import CourseCard, { Course } from '../CourseCard/CourseCard';
import styles from './CourseList.module.css';

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  console.error("VITE_API_URL не определён!");
}

const CourseList = ({ onCourseClick }: { onCourseClick: (course: Course) => void }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/courses`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Ошибка при загрузке курсов с сервера:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        {courses.map(course => (
          // Убираем onClick с обёртки
          <div key={course.id} className={styles.cardWrapper}>
            {/* Передаём onClick только кнопке */}
            <CourseCard course={course} onClick={() => onCourseClick(course)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

