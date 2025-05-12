import { useState, useEffect } from "react";
import styles from "./EnrollPopup.module.css";

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
  limit: number;
  fullText: string;
}

const EnrollPopup = ({ onClose, selectedCourse }: EnrollPopupProps) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [snils, setSnils] = useState("");
  const [inn, setInn] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [docSeries, setDocSeries] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [docDate, setDocDate] = useState("");
  const [docIssuedBy, setDocIssuedBy] = useState("");
  const [passportAddress, setPassportAddress] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [notLivingByPassport, setNotLivingByPassport] = useState(false);
  const [birthCertNumber, setBirthCertNumber] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState("");
  const [parentFio, setParentFio] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPassport, setParentPassport] = useState("");
  const [parentIssuedBy, setParentIssuedBy] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [fundingType, setFundingType] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      const parsedCourses: Course[] = JSON.parse(storedCourses);
      setCourses(parsedCourses);
      if (selectedCourse) {
        const found = parsedCourses.find((c) => c.id === selectedCourse.id);
        if (found) {
          setSelectedCourseTitle(found.title);
        }
      }
    }
  }, [selectedCourse]);

  const calculateAge = (birthDateStr: string): number => {
    const birthDate = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = birthDate ? calculateAge(birthDate) : null;

  // Получить минимальную дату (65 лет назад)
  const getMinDate = (): string => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 65);
    return date.toISOString().split("T")[0];
  };

  const getMaxDate = (): string => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 13);
    return date.toISOString().split("T")[0];
  };


  // Валидация даты рождения
  const validateBirthDate = (dateString: string): string | null => {
    if (!dateString) return "Дата рождения обязательна";
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 13) return "Минимальный возраст — 13 лет";
    if (age > 65) return "Максимальный возраст — 65 лет";

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validationError = validateBirthDate(value);

    setError(validationError);
    if (!validationError) {
      setBirthDate(value);
    }
  };


  const validateINN = (inn: string): boolean => {
    if (inn.length !== 12) return false;
    
    // Коэффициенты для проверки
    const weights1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    const weights2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    
    // Проверка первой контрольной цифры (11-я позиция)
    let sum1 = 0;
    for (let i = 0; i < 10; i++) {
      sum1 += parseInt(inn[i]) * weights1[i];
    }
    const controlDigit1 = (sum1 % 11) % 10;
    
    // Проверка второй контрольной цифры (12-я позиция)
    let sum2 = 0;
    for (let i = 0; i < 11; i++) {
      sum2 += parseInt(inn[i]) * weights2[i];
    }
    const controlDigit2 = (sum2 % 11) % 10;
    
    return (
      controlDigit1 === parseInt(inn[10]) && 
      controlDigit2 === parseInt(inn[11])
    );
  };


   // Проверка контрольных сумм для ИНН физ.лица (12 цифр)
  const handleChangeCount = (e: ChangeEventCount<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Оставляем только цифры
    const cleanedValue = value.replace(/\D/g, '');
    
    // Обрезаем до 12 символов
    const truncatedValue = cleanedValue.slice(0, 12);
    
    setInn(truncatedValue);
    
    // Валидация при вводе
    if (truncatedValue.length === 12 && !validateINN(truncatedValue)) {
      setError('Некорректный ИНН (проверьте правильность ввода)');
    } else {
      setError(null);
    }
  };

  const handleBlur = () => {
    // Финальная проверка при потере фокуса
    if (inn.length > 0 && inn.length < 12) {
      setError('ИНН должен содержать 12 цифр');
    }
  };
  
  // Валидация российского номера телефона
  const validatePhone = (phoneNumber: string): string | null => {
    if (!phoneNumber) return "Номер телефона обязателен";
    const cleaned = phoneNumber.replace(/\D/g, "");

    if (![10, 11].includes(cleaned.length)) {
      return "Номер должен содержать 10 или 11 цифр";
    }

    if (cleaned.length === 11 && !/^[78]/.test(cleaned)) {
      return "Код страны должен быть 7 или 8";
    }

    const operatorCode =
      cleaned.length === 10 ? cleaned.substring(0, 3) : cleaned.substring(1, 4);
    if (!/^[9]\d{2}|[348]\d{2}/.test(operatorCode)) {
      return "Некорректный код оператора";
    }

    return null;
  };

  const handleChangeOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let formattedValue = value.replace(/\D/g, "");

    if (formattedValue.length > 0) {
      formattedValue = formattedValue.match(/.{1,11}/)?.[0] || formattedValue;
      formattedValue = `+7 (${formattedValue.substring(
        1,
        4
      )}) ${formattedValue.substring(4, 7)}-${formattedValue.substring(
        7,
        9
      )}-${formattedValue.substring(9)}`;
      formattedValue = formattedValue.replace(/-\s*$/, "");
    }

    const validationError = validatePhone(formattedValue);
    setError(validationError);
    setPhone(formattedValue);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEnroll = {
      id: Date.now(),
      name,
      surname,
      patronymic,
      birthDate,
      snils,
      inn,
      citizenship,
      documentType,
      docSeries,
      docNumber,
      docDate,
      docIssuedBy,
      passportAddress,
      customAddress: notLivingByPassport ? customAddress : "",
      birthCertNumber,
      phone,
      email,
      parentFio,
      parentPhone,
      parentEmail,
      parentPassport,
      parentIssuedBy,
      parentAddress,
      fundingType,
      age: calculateAge(birthDate),
      course: selectedCourseTitle,
    };

    const storedEnrollments = localStorage.getItem("enrollments");
    const enrollments = storedEnrollments ? JSON.parse(storedEnrollments) : [];
    enrollments.push(newEnroll);
    localStorage.setItem("enrollments", JSON.stringify(enrollments));

    alert("Вы успешно записались на курс!");
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Запись на курс</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.scrollOne}>
              <label>
                Имя:
                <input
                  value={name}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Основной паттерн валидации (только русские буквы и один дефис)
                    const russianLettersAndHyphen = /^[А-ЯЁа-яё-]*$/;

                    // Проверка на запрещённые элементы
                    const hasForbidden =
                      /[0-9]|[-]{2,}|^-|-$|[@#$%^&*+=∞№]|[\u2150-\u218F\u2460-\u24FF]/i.test(
                        value
                      ) || // цифры и символы
                      /[a-z]/i.test(value); // английские буквы

                    if (russianLettersAndHyphen.test(value) && !hasForbidden) {
                      setName(value);
                    }
                  }}
                  required
                  pattern="^[А-ЯЁ][А-ЯЁа-яё]*(?:-[А-ЯЁа-яё]+)*$"
                  title="С заглавной буквы, исключая [0-9] так же [@#$%^&*+=∞№] и [a-z] "
                />
              </label>
              <label>
                Фамилия:
                <input
                  value={surname}
                  onChange={(e) => {
                    const value = e.target.value;
                    const validPattern = /^[А-ЯЁа-яё-]*$/;

                    // Проверка на запрещённые элементы
                    const hasInvalidChars =
                      /[0-9]|[@#$%^&*+=∞№]|[\u2150-\u218F\u2460-\u24FF]/i.test(
                        value
                      ) || // цифры и символы
                      /[a-z]/i.test(value); // английские буквы

                    // Проверка корректности дефиса (не в начале/конце, не повторяется)
                    const hyphenCheck = !/^-|-$|--/.test(value);

                    if (
                      validPattern.test(value) &&
                      !hasInvalidChars &&
                      hyphenCheck
                    ) {
                      setSurname(value);
                    }
                  }}
                  required
                  pattern="^[А-ЯЁ][А-ЯЁа-яё]*(?:-[А-ЯЁа-яё]+)*$"
                  title="С заглавной буквы, исключая [0-9] так же[@#$%^&*+=∞№] и [a-z] "
                />
              </label>
              <label>
                Отчество:
                <input
                  value={patronymic}
                  onChange={(e) => {
                    const value = e.target.value;
                    const validPattern = /^[А-ЯЁа-яё-]*$/;
                    const hasInvalidChars =
                      /[0-9]|[@#$%^&*+=∞№]|[\u2150-\u218F\u2460-\u24FF]/i.test(
                        value
                      ) || /[a-z]/i.test(value);
                    const isValidHyphen = !/^-|-$|--/.test(value);
                    if (
                      validPattern.test(value) &&
                      !hasInvalidChars &&
                      isValidHyphen
                    ) {
                      setPatronymic(value);
                    }
                  }}
                  pattern="^[А-ЯЁ][А-ЯЁа-яё]*(?:-[А-ЯЁа-яё]+)*$"
                  title="С заглавной буквы, исключая [0-9] так же [@#$%^&*+=∞№] и [a-z] "
                />
              </label>
              <label>
                Дата рождения:
                <input
                  type="date"
                  value={birthDate}
                  onChange={handleChange}
                  required
                  min={getMinDate()}
                  max={getMaxDate()}
                  className={error ? "error" : ""}
                />
                {error && <div className="error-message">{error}</div>}
              </label>
              <label>
                Номер телефона:
                <input
                  type="tel"
                  value={phone}
                  onChange={handleChangeOne}
                  required
                  placeholder="+7 (___) ___-__-__"
                  maxLength={18} // Для форматированного номера
                  className={error ? "error" : ""}
                />
                {error && <div className="error-message">{error}</div>}
              </label>
              <label>
                Электронная почта:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                СНИЛС:
                <input
                  value={snils}
                  onChange={(e) => {
                    const cleanedValue = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 11);
                    setSnils(cleanedValue);
                  }}
                  maxLength={11} //
                  type="text" //
                  inputMode="numeric" //
                />
              </label>
              <label>
      ИНН (физ. лица):
      <input
        type="text"
        value={inn}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="12 цифр"
        maxLength={12}
        inputMode="numeric"
        className={error ? 'error' : ''}
      />
      {error && <div className="error-message">{error}</div>}
      {!error && inn.length === 12 && (
        <div className="success-message">ИНН введён корректно</div>
      )}
    </label>
              <label>
                Гражданство:
                <input
                  value={citizenship}
                  onChange={(e) => setCitizenship(e.target.value)}
                />
              </label>
              <label>
                Наименование программы:
                <select
                  value={selectedCourseTitle}
                  onChange={(e) => setSelectedCourseTitle(e.target.value)}
                  required
                >
                  <option value="">Выберите курс</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.title}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Тип финансирования:
                <select
                  value={fundingType}
                  onChange={(e) => setFundingType(e.target.value)}
                  required
                >
                  <option value="">Выберите</option>
                  <option value="budget">Бюджет</option>
                  <option value="commercial">Коммерция</option>
                </select>
              </label>
            </div>

            <div className={styles.scrollTwo}>
              <label>
                Документ:
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  required
                >
                  <option value="">Выберите</option>
                  <option value="passport">Паспорт</option>
                  <option value="birthCert">Свидетельство о рождении</option>
                </select>
              </label>

              {documentType === "passport" && (
                <>
                  <label>
                    Серия:
                    <input
                      value={docSeries}
                      onChange={(e) => setDocSeries(e.target.value)}
                    />
                  </label>
                  <label>
                    Номер:
                    <input
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                    />
                  </label>
                  <label>
                    Дата выдачи:
                    <input
                      type="date"
                      value={docDate}
                      onChange={(e) => setDocDate(e.target.value)}
                    />
                  </label>
                  <label>
                    Кем выдан:
                    <input
                      value={docIssuedBy}
                      onChange={(e) => setDocIssuedBy(e.target.value)}
                    />
                  </label>
                  <label>
                    Адрес регистрации:
                    <input
                      value={passportAddress}
                      onChange={(e) => setPassportAddress(e.target.value)}
                    />
                  </label>
                  <label>
                    <p>
                      Проживаю не по паспорту
                      <input
                        type="checkbox"
                        checked={notLivingByPassport}
                        onChange={(e) =>
                          setNotLivingByPassport(e.target.checked)
                        }
                      />
                    </p>
                  </label>
                  {notLivingByPassport && (
                    <label>
                      Адрес фактического проживания:
                      <input
                        value={customAddress}
                        onChange={(e) => setCustomAddress(e.target.value)}
                      />
                    </label>
                  )}
                  {age !== null && age < 18 && (
                    <>
                      <label>
                        ФИО родителя:
                        <input
                          value={parentFio}
                          onChange={(e) => setParentFio(e.target.value)}
                        />
                      </label>
                      <label>
                        Номер телефона родителя:
                        <input
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                        />
                      </label>
                      <label>
                        Электронная почта родителя:
                        <input
                          type="email"
                          value={parentEmail}
                          onChange={(e) => setParentEmail(e.target.value)}
                        />
                      </label>
                      <label>
                        Серия и номер паспорта родителя:
                        <input
                          maxLength={10}
                          value={parentPassport}
                          onChange={(e) => {
                            const onlyDigits = e.target.value.replace(
                              /\D/g,
                              ""
                            );
                            setParentPassport(onlyDigits);
                          }}
                        />
                      </label>
                      <label>
                        Кем и когда выдан паспорт:
                        <input
                          value={parentIssuedBy}
                          onChange={(e) => setParentIssuedBy(e.target.value)}
                        />
                      </label>
                      <label>
                        Адрес проживания родителя:
                        <input
                          value={parentAddress}
                          onChange={(e) => setParentAddress(e.target.value)}
                        />
                      </label>
                    </>
                  )}
                </>
              )}

              {documentType === "birthCert" && (
                <>
                  <label>
                    Номер свидетельства:
                    <input
                      value={birthCertNumber}
                      onChange={(e) => setBirthCertNumber(e.target.value)}
                    />
                  </label>
                  <label>
                    Адрес регистрации:
                    <input
                      value={passportAddress}
                      onChange={(e) => setPassportAddress(e.target.value)}
                    />
                  </label>
                  {notLivingByPassport && (
                    <label>
                      Адрес фактического проживания:
                      <input
                        value={customAddress}
                        onChange={(e) => setCustomAddress(e.target.value)}
                      />
                    </label>
                  )}
                  <label>
                    ФИО родителя:
                    <input
                      value={parentFio}
                      onChange={(e) => setParentFio(e.target.value)}
                    />
                  </label>
                  <label>
                    Номер телефона родителя:
                    <input
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                    />
                  </label>
                  <label>
                    Электронная почта родителя:
                    <input
                      type="email"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                    />
                  </label>
                  <label>
                    Серия и номер паспорта родителя:
                    <input
                      maxLength={10}
                      value={parentPassport}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        setParentPassport(onlyDigits);
                      }}
                    />
                  </label>
                  <label>
                    Кем и когда выдан паспорт:
                    <input
                      value={parentIssuedBy}
                      onChange={(e) => setParentIssuedBy(e.target.value)}
                    />
                  </label>
                  <label>
                    Адрес проживания родителя:
                    <input
                      value={parentAddress}
                      onChange={(e) => setParentAddress(e.target.value)}
                    />
                  </label>
                </>
              )}
            </div>
          </div>

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
