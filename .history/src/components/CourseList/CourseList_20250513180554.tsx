import { useEffect, useState } from 'react';
import CourseCard, { Course } from '../CourseCard/CourseCard';
import styles from './CourseList.module.css';

// Моковые данные для демонстрации
const mockCourses: Course[] = [
  {
    id: '1',
    image: 'https://source.unsplash.com/600x400/?programming',
    title: 'Веб-разработка',
    description: 'Полный курс по современной веб-разработке',
    date: '15.10.2023',
    groups: ['Группа 1'],
    limit: 20,
    fullText: '',
    format: 'Онлайн'
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/600x400/?design',
    title: 'Дизайн интерфейсов',
    description: 'UX/UI дизайн для начинающих',
    date: '20.10.2023',
    groups: ['Группа 1'],
    limit: 15,
    fullText: '',
    format: 'Оффлайн'
  },
  // Добавьте еще 3-5 карточек по аналогии
];

//const CourseList = ({ onCourseClick }: { onCourseClick: (course: Course) => void }) => {
  //const [courses, setCourses] = useState<Course[]>(mockCourses); // Используем моки

  //useEffect(() => {
    // Оставим загрузку из localStorage для реального приложения
  //  const stored = localStorage.getItem('courses');
   // if (stored) {
  //    try {
  //     setCourses(JSON.parse(stored));
  //    } catch (e) {
  //      console.error('Ошибка при чтении courses из localStorage', e);
  //    }
  //  }
  //}, []);

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