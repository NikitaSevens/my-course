import { useState } from 'react';
import styles from './CreateCourse.module.css';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
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
    category: '',
    organization: '',
    city: '',
    audience: '',
    programFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

 // const handleSubmit = (e) => {
 // e.preventDefault();
 //   const payload = new FormData();
 //   for (const key in formData) {
 //     payload.append(key, formData[key]);
 //   }
 //   // отправка на сервер (пример):
 //   fetch('/api/courses', {
 //     method: 'POST',
 //     body: payload,
 //   })
 //     .then((res) => res.json())
 //     .then((data) => {
 //       alert('Курс создан!');
 //     });
 // };
//onSubmit={handleSubmit}
  return (
    <div className={styles.container}>
      <form className={styles.form} >
        <h2>Создание курса</h2>
        <label>Название курса<input name="title" value={formData.title} onChange={handleChange} required /></label>
        <label>Описание курса<textarea name="description" value={formData.description} onChange={handleChange} required /></label>
        <label>Дата начала<input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required /></label>
        <label>Дата окончания<input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required /></label>
        <label>Продолжительность (часы)<input type="number" name="durationHours" value={formData.durationHours} onChange={handleChange} /></label>
        <label>Продолжительность (занятия)<input type="number" name="durationLessons" value={formData.durationLessons} onChange={handleChange} /></label>

        <label>Вид программы
          <select name="programType" value={formData.programType} onChange={handleChange}>
            <option value="">Выберите</option>
            <option>Базовая страка</option>
            <option>Дополнительные образовательные программы</option>
            <option>Профессиональная подготовка</option>
            <option>Повышение квалификации</option>
            <option>Переподготовка</option>
            <option>Профессиональная переподготовка</option>
          </select>
        </label>

        <label>Форма обучения
          <select name="studyForm" value={formData.studyForm} onChange={handleChange}>
            <option value="">Выберите</option>
            <option>Очная</option>
            <option>Онлайн</option>
          </select>
        </label>

        <label>Изображение курса<input type="text" placeholder="Ссылка или выберите файл" name="image" value={formData.image} onChange={handleChange} /></label>
        <label>Файл или изображение<input type="file" name="imageFile" accept="image/*" onChange={handleChange} /></label>

        <label>Стоимость<input type="number" name="price" value={formData.price} onChange={handleChange} /></label>

        <label>Компетенция
          <select name="competence" value={formData.competence} onChange={handleChange}>
            <option>Нет компетенции</option>
            <option>Разработка виртуальной и дополненной реальности</option>
            <option>Электромонтаж</option>
            <option>Цифровое производство</option>
            <option>Цифровое земледелие</option>
            <option>Фрезерные работы на станках с ЧПУ</option>
            <option>Сельскохозяйственные биотехнологии</option>
            <option>Токарные работы на станках с ЧПУ</option>
            <option>Сантехника и отопление</option>
            <option>Реверсивный инжиниринг</option>
            <option>Разработка мобильных приложений</option>
            <option>Быстрое прототипирование</option>
            <option>Промышленный дизайн</option>
            <option>Полиграфические технологии</option>
            <option>Мехатроника</option>
            <option>Менеджер по работе с персоналом</option>
            <option>Лазерные технологии</option>
            <option>Корпоративная защита от внутренних угроз ИБ</option>
            <option>Интернет вещей</option>
            <option>Графический дизайн</option>
            <option>Визуальный мерчендайзинг</option>
            <option>Профориентационные мероприятия</option>
            <option>Выпускники</option>
          </select>
        </label>

        <label>Направление
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Нет категории</option>
            <option>ИКТ</option>
            <option>Образование</option>
            <option>Производство и инженерные технологии</option>
            <option>Строительство и строительные технологии</option>
            <option>Сфера услуг</option>
            <option>Творчество и дизайн</option>
            <option>Транспорт и логистика</option>
          </select>
        </label>

        <label>Подробная программа<input type="file" name="programFile" accept="application/pdf" onChange={handleChange} /></label>

        <label>Организация
          <select name="organization" value={formData.organization} onChange={handleChange}>
            <option value="">Выберите</option>
            <option>ГБПОУ СО «Ртищевский политехнический лицей»</option>
            <option>ГБПОУ СО «Питерский агропромышленный лицей»</option>
            <option>ГАПОУ СО «Озинский техникум строительных технологий и сервиса»</option>
            
          </select>
        </label>

        <label>Город<input name="city" value={formData.city} onChange={handleChange} /></label>

        <label>Слушатели
          <select name="audience" value={formData.audience} onChange={handleChange}>
            <option>Школьники</option>
            <option>Студенты</option>
            <option>Взрослое население</option>
          </select>
        </label>

        <button type="submit">Создать курс</button>
      </form>
    </div>
  );
};

export default CreateCourse;
