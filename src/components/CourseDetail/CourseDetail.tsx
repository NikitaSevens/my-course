import { motion, AnimatePresence } from "framer-motion";
import styles from "./CourseDetail.module.css";
import  { Course } from '../CourseCard/CourseCard';

const CourseDetail = ({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.card}>
          <button onClick={onClose} className={styles.closeBtn}>×</button>
          <h2>{course.title}</h2>
          <p><strong>Описание:</strong> {course.description}</p>
          <p><strong>Дата начала:</strong> {course.startDate}</p>
          <p><strong>Дата окончания:</strong> {course.endDate}</p>
          <p><strong>Цена:</strong> {course.price} ₽</p>
          <p><strong>Форма обучения:</strong> {course.studyForm}</p>
          <p><strong>Город:</strong> {course.city}</p>
          <a href={course.programFile} target="_blank" rel="noopener noreferrer">
            📄 Скачать программу
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseDetail;
