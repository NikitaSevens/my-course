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
  const [birthDate, setBirthDate] = useState("");
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
  const [phone, setPhone] = useState("");
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
                  title="Имя может содержать только русские буквы и один дефис (не в начале/конце)"
                />
              </label>
              <label>
  Фамилия:
  <input
    value={surname}
    onChange={(e) => {
      const value = e.target.value;
      
      // Разрешаем: русские буквы, дефис (для двойных фамилий)
      // Запрещаем: цифры, спецсимволы (кроме дефиса), английские буквы
      const validPattern = /^[А-ЯЁа-яё-]*$/;
      
      // Проверка на запрещённые элементы
      const hasInvalidChars = 
        /[0-9]|[@#$%^&*+=∞№]|[\u2150-\u218F\u2460-\u24FF]/i.test(value) || // цифры и символы
        /[a-z]/i.test(value); // английские буквы
        
      // Проверка корректности дефиса (не в начале/конце, не повторяется)
      const hyphenCheck = !/^-|-$|--/.test(value);
      
      if (validPattern.test(value) && !hasInvalidChars && hyphenCheck) {
        setSurname(value);
      }
    }}
    required
    pattern="^[А-ЯЁ][А-ЯЁа-яё]*(?:-[А-ЯЁа-яё]+)*$"
    title="Фамилия должна содержать только русские буквы и дефис (для двойных фамилий)"
  />
</label>
              <label>
                Отчество:
                <input
                  value={patronymic}
                  onChange={(e) => setPatronymic(e.target.value)}
                />
              </label>
              <label>
                Дата рождения:
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Номер телефона:
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
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
                ИНН:
                <input value={inn} onChange={(e) => setInn(e.target.value)} />
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
