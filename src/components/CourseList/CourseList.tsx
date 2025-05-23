import { useEffect, useState } from 'react';
import CourseCard, { Course } from '../CourseCard/CourseCard';
import styles from './CourseList.module.css';

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  console.error("VITE_API_URL не определён!");
  
}

const CourseList = ({ onCourseClick }: { onCourseClick: (course: Course) => void }) => {
console.log("CourseList рендерится");
  const [courses, setCourses] = useState<Course[]>([]);

useEffect(() => {
  console.log("useEffect запущен");

  const fetchCourses = async () => {
    try {
      console.log("Начинаю запрос на /courses");
      const response = await fetch(`${apiUrl}/courses`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setCourses(data);
      console.log("Курсы с сервера:", data);
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
