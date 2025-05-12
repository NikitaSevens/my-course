// src/components/CourseList/CourseList.tsx
import  { useEffect, useState } from 'react';
import CourseCard, { Course } from '../CourseCard/CourseCard';

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
