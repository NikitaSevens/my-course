// src/components/EnrollPopup.tsx
import styles from './EnrollPopup.module.css';
import mockCourses from '';

const EnrollPopup = ({ onClose, selectedCourse }: any) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3>Запись на курс</h3>
        <form>
          <input type="text" placeholder="Ваше имя" required />
          <input type="email" placeholder="Email" required />

          <select defaultValue={selectedCourse?.title || ''}>
            <option value="">Выберите курс</option>
            {mockCourses.map(course => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>

          <button type="submit">Отправить</button>
        </form>
        <button className={styles.closeBtn} onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default EnrollPopup;
