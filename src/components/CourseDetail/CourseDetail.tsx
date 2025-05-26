import { motion, AnimatePresence } from "framer-motion";
import styles from "./CourseDetail.module.css";
import { Course } from "../CourseCard/CourseCard";

const CourseDetail = ({
  course,
  onClose,
  onEnroll,
}: {
  course: Course;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className={styles.card}>
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>

          <div className={styles.topSection}>
            <div className={styles.infoLeft}>
              <h1 className={styles.title}>{course.title}</h1>

              <ul className={styles.courseMeta}>
                <li>
                  <strong>Для кого:</strong> {course.audience || "Школьники"}
                </li>
                <li>
                  <strong>Длительность программы:</strong>{" "}
                  {`${course.durationHours} часов`}
                </li>
                <li>
                  <strong>Количество занятий:</strong>{" "}
              {`${course.durationLessons} `}
                </li>
                <li>
                  <strong>Форма обучения:</strong> {course.studyForm}
                </li>
                <li>
                  <strong>Стоимость:</strong>{" "}
                  {course.price ? `${course.price} ₽` : "Бесплатно"}
                </li>
              </ul>

              <button
                onClick={() => onEnroll(course)}
                className={styles.enrollButton}
                
              >
                Записаться на курс
              </button>
            </div>

            <div className={styles.infoRight}>
              <img
                src={course.image || "/images/default-course.jpg"}
                alt={course.title}
                className={styles.courseImage}
              />
            </div>
          </div>

          <div className={styles.descriptionBlock}>
            <h2 className={styles.subTitle}>ОПИСАНИЕ</h2>
            <p>{course.description}</p>
            <p>
              <strong>Срок обучения:</strong> {course.startDate} -{" "}
              {course.endDate}
            </p>
            {course.programFile ? (
              <a
                href={course.programFile}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.programLink}
              >
                📄 СКАЧАТЬ ПРОГРАММУ
              </a>
            ) : (
              <p className={styles.noProgram}>Программа не добавлена</p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseDetail;
