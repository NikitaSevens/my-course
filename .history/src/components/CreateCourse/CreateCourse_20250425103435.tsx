// src/components/CreateCourse/CreateCourse.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './CreateCourse.module.css';
import { Course } from '../../types/course';

const CreateCourse: React.FC = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [limit, setLimit] = useState(0);
  const [fullText, setFullText] = useState('');
  const [groupInput, setGroupInput] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [popupContent, setPopupContent] = useState<string | null>(null);

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  const validateGroup = (group: string) => /^[А-Я0-9]{1,5}$/.test(group.trim().toUpperCase());

  const handleAddGroup = () => {
    const trimmed = groupInput.trim().toUpperCase();
    if (validateGroup(trimmed) && !selectedGroups.includes(trimmed)) {
      const updated = [...selectedGroups, trimmed];
      setSelectedGroups(updated);
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
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (!title || !description || !date || selectedGroups.length === 0) {
      alert('Пожалуйста, заполните все поля');
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

    const updated = [...courses, newCourse];
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
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

  const handleEdit = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;

    handleDelete(id); // удаляем старый
    setImage(course.image);
    setTitle(course.title);
    setDescription(course.description);
    setDate(course.date);
    setSelectedGroups(course.groups);
    setLimit(course.limit);
    setFullText(course.fullText);
  };

  const openPopup = (text: string) => setPopupContent(text);
  const closePopup = () => setPopupContent(null);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Создать курс</h1>
      <div className={styles.container}>
        {/* Левая часть — форма */}
        <div className={styles.leftPanel}>
          <div className={styles.uploadBox}>
            {image ? <img src={image} alt="preview" /> : '+'}
            <input type="file" onChange={handleFileUpload} hidden />
          </div>
          <input
            className={styles.input}
            type="text"
            placeholder="Или вставьте URL изображения"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.textarea}
            placeholder="Краткое описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className={styles.input}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className={styles.groups}>
            <p>Группы:</p>
            <input
              className={styles.input}
              type="text"
              value={groupInput}
              onChange={(e) => setGroupInput(e.target.value)}
              onKeyDown={handleGroupInputKeyDown}
              placeholder="Введите группу и нажмите Enter"
            />
            <div className={styles.tagList}>
              {selectedGroups.map(group => (
                <span key={group} className={styles.tag}>
                  {group}
                  <button onClick={() => removeGroup(group)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <input
            className={styles.input}
            type="number"
            placeholder="Макс. количество человек"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          />

          <textarea
            className={styles.fullText}
            placeholder="Полное описание курса"
            value={fullText}
            onChange={(e) => setFullText(e.target.value)}
          />

          <button className={styles.createBtn} onClick={handleCreate}>
            Создать курс
          </button>
        </div>

        

      {/* Попап */}
      {popupContent && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <h2>Полное описание</h2>
            <p>{popupContent}</p>
            <button onClick={closePopup}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
