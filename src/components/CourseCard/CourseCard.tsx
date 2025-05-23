import { useEffect, useRef, useState } from 'react';
import styles from './CourseCard.module.css';

export interface Course {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  durationHours: string;
  durationLessons: string;
  programType: string;
  studyForm: string;
  image: string;
  price: string;
  competence: string;
  category: string;
  programFile: string;
  organization: string;
  city: string;
  audience: string;
}


const CourseCard = ({ course }: { course: Course }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  const imageUrl = course.image || 'https://source.unsplash.com/600x400/?education';

  useEffect(() => {
    const wrapperWidth = wrapperRef.current?.offsetWidth || 0;
    const textWidth = textRef.current?.scrollWidth || 0;

    if (textWidth > wrapperWidth) {
      setShouldScroll(true);
    }
  }, [course.title]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={course.title}
          className={styles.image}
        />
        {course.programType && <span className={styles.formatBadge}>{course.programType}</span>}
      </div>

      <div className={styles.content}>
        <h4 className={styles.title}>
          <div className={styles.marqueeWrapper} ref={wrapperRef}>
            <span
              ref={textRef}
              className={`${styles.marqueeText} ${shouldScroll ? styles.scroll : ''}`}
            >
              {course.title}
            </span>
          </div>
        </h4>

        <button className={styles.viewBtn}>Смотреть</button>
      </div>
    </div>
  );
};


export default CourseCard;
