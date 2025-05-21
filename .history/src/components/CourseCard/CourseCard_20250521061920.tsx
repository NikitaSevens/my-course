import { useEffect, useRef, useState } from 'react';
import styles from './CourseCard.module.css';

export interface Course {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  groups: string[];
  limit: number;
  fullText: string;
  format?: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

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
          src={course.image || 'https://source.unsplash.com/600x400/?education'}
          alt={course.title}
          className={styles.image}
        />
        {course.format && <span className={styles.formatBadge}>{course.format}</span>}
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
