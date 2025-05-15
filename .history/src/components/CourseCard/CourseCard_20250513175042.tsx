import styles from './CourseCard.module.css';

interface CourseCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
}

export const CourseCard = ({ imageSrc, title, subtitle }: CourseCardProps) => (
  <div className={styles.courseCard}>
    <img src={imageSrc} className={styles.cardImage} alt={title} />
    <div className={styles.cardContent}>
      <div className={styles.cardSubtitle}>{subtitle}</div>
      <div className={styles.cardTitle}>{title}</div>
    </div>
  </div>
);
