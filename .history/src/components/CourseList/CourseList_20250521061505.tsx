import { useEffect, useState } from 'react';
import CourseCard, { Course } from '../CourseCard/CourseCard';
import styles from './CourseList.module.css';



const CourseList = ({ onCourseClick }: { onCourseClick: (course: Course) => void }) => {
  const [courses, setCourses] = useState<Course[]>([]); // Используем моки



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