import { useState } from 'react';
import styles from './CreateCourse.module.css';

const initialForm = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  durationHours: '',
  durationLessons: '',
  programType: '',
  studyForm: '',
  image: '',
  price: '',
  competence: '',
  direction: '',
  programFile: null as File | null,
  organization: '',
  city: '',
  audience: '',
};

type FormKeys = keyof typeof initialForm;

const CreateCourse = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name as FormKeys]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, programFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация, можно дополнить
    if (!form.title || !form.startDate || !form.endDate) {
      setError('Пожалуйста, заполните обязательные поля');
      return;
    }

    const courseData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) {
        courseData.append(key, value as string | Blob);
      }
    });

    // Пример запроса:
    // fetch('/api/courses', {
    //   method: 'POST',
    //   body: courseData
    // })

    console.log('Course data:', Object.fromEntries(courseData));
    setError('');
    alert('Курс отправлен (демо)');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Создание курса</h2>
        {error && <div className={styles.error}>{error}</div>}

        <label className={styles.field}>
          Название программы
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label className={styles.field}>
          Описание
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
        </label>

        <div className={styles.row}>
          <label className={styles.field}>
            Дата начала
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
          </label>
          <label className={styles.field}>
            Дата окончания
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
          </label>
        </div>

        <div className={styles.row}>
          <label className={styles.field}>
            Часов
            <input name="durationHours" type="number" value={form.durationHours} onChange={handleChange} />
          </label>
          <label className={styles.field}>
            Занятий
            <input name="durationLessons" type="number" value={form.durationLessons} onChange={handleChange} />
          </label>
        </div>

        <label className={styles.field}>
          Вид программы
          <select name="programType" value={form.programType} onChange={handleChange}>
            <option value="">Выберите</option>
            <option>Базовая страка</option>
            <option>Дополнительные образовательные программы</option>
            <option>Профессиональная подготовка</option>
            <option>Повышение квалификации</option>
            <option>Профессиональная переподготовка</option>
          </select>
        </label>

        <label className={styles.field}>
          Форма обучения
          <select name="studyForm" value={form.studyForm} onChange={handleChange}>
            <option value="">Выберите</option>
            <option>Очная</option>
            <option>Онлайн</option>
          </select>
        </label>

        <label className={styles.field}>
          Ссылка на изображение курса
          <input name="image" value={form.image} onChange={handleChange} />
        </label>

        <label className={styles.field}>
          Стоимость (₽)
          <input name="price" type="number" value={form.price} onChange={handleChange} />
        </label>

        <label className={styles.field}>
          Компетенция
          <select name="competence" value={form.competence} onChange={handleChange}>
            <option value="">Выберите</option>
            <option>Разработка виртуальной и дополненной реальности</option>
            <option>Электромонтаж</option>
            <option>Цифровое производство</option>
            <option>Цифровое земледелие</option>
            <option>Цифровое производство</option>
            <option>Цифровое производство</option>
            <option>Цифровое производство</option>
            <option>Цифровое производство</option>
            <option>Цифровое производство</option>
            <option>Цифровое производство</option>
            <option>Цифровое производство</option>
            
          </select>
        </label>

        <label className={styles.field}>
          Направление
          <select name="direction" value={form.direction} onChange={handleChange}>
            <option value="">Выберите</option>
            <option>ИКТ</option>
            <option>Производство и инженерные технологии</option>
            <option>Образование</option>
            <option>Сфера услуг</option>
          </select>
        </label>

        <label className={styles.field}>
          Программа (PDF)
          <input name="programFile" type="file" accept=".pdf" onChange={handleFileChange} />
        </label>

        <label className={styles.field}>
          Организация
          <select name="organization" value={form.organization} onChange={handleChange}>
            <option value="">Выберите</option>
            <option>ГБПОУ СО «Ртищевский политехнический лицей»</option>
            <option>ГАПОУ СО «Губернаторский колледж»</option>
            
          </select>
        </label>

        <label className={styles.field}>
          Город
          <input name="city" value={form.city} onChange={handleChange} />
        </label>

        <label className={styles.field}>
          Слушатели
          <select name="audience" value={form.audience} onChange={handleChange}>
            <option value="">Выберите</option>
            <option>Школьники</option>
            <option>Студенты</option>
            <option>Взрослое население</option>
          </select>
        </label>

        <button className={styles.submit} type="submit">Создать курс</button>
      </form>
    </div>
  );
};

export default CreateCourse;
