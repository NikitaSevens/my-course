import { useState, useEffect } from 'react';
import styles from './EnrollPopup.module.css';

interface EnrollPopupProps {
  onClose: () => void;
  selectedCourse: any;
}

interface Course {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  groups: string[];
  limit: number;
  fullText: string;
}

const EnrollPopup = ({ onClose, selectedCourse }: EnrollPopupProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      const parsedCourses: Course[] = JSON.parse(storedCourses);
      setCourses(parsedCourses);
  
      if (selectedCourse) {
        const found = parsedCourses.find(c => c.id === selectedCourse.id);
        if (found) {
          setSelectedCourseTitle(found.title);
          setAvailableGroups(found.groups || []);
          if (found.groups?.length > 0) {
            setSelectedGroup(found.groups[0]); // ✅ автоустановка
          }
        }
      }
    }
  }, [selectedCourse]);
  

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseTitle = e.target.value;
    setSelectedCourseTitle(courseTitle);
    const foundCourse = courses.find(course => course.title === courseTitle);
    setAvailableGroups(foundCourse?.groups || []);
    setSelectedGroup('');
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
    onClose();
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
              min="15"
              
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
              {courses.map(course => (
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
