import { useEffect, useState } from 'react';
import CourseCard, { Course } from '../CourseCard/CourseCard';
import styles from './CourseList.module.css';

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  console.error("VITE_API_URL не определён!");
}

const CourseList = ({ onCourseClick }: { onCourseClick: (course: Course) => void }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true); // Добавили состояние загрузки

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/courses`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Ошибка при загрузке курсов с сервера:", err);
      } finally {
        setLoading(false); // Обновим состояние независимо от результата
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        {loading
          ? [...Array(4)].map((_, index) => (
              <div key={index} className={styles.cardWrapper}>
                <div className={styles.skeletonCard} />
              </div>
            ))
          : courses.map(course => (
              <div key={course.id} className={styles.cardWrapper}>
                <CourseCard course={course} onClick={() => onCourseClick(course)} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default CourseList;
