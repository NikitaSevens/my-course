// src/components/EnrollPopup.tsx
import { useState, useEffect } from 'react';
import styles from './EnrollPopup.module.css';
import mockCourses from '../../mock/courses';

interface EnrollPopupProps {
  onClose: () => void;
  selectedCourse: any;
}

const EnrollPopup = ({ onClose, selectedCourse }: EnrollPopupProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    if (selectedCourse) {
      setSelectedCourseTitle(selectedCourse.title);
      setAvailableGroups(selectedCourse.groups || []);
    }
  }, [selectedCourse]);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseTitle = e.target.value;
    setSelectedCourseTitle(courseTitle);
    const foundCourse = mockCourses.find(course => course.title === courseTitle);
    setAvailableGroups(foundCourse ? foundCourse.groups : []);
    setSelectedGroup(''); // Сброс выбора группы
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !age || !selectedCourseTitle || !selectedGroup) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const newEnroll = {
      id: Date.now(),
      name,
      email,
      age,
      course: selectedCourseTitle,
      group: selectedGroup,
    };

    const storedEnrollments = localStorage.getItem('enrollments');
    const enrollments = storedEnrollments ? JSON.parse(storedEnrollments) : [];

    enrollments.push(newEnroll);
    localStorage.setItem('enrollments', JSON.stringify(enrollments));

    alert('Вы успешно записались на курс!');
    onClose(); // Закрываем попап после отправки
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Запись на курс</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Имя:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Почта:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Возраст:
            <input
              type="number"
              min="0"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>

          <label>
            Курс:
            <select
              value={selectedCourseTitle}
              onChange={handleCourseChange}
              required
            >
              <option value="">Выберите курс</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Группа:
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              required
            >
              <option value="">Выберите группу</option>
              {availableGroups.map((group, idx) => (
                <option key={idx} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className={styles.submitBtn}>
            Отправить
          </button>
        </form>

        <button className={styles.closeBtn} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default EnrollPopup;
