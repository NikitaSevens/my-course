// src/components/CreateCourse/CreateCourse.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './CreateCourse.module.css';
import { Course } from '../../types/course';

const CreateCourse: React.FC = () => {
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(0);
  const [fullText, setFullText] = useState('');
  const [groupInput, setGroupInput] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<Course | null>(null);

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  const validateGroup = (group: string) => {
    const regex = /^[А-Я0-9]{1,5}$/;
    return regex.test(group);
  };

  const handleAddGroup = () => {
    const trimmed = groupInput.trim().toUpperCase();
    if (validateGroup(trimmed) && !selectedGroups.includes(trimmed)) {
      const updatedGroups = [...selectedGroups, trimmed];
      setSelectedGroups(updatedGroups);
      setGroupInput('');
    }
  };

  const handleGroupInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddGroup();
    }
  };

  const removeGroup = (group: string) => {
    const updated = selectedGroups.filter(g => g !== group);
    setSelectedGroups(updated);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (!title || !description || !date || selectedGroups.length === 0) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const newCourse: Course = {
      id: Date.now().toString(),
      image,
      title,
      description,
      date,
      groups: selectedGroups,
      limit,
      fullText
    };

    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    resetForm();
  };

  const resetForm = () => {
    setImage('');
    setTitle('');
    setDescription('');
    setDate('');
    setSelectedGroups([]);
    setLimit(0);
    setFullText('');
  };

  const handleDelete = (id: string) => {
    const updated = courses.filter(course => course.id !== id);
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  const handleEdit = (course: Course) => {
    // Удаляем курс
    handleDelete(course.id);
    // Заполняем форму его данными
    setImage(course.image);
    setTitle(course.title);
    setDescription(course.description);
    setDate(course.date);
    setSelectedGroups(course.groups);
    setLimit(course.limit);
    setFullText(course.fullText);
  };

  const handleView = (course: Course) => {
    setPopupContent(course);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Создать курс</h1>
      <div className={styles.container}>
        {/* Блок слева — список курсов */}
        

        {/* Блок справа — создание курса */}
        <div className={styles.rightPanel}>
          <div className={styles.upload}>
            <label className={styles.uploadBox}>
              {image ? <img src={image} alt="preview" /> : '+'}
              <input type="file" onChange={handleFileUpload} hidden />
            </label>
            <input
              type="text"
              placeholder="Или вставьте URL изображения"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={styles.input}
            />
          </div>

          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />

          <textarea
            placeholder="Краткое описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
          />

          <div className={styles.groups}>
            <p>Группы:</p>
            <div className={styles.groupTagInput}>
              <input
                type="text"
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
                onKeyDown={handleGroupInputKeyDown}
                placeholder="Введите группу и нажмите Enter"
                className={styles.input}
              />
              <div className={styles.tagList}>
                {selectedGroups.map((group) => (
                  <span key={group} className={styles.tag}>
                    {group}
                    <button type="button" onClick={() => removeGroup(group)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <input
            type="number"
            placeholder="Макс. количество человек"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className={styles.input}
          />

          <textarea
            placeholder="Полное описание курса"
            value={fullText}
            onChange={(e) => setFullText(e.target.value)}
            className={styles.fullText}
          />

          <button className={styles.createBtn} onClick={handleCreate}>
            Создать курс
          </button>
        </div>
      </div>

      {/* Попап */}
      {showPopup && popupContent && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <h2>{popupContent.title}</h2>
            <p>{popupContent.fullText}</p>
            <button onClick={closePopup}>Закрыть</button>
          </div>
        </div>
      )}
      <div className={styles.leftPanel}>
          <h2>Список курсов:</h2>
          <div className={styles.courseList}>
            {courses.map(course => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseImage}>
                  {course.image ? <img src={course.image} alt={course.title} /> : <div>Нет изображения</div>}
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>Дата: {course.date}</p>
                <button onClick={() => handleView(course)}>Смотреть</button>
                <button onClick={() => handleEdit(course)}>Изменить</button>
                <button onClick={() => handleDelete(course.id)}>Удалить</button>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default CreateCourse;
