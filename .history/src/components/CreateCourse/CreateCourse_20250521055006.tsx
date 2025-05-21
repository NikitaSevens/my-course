import { useState } from "react";
import styles from "./CreateCourse.module.css";





const initialForm = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  durationHours: "",
  durationLessons: "",
  programType: "",
  studyForm: "",
  image: "",
  price: "",
  competence: "",
  direction: "",
  programFile: null as File | null,
  organization: "",
  city: "",
  audience: "",
};

type FormKeys = keyof typeof initialForm;

const CreateCourse = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [image, setImage] = useState('');
const [imageFile, setImageFile] = useState<File | null>(null);
const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name as FormKeys]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, programFile: file }));
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setImageFile(file);
    setImage(''); // если выбрали файл, очищаем ссылку
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl); // обновляем превью
  }
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация, можно дополнить
    if (!form.title || !form.startDate || !form.endDate) {
      setError("Пожалуйста, заполните обязательные поля");
      return;
    }

    const courseData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) {
        courseData.append(key, value as string | Blob);
      }
    });
    
    if (imageFile) {
  courseData.append('image', imageFile);
} else if (image) {
  courseData.append('image', image); // строка URL
}

    // Пример запроса:
    // fetch('/api/courses', {
    //   method: 'POST',
    //   body: courseData
    // })

    console.log("Course data:", Object.fromEntries(courseData));
    setError("");
    alert("Курс отправлен (демо)");
  };

  return (
    <div className={styles.container}>
        <div className={styles.upload}>
          <label className={styles.uploadBox}>
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <span className={styles.plus}>+</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              hidden
            />
          </label>

          <input
            type="text"
            placeholder="Или вставьте URL изображения"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setPreview(e.target.value); // Показываем превью из URL
              setImageFile(null); // если вручную ввели URL, сбрасываем файл
            }}
            className={styles.input}
          />
        </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Создание курса</h2>
        {error && <div className={styles.error}>{error}</div>}

        <label className={styles.field}>
          Название программы
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          Описание
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <div className={styles.row}>
          <label className={styles.field}>
            Дата начала
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </label>
          <label className={styles.field}>
            Дата окончания
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.row}>
          <label className={styles.field}>
            Часов
            <input
              name="durationHours"
              type="number"
              value={form.durationHours}
              onChange={handleChange}
            />
          </label>
          <label className={styles.field}>
            Занятий
            <input
              name="durationLessons"
              type="number"
              value={form.durationLessons}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className={styles.field}>
          Вид программы
          <select
            name="programType"
            value={form.programType}
            onChange={handleChange}
          >
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
          <select
            name="studyForm"
            value={form.studyForm}
            onChange={handleChange}
          >
            <option value="">Выберите</option>
            <option>Очная</option>
            <option>Онлайн</option>
          </select>
        </label>


        <label className={styles.field}>
          Стоимость (₽)
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label className={styles.field}>
          Компетенция
          <select
            name="competence"
            value={form.competence}
            onChange={handleChange}
          >
            <option value="">Выберите</option>
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
            <option>
              Корпоративная защита от внутренних угроз информационной
              безопасности
            </option>
            <option>Интернет вещей</option>
            <option>Графический дизайн</option>
            <option>Визуальный мерчендайзинг</option>
            <option>Профориентационные мероприятия</option>
            <option>Выпускники</option>
          </select>
        </label>

        <label className={styles.field}>
          Направление
          <select
            name="direction"
            value={form.direction}
            onChange={handleChange}
          >
            <option value="">Выберите</option>
            <option>ИКТ</option>
            <option>Творчество и дизайн</option>
            <option>Транспорт и логистика</option>
            <option>Строительство и строительные технологии</option>
            <option>Производство и инженерные технологии</option>
            <option>Образование</option>
            <option>Сфера услуг</option>
          </select>
        </label>

        <label className={styles.field}>
          Программа (PDF)
          <input
            name="programFile"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </label>

        <label className={styles.field}>
          Организация
          <select
            name="organization"
            value={form.organization}
            onChange={handleChange}
          >
            <option value="">Выберите</option>
            <option>
              ГАПОУ СО «Саратовский архитектурно-строительный колледж»{" "}
            </option>
            <option>
              ГАПОУ СО «Саратовский колледж кулинарного искусства»{" "}
            </option>
            <option>
              ГАПОУ СО «Саратовский областной химико-технологический техникум»{" "}
            </option>
            <option>
              ГАПОУ СО «Саратовский областной педагогический колледж»{" "}
            </option>
            <option>
              ГАПОУ СО «Саратовский колледж промышленных технологий и
              автомобильного сервиса»{" "}
            </option>
            <option>
              ГАПОУ СО «Саратовский колледж строительства мостов и
              гидротехнических сооружений»
            </option>
            <option>ГАПОУ СО «Саратовский политехнический колледж» </option>
            <option>
              ГАПОУ СО "Саратовский колледж водного транспорта, строительства и
              сервиса"{" "}
            </option>
            <option>
              ГАПОУ СО «Саратовский техникум отраслевых технологий»{" "}
            </option>
            <option>
              ГАПОУ СО «Энгельсский механико-технологический колледж»{" "}
            </option>
            <option>ГАПОУ СО «Энгельсский политехникум» </option>
            <option>
              ГАПОУ СО «Энгельсский колледж профессиональных технологий»{" "}
            </option>
            <option>
              ГАПОУ СО «Энгельсский промышленно-экономический колледж»
            </option>
            <option>
              ГАПОУ СО «Балашовский техникум механизации сельского хозяйства»{" "}
            </option>
            <option>ГБПОУ СО «Ртищевский политехнический лицей»</option>
            <option>ГБПОУ СО «Питерский агропромышленный лицей»</option>
            <option>
              ГАПОУ СО «Озинский техникум строительных технологий и сервиса»{" "}
            </option>
            <option>ГАПОУ СО «Хвалынский агропромышленный колледж» </option>
            <option>ГБПОУ СО «Ершовский агропромышленный лицей» </option>
            <option>
              ГБПОУ СО «Краснопартизанский политехнический лицей»{" "}
            </option>
            <option>
              ГАПОУ СО «Пугачевский аграрно-технологический техникум»{" "}
            </option>
            <option>
              ГАПОУ СО «Петровский аграрно-технологический техникум»{" "}
            </option>
            <option>ГБПОУ СО «Краснокутский политехнический лицей» </option>
            <option>ГАПОУ СО «Калининский техникум агробизнеса» </option>
            <option>ГБПОУ СО «Дергачевский агропромышленный лицей» </option>
            <option>ГБПОУ СО «Балашовский политехнический лицей» </option>
            <option>
              ГБПОУ СО «Александрово-Гайский политехнический лицей»{" "}
            </option>
            <option>
              ГБПОУ СО «Ивантеевский техникум агропромышленных технологий и
              управления»{" "}
            </option>
            <option>ГАПОУ СО «Аткарский политехнический колледж» </option>
            <option>ГАПОУ СО «Губернаторский колледж» </option>
            <option>ГАПОУ СО «Вольский технологический колледж» </option>
            <option>
              ГАПОУ СО «Сельскохозяйственный техникум им.К.А.Тимирязева»{" "}
            </option>
            <option>
              ГАПОУ СО «Новоузенский агротехнологический техникум»{" "}
            </option>
            <option>ГАПОУ СО «Балаковский политехнический техникум» </option>
            <option>ГАПОУ СО «Перелюбский аграрный техникум» </option>
            <option>
              ГАПОУ СО «Базарнокарабулакский техникум агробизнеса»{" "}
            </option>
            <option>
              ГАПОУ СО «Балаковский промышленно-транспортный техникум
              им.Н.В.Грибанова»{" "}
            </option>
            <option>ГАПОУ СО «Марксовский политехнический колледж» </option>
            <option>
              ГАПОУ СО «Поволжский колледж технологий и менеджмента»
              (г.Балаково){" "}
            </option>
            <option>
              ГАПОУ СО «Вольский педагогический колледж им. Ф.И. Панферова»{" "}
            </option>
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

        <button className={styles.submit} type="submit">
          Создать курс
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
