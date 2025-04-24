import { useState, useEffect } from 'react';
import styles from './EnrollPopup.module.css';
import mockCourses from '../mock/courses';

interface Course {
  id: string;
  title: string;
  img?: string;
}

interface EnrollPopupProps {
  onClose: () => void;
  selectedCourse: Course | null;
}

const EnrollPopup = ({ onClose, selectedCourse }: EnrollPopupProps) => {
  // Состояние выбранного курса (value = course.id)
  const [courseId, setCourseId] = useState<string>('');

  // При изменении selectedCourse (от карточки) — обновляем локальный стейт
  useEffect(() => {
    if (selectedCourse) {
      setCourseId(selectedCourse.id);
    }
  }, [selectedCourse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно собирать данные формы и отправлять на сервер
    console.log('Запись на курс:', {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      courseId,
    });
    onClose();
  };

  // Рефы или локальный стейт для остальных полей
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = React.createRef<HTMLInputElement>();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        <h3>Запись на курс</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Ваше имя" ref={nameRef} required />
          <input type="email" placeholder="Email" ref={emailRef} required />

          {/* Всегда показываем select, но он контролируемый */}
          <select
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            required
          >
            <option value="">Выберите курс</option>
            {mockCourses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <button type="submit">Отправить</button>
        </form>
        <button className={styles.closeBtn} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default EnrollPopup;
