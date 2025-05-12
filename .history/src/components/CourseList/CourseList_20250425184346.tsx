// src/components/CourseList/CourseList.tsx
import React, { useEffect, useState } from 'react';
import CourseCard, { Course } from '../CourseCard/CourseCard';

const CourseList = ({ onCourseClick }: { onCourseClick: (course: Course) => void }) => {
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
        <div key={course.id} onClick={() => onCourseClick(course)} style={{ cursor: 'pointer' }}>
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
