import { useState, useEffect, ChangeEvent } from "react";
import styles from "./EnrollPopup.module.css";
import "../../index.css";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

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
  const [birthDate, setBirthDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [snils, setSnils] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [dateСertificate, setdateСertificate] = useState("");
  const [docSeries, setDocSeries] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [docDate, setDocDate] = useState("");
  const [docIssuedBy, setDocIssuedBy] = useState("");
  const [passportAddress, setPassportAddress] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [passportSuggestions, setPassportSuggestions] = useState<string[]>([]);
  const [customSuggestions, setCustomSuggestions] = useState<string[]>([]);
  const [notLivingByPassport, setNotLivingByPassport] = useState(false);
  const [birthCertNumber, setBirthCertNumber] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [parentFio, setParentFio] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentPhoneError, setParentPhoneError] = useState<string | null>(null);
  const [parentEmail, setParentEmail] = useState("");
  const [parentEmailError, setParentEmailError] = useState<string | null>(null);
  const [parentPassport, setParentPassport] = useState("");
  const [parentIssuedBy, setParentIssuedBy] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [fundingType, setFundingType] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");
  const [placeOfStudy, setPlaceOfStudy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [parentBirthCertNumber, setParentBirthCertNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adress, setAdress] = useState("");
  const [errors, setErrors] = useState({
    series: "",
    number: "",
  });

  //Переключение страниц
  const handleNext = () => setCurrentPage(2);
  const handleBack = () => setCurrentPage(1);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/courses`);
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error("Ошибка: ожидается массив курсов");
        }
      } catch (error) {
        console.error("Ошибка при загрузке курсов:", error);
      }
    };

    fetchCourses();
  }, []);
  //КЕМ ВЫДАН ПАСПОРТ
  useEffect(() => {
    const jQueryScript = document.createElement("script");
    jQueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jQueryScript.async = true;

    jQueryScript.onload = () => {
      const waitForInput = setInterval(() => {
        const input = document.getElementById("js-FMSField");
        if (input && window.jQuery) {
          clearInterval(waitForInput);

          const suggestScript = document.createElement("script");
          suggestScript.src =
            "https://www.ahunter.ru/js/min/ahunter_suggest.js";
          suggestScript.async = true;

          suggestScript.onload = () => {
            if (window.AhunterSuggest?.FMS) {
              window.AhunterSuggest.FMS.Solid({
                id: "js-FMSField",
                ahunter_url: "https://ahunter.ru/",
                empty_msg: "",
                limit: 5,
                suggest_on_focus: false,
                on_choose: function (suggestion: AhunterSuggestion) {
                  console.log("Выбрано:", suggestion.canon_name);
                  setDocIssuedBy(suggestion.canon_name); // или suggestion.ablative_name
                },
              });
            } else {
              console.warn("AhunterSuggest не загружен");
            }
          };

          document.body.appendChild(suggestScript);
        }
      }, 200);
    };

    document.body.appendChild(jQueryScript);

    return () => {
      document.body.removeChild(jQueryScript);
    };
  }, []);

  //КЕМ ВЫДАН ПАСПОРТ

  // Валидация даты рождения
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
      setdateСertificate(value);
    }
  };
  // Валидация даты рождения

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

  const handleParentPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setParentPhoneError(validationError);
    setParentPhone(formattedValue);
  };
  // Валидация российского номера телефона

  //ВАЛИДАЦИЯ EMAIL
  const validateEmail = (email: string): string | null => {
    if (!email) return "Email обязателен";

    const hasCyrillic = /[а-яА-ЯёЁ]/.test(email);
    if (hasCyrillic) return "Email не должен содержать кириллицу";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Некорректный формат email";

    return null;
  };

  const handleEmailChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    errorSetter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setter(value);
    errorSetter(validateEmail(value));
  };

  //ВАЛИДАЦИЯ EMAIL

  // Валидация серии ПАСПОРТА
  const validateSeries = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length === 0) return "";
    if (cleaned.length < 4) return "Серия должна быть 4 цифры";
    if (cleaned.length > 4) return "Не более 4 цифр";

    const region = parseInt(cleaned.substring(0, 2));
    if (region < 1 || region > 99) return "Некорректный регион выдачи";

    return "";
  };

  const validateNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length === 0) return "";
    if (cleaned.length < 6) return "Номер должен быть 6 цифр";
    if (cleaned.length > 6) return "Не более 6 цифр";

    return "";
  };

  const handleSeriesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let formatted = value.replace(/\D/g, "");
    if (formatted.length > 2) {
      formatted = `${formatted.substring(0, 2)} ${formatted.substring(2, 4)}`;
    }
    setDocSeries(formatted);
    setErrors({ ...errors, series: validateSeries(formatted) });
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setDocNumber(value);
    setErrors({ ...errors, number: validateNumber(value) });
  };
  // Валидация серии ПАСПОРТА

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // не даём повторно кликнуть

    setIsSubmitting(true); // начинаем загрузку

    const seriesError = validateSeries(docSeries);
    const numberError = validateNumber(docNumber);

    if (seriesError || numberError) {
      setErrors({ series: seriesError, number: numberError });
      setIsSubmitting(false); // ❗ сбрасываем флаг, т.к. валидация не прошла
      return;
    }

    const newEnroll = {
      id: Date.now(),
      name,
      birthDate,
      snils,
      adress,
      documentType,
      docSeries: docSeries.replace(/\s/g, ""),
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
      dateСertificate,
      fundingType,
      age: calculateAge(birthDate),
      course: selectedCourseTitle,
      placeOfStudy,
      parentBirthCertNumber,
    };

    try {
      const response = await fetch(`${apiUrl}/send-doc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEnroll),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке на сервер");
      }

      const stored = localStorage.getItem("enrollments");
      const enrollments = stored ? JSON.parse(stored) : [];
      enrollments.push(newEnroll);
      localStorage.setItem("enrollments", JSON.stringify(enrollments));

      alert("Вы успешно записались на курс!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка при отправке данных на сервер.");
    } finally {
      setIsSubmitting(false); // загрузка завершена
    }
  };

  //ЗАПРЕТ НА СКРОЛЛ
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  //ЗАПРЕТ НА СКРОЛЛ

  //ВАЛИДАЦИЯ ДЛЯ АДРЕСА ПРОЖИВАНИЯ

  const fetchPassportSuggestions = async (query: string) => {
    if (query.length < 3) return;

    try {
      const response = await axios.post(
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
        { query },
        {
          headers: {
            Authorization: `Token d879bdf34b1ff6d2c6f1bb0cf5ff0817c6135192`,
          },
        }
      );
      const suggestions = response.data.suggestions.map(
        (suggestion: any) => suggestion.value
      );
      setPassportSuggestions(suggestions);
    } catch (error) {
      console.error("Ошибка при запросе подсказок для паспорта:", error);
    }
  };

  const fetchCustomAddressSuggestions = async (query: string) => {
    if (query.length < 3) return;

    try {
      const response = await axios.post(
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
        { query },
        {
          headers: {
            Authorization: `Token d879bdf34b1ff6d2c6f1bb0cf5ff0817c6135192`,
          },
        }
      );
      const suggestions = response.data.suggestions.map(
        (suggestion: any) => suggestion.value
      );
      setCustomSuggestions(suggestions); // Устанавливаем подсказки для фактического проживания
    } catch (error) {
      console.error(
        "Ошибка при запросе подсказок для фактического проживания:",
        error
      );
    }
  };

  // Обработчик изменения в поле ввода адреса регистрации (по паспорту)
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassportAddress(value); // Обновляем значение в поле ввода
    if (!customAddress) {
      setCustomAddress(value); // Если поле фактического проживания пустое, синхронизируем
    }
    fetchPassportSuggestions(value); // Запрос подсказок для паспорта
  };

  // Обработчик изменения в поле ввода адреса фактического проживания
  const handleCustomAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAddress(value); // Обновляем значение в поле фактического проживания
    fetchCustomAddressSuggestions(value); // Запрос подсказок для фактического проживания
  };

  // Обработчик выбора адреса из подсказок (для адреса по паспорту)
  const handlePassportSelect = (address: string) => {
    setPassportAddress(address); // Обновляем поле ввода выбранным адресом
    if (!customAddress) {
      setCustomAddress(address); // Синхронизируем фактический адрес с адресом по паспорту
    }
    setPassportSuggestions([]); // Очищаем подсказки для паспорта
  };

  // Обработчик выбора адреса из подсказок (для фактического проживания)
  const handleCustomSelect = (address: string) => {
    setCustomAddress(address); // Обновляем поле ввода выбранным адресом
    setCustomSuggestions([]); // Очищаем подсказки для фактического проживания
  };
  //ВАЛИДАЦИЯ ДЛЯ АДРЕСА ПРОЖИВАНИЯ

  return (
    <div className={styles.overlay}>
      
      <div className={styles.popup}>
        
        <h2>Запись на курс</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            {currentPage === 1 && (
              <div>
                <div className={styles.scrollOne}>
                  <label>
                    ФИО:
                    <input
                      value={name}
                      onChange={(e) => {
                        const value = e.target.value;
                        const onlyRussianLetters = /^[А-ЯЁа-яё\s-]*$/;

                        const wordCount = value
                          .trim()
                          .split(/\s+/)
                          .filter(Boolean).length;

                        if (onlyRussianLetters.test(value) && wordCount <= 3) {
                          setName(value);
                        }
                      }}
                      onBlur={(e) => {
                        const formatted = e.target.value
                          .trim()
                          .replace(/\s+/g, " ")
                          .replace(
                            /(^|\s)([а-яё])/g,
                            (_, p1, p2) => p1 + p2.toUpperCase()
                          );
                        setName(formatted);
                      }}
                      required
                      pattern="^[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?(?:\s[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?)?$"
                      title="Введите ФИО полностью (3 слова) на русском языке. Каждое слово должно начинаться с заглавной буквы. Допускается дефис в словах."
                      placeholder="Иванов Иван Иванович"
                      maxLength={60}
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
                      onChange={(e) =>
                        handleEmailChange(
                          e.target.value,
                          setEmail,
                          setEmailError
                        )
                      }
                      required
                      placeholder="example@mail.com"
                      className={emailError ? "error" : ""}
                    />
                    {emailError && (
                      <div className="error-message">{emailError}</div>
                    )}
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
                      minLength={11} //
                      type="text" //
                      inputMode="numeric" //
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
                <button
                  type="button"
                  onClick={handleNext}
                  className={styles.submitBtn}
                >
                  Далее
                </button>
              </div>
            )}

            {currentPage === 2 && (
              <div>
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
                      <option value="birthCert">
                        Свидетельство о рождении
                      </option>
                    </select>
                  </label>

                  {documentType === "passport" && (
                    <>
                      <label>
                        Серия:
                        <input
                          type="text"
                          value={docSeries}
                          onChange={handleSeriesChange}
                          placeholder="12 34"
                          maxLength={5} // 4 цифры + пробел
                          inputMode="numeric"
                          className={errors.series ? "error" : ""}
                        />
                        {errors.series && (
                          <div className="error-message">{errors.series}</div>
                        )}
                      </label>
                      <label>
                        Номер:
                        <input
                          type="text"
                          value={docNumber}
                          onChange={handleNumberChange}
                          placeholder="123456"
                          maxLength={6}
                          inputMode="numeric"
                          className={errors.number ? "error" : ""}
                        />
                        {errors.number && (
                          <div className="error-message">{errors.number}</div>
                        )}
                      </label>
                      <label>
                        Дата выдачи:
                        <input
                          type="date"
                          value={docDate}
                          onChange={(e) => setDocDate(e.target.value)}
                          min={
                            birthDate
                              ? new Date(
                                  new Date(birthDate).setFullYear(
                                    new Date(birthDate).getFullYear() + 14
                                  )
                                )
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          max={new Date().toISOString().split("T")[0]} // сегодня
                        />
                      </label>
                      <label>
                        Кем выдан:
                        <input
                          id="js-FMSField"
                          type="text"
                          value={docIssuedBy ?? ""} // защищено от undefined
                          onChange={(e) => setDocIssuedBy(e.target.value)}
                          placeholder="Подразделение, выдавшее паспорт"
                        />
                      </label>
                      <label>
                        Место работы, учёбы:
                        <input
                          value={placeOfStudy}
                          onChange={(e) => setPlaceOfStudy(e.target.value)}
                          placeholder="МОУ СОШ №1 г.Саратова"
                          maxLength={100}
                        />
                      </label>
                      <label>
                        Адрес регистрации:
                        <input
                          value={passportAddress}
                          onChange={handleChangeSearch} // Обработчик изменения
                          className={styles.input}
                          placeholder="Начните вводить адрес..."
                        />
                      </label>

                      <div className={styles.suggestionsWrapper}>
                        {passportSuggestions.length > 0 && (
                          <ul className={styles.suggestionsList}>
                            {passportSuggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                onClick={() => handlePassportSelect(suggestion)} // Обработчик выбора из подсказок
                                className={styles.suggestionItem}
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {/* Остальная форма */}
                      <label className={styles.notLivingByPassport}>
                        <p>Проживаю не по паспорту</p>
                        <input
                          type="checkbox"
                          checked={notLivingByPassport}
                          onChange={(e) =>
                            setNotLivingByPassport(e.target.checked)
                          }
                        />
                      </label>
                      {notLivingByPassport && (
                        <>
                          <label>
                            Адрес фактического проживания:
                            <input
                              value={customAddress}
                              onChange={handleCustomAddressChange} // Обработчик изменения
                            />
                          </label>

                          <div className={styles.suggestionsWrapper}>
                            {customSuggestions.length > 0 && (
                              <ul className={styles.suggestionsList}>
                                {customSuggestions.map((suggestion, index) => (
                                  <li
                                    key={index}
                                    onClick={() =>
                                      handleCustomSelect(suggestion)
                                    } // Обработчик выбора из подсказок
                                    className={styles.suggestionItem}
                                  >
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </>
                      )}
                      {age !== null && age < 18 && (
                        <>
                          <label>
                            ФИО родителя:
                            <input
                              value={parentFio}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Разрешаем только русские буквы, пробелы и дефисы
                                const onlyRussianLetters = /^[А-ЯЁа-яё\s-]*$/;

                                // Проверяем количество слов (не более 3)
                                const wordCount = value
                                  .trim()
                                  .split(/\s+/)
                                  .filter(Boolean).length;

                                if (
                                  onlyRussianLetters.test(value) &&
                                  wordCount <= 3
                                ) {
                                  setParentFio(value);
                                }
                              }}
                              onBlur={(e) => {
                                // Автоматически форматируем при потере фокуса
                                const formatted = e.target.value
                                  .trim()
                                  .replace(/\s+/g, " ") // Удаляем лишние пробелы
                                  .replace(
                                    /(^|\s)([а-яё])/g,
                                    (_, p1, p2) => p1 + p2.toUpperCase()
                                  ); // Делаем первые буквы заглавными

                                setParentFio(formatted);
                              }}
                              required
                              pattern="^[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?(?:\s[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?)?$"
                              title="Введите ФИО полностью (3 слова) на русском языке. Каждое слово должно начинаться с заглавной буквы. Допускается дефис в словах."
                              placeholder="Иванов Иван Иванович"
                              maxLength={60} // Ограничение по длине
                            />
                          </label>

                          <label>
                            Номер телефона родителя:
                            <input
                              type="tel"
                              value={parentPhone}
                              onChange={handleParentPhoneChange}
                              placeholder="+7 (___) ___-__-__"
                              maxLength={18}
                              className={parentPhoneError ? "error" : ""}
                            />
                            {parentPhoneError && (
                              <div className="error-message">
                                {parentPhoneError}
                              </div>
                            )}
                          </label>

                          <label>
                            Дата рождения родителя:
                            <input
                              type="date"
                              value={parentBirthCertNumber}
                              onChange={(e) =>
                                setParentBirthCertNumber(e.target.value)
                              }
                              max={new Date().toISOString().split("T")[0]}
                              required
                            />
                          </label>

                          <label>
                            Электронная почта родителя:
                            <input
                              type="email"
                              value={parentEmail}
                              onChange={(e) =>
                                handleEmailChange(
                                  e.target.value,
                                  setParentEmail,
                                  setParentEmailError
                                )
                              }
                              required
                              placeholder="example@mail.com"
                              className={parentEmailError ? "error" : ""}
                            />
                            {parentEmailError && (
                              <div className="error-message">
                                {parentEmailError}
                              </div>
                            )}
                          </label>

                          <label>
                            Серия и номер паспорта родителя:
                            <input
                              maxLength={11} // 10 цифр + 1 пробел
                              value={parentPassport}
                              onChange={(e) => {
                                const onlyDigits = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 10);
                                const formatted =
                                  onlyDigits.length > 4
                                    ? `${onlyDigits.slice(
                                        0,
                                        4
                                      )} ${onlyDigits.slice(4)}`
                                    : onlyDigits;

                                setParentPassport(formatted);
                              }}
                            />
                          </label>

                          <label>
                            Кем и когда выдан паспорт:
                            <input
                              value={parentIssuedBy}
                              onChange={(e) =>
                                setParentIssuedBy(e.target.value)
                              }
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
                        Номер и серия свидетельства:
                        <input
                          value={birthCertNumber}
                          onChange={(e) => setBirthCertNumber(e.target.value)}
                          placeholder="III-AH №222222"
                        />
                      </label>
                      <label>
                        Дата выдачи:
                        <input
                          type="date"
                          value={dateСertificate}
                          onChange={handleChange}
                          required
                          min={getMinDate()}
                          max={getMaxDate()}
                          className={error ? "error" : ""}
                        />
                        {error && <div className="error-message">{error}</div>}
                      </label>
                      <label>
                        Место гос. регистрации:
                        <input
                          value={passportAddress}
                          onChange={(e) => setPassportAddress(e.target.value)}
                        />
                      </label>
                      <label>
                        Адрес фактического проживания:
                        <input
                          value={adress}
                          onChange={(e) => setAdress(e.target.value)}
                          placeholder="г. Cаратов, ул. Ленина, д. 10, кв. 5"
                        />
                      </label>

                      <label>
                        Место работы, учёбы:
                        <input
                          value={placeOfStudy}
                          onChange={(e) => setPlaceOfStudy(e.target.value)}
                          placeholder="МОУ СОШ №1 г.Саратова"
                          maxLength={100}
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
                          onChange={(e) => {
                            const value = e.target.value;
                            // Разрешаем только русские буквы, пробелы и дефисы
                            const onlyRussianLetters = /^[А-ЯЁа-яё\s-]*$/;

                            // Проверяем количество слов (не более 3)
                            const wordCount = value
                              .trim()
                              .split(/\s+/)
                              .filter(Boolean).length;

                            if (
                              onlyRussianLetters.test(value) &&
                              wordCount <= 3
                            ) {
                              setParentFio(value);
                            }
                          }}
                          onBlur={(e) => {
                            // Автоматически форматируем при потере фокуса
                            const formatted = e.target.value
                              .trim()
                              .replace(/\s+/g, " ") // Удаляем лишние пробелы
                              .replace(
                                /(^|\s)([а-яё])/g,
                                (_, p1, p2) => p1 + p2.toUpperCase()
                              ); // Делаем первые буквы заглавными

                            setParentFio(formatted);
                          }}
                          required
                          pattern="^[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?(?:\s[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?)?$"
                          title="Введите ФИО полностью (3 слова) на русском языке. Каждое слово должно начинаться с заглавной буквы. Допускается дефис в словах."
                          placeholder="Иванов Иван Иванович"
                          maxLength={60} // Ограничение по длине
                        />
                      </label>
                      <label>
                        Номер телефона родителя:
                        <input
                          type="tel"
                          value={parentPhone}
                          onChange={handleParentPhoneChange}
                          placeholder="+7 (___) ___-__-__"
                          maxLength={18}
                          className={parentPhoneError ? "error" : ""}
                        />
                        {parentPhoneError && (
                          <div className="error-message">
                            {parentPhoneError}
                          </div>
                        )}
                      </label>
                      <label>
                        Электронная почта родителя:
                        <input
                          type="email"
                          value={parentEmail}
                          onChange={(e) =>
                            handleEmailChange(
                              e.target.value,
                              setParentEmail,
                              setParentEmailError
                            )
                          }
                          required
                          placeholder="example@mail.com"
                          className={parentEmailError ? "error" : ""}
                        />
                        {parentEmailError && (
                          <div className="error-message">
                            {parentEmailError}
                          </div>
                        )}
                      </label>

                      <label>
                        Серия и номер паспорта родителя:
                        <input
                          maxLength={11} // 10 цифр + 1 пробел
                          value={parentPassport}
                          placeholder="1234 123456"
                          onChange={(e) => {
                            const onlyDigits = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);
                            const formatted =
                              onlyDigits.length > 4
                                ? `${onlyDigits.slice(0, 4)} ${onlyDigits.slice(
                                    4
                                  )}`
                                : onlyDigits;

                            setParentPassport(formatted);
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
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.submitBtn}
                >
                  Назад
                </button>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </button>
              </div>
            )}
          </div>
        </form>
        <img
          className={styles.closeBtn}
          onClick={onClose}
          src="/images/exit.svg"
          alt="Закрыть"
        />
      </div>
    </div>
  );
};

export default EnrollPopup;
