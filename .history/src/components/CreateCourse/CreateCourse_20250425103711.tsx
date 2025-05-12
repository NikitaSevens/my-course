// src/components/CreateCourse/CreateCourse.tsx

import React, { useState,useEffect ChangeEvent } from 'react';
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  


  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  const validateGroup = (group: string) => {
    const regex = /^[А-Я0-9]{1,5}$/; // Только заглавные буквы и цифры, до 5 символов
    return regex.test(group);
  };

  const handleAddGroup = () => {
    const trimmed = groupInput.trim().toUpperCase();
    if (validateGroup(trimmed) && !selectedGroups.includes(trimmed)) {
      const updatedGroups = [...selectedGroups, trimmed];
      setSelectedGroups(updatedGroups);
      setGroupInput('');
      localStorage.setItem('selectedGroups', JSON.stringify(updatedGroups)); // если нужно
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
    localStorage.setItem('selectedGroups', JSON.stringify(updated)); // если нужно
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

  const handleGroupToggle = (group: string) => {
    setSelectedGroups(prev =>
      prev.includes(group)
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
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

    const storedCourses = localStorage.getItem('courses');
    const courses = storedCourses ? JSON.parse(storedCourses) : [];

    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    alert('Курс успешно создан!');
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

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Создать курс</h1>
      <div className={styles.container}>
        <div className={styles.left}>
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
        </div>

        <div className={styles.right}>
          <textarea
            placeholder="Полное описание курса"
            value={fullText}
            onChange={(e) => setFullText(e.target.value)}
            className={styles.fullText}
          />
        </div>
      </div>

      <button className={styles.createBtn} onClick={handleCreate}>
        Создать курс
      </button>
    </div>
  );
};

export default CreateCourse;
