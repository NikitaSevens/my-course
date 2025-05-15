import styles from './CourseList.module.css';
import { CourseCard } from './CourseCard';

const courses = [
  { imageSrc: 'img1.jpg', title: 'React для начинающих', subtitle: 'Очная' },
  { imageSrc: 'img2.jpg', title: 'JavaScript с нуля', subtitle: 'Онлайн' },
  // ...добавь еще карточек
];

export const CourseList = () => (
  <div className={styles.courseListContainer}>
    {courses.map((course, index) => (
      <CourseCard
        key={index}
        imageSrc={course.imageSrc}
        title={course.title}
        subtitle={course.subtitle}
      />
    ))}
  </div>
);
