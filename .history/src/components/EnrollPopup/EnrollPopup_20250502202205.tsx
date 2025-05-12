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
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [snils, setSnils] = useState('');
  const [inn, setInn] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [docSeries, setDocSeries] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [docDate, setDocDate] = useState('');
  const [docIssuedBy, setDocIssuedBy] = useState('');
  const [passportAddress, setPassportAddress] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [notLivingByPassport, setNotLivingByPassport] = useState(false);
  const [birthCertNumber, setBirthCertNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [parentFio, setParentFio] = useState('');
  const [parentPassport, setParentPassport] = useState('');
  const [parentIssuedBy, setParentIssuedBy] = useState('');
  const [parentAddress, setParentAddress] = useState('');
  const [fundingType, setFundingType] = useState('');
  const [email, setEmail] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
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
          if (found.groups?.length > 0) setSelectedGroup(found.groups[0]);
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
      customAddress: notLivingByPassport ? customAddress : '',
      birthCertNumber,
      phone,
      parentFio,
      parentPassport,
      parentIssuedBy,
      parentAddress,
      fundingType,
      email,
      age: calculateAge(birthDate),
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
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.scrollOne}>
              <label>Имя:<input value={name} onChange={e => setName(e.target.value)} required /></label>
              <label>Фамилия:<input value={surname} onChange={e => setSurname(e.target.value)} required /></label>
              <label>Отчество:<input value={patronymic} onChange={e => setPatronymic(e.target.value)} /></label>
              <label>Дата рождения:<input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} required /></label>
              <label>Номер телефона:<input value={phone} onChange={e => setPhone(e.target.value)} required /></label>
              <label>СНИЛС:<input value={snils} onChange={e => setSnils(e.target.value)} /></label>
              <label>ИНН:<input value={inn} onChange={e => setInn(e.target.value)} /></label>
              <label>Гражданство:<input value={citizenship} onChange={e => setCitizenship(e.target.value)} /></label>

              <label>
                Документ:
                <select value={documentType} onChange={e => setDocumentType(e.target.value)} required>
                  <option value="">Выберите</option>
                  <option value="passport">Паспорт</option>
                  <option value="birthCert">Свидетельство о рождении</option>
                </select>
              </label>

              {documentType === 'passport' && (
                <>
                  <label>Серия:<input value={docSeries} onChange={e => setDocSeries(e.target.value)} /></label>
                  <label>Номер:<input value={docNumber} onChange={e => setDocNumber(e.target.value)} /></label>
                  <label>Дата выдачи:<input type="date" value={docDate} onChange={e => setDocDate(e.target.value)} /></label>
                  <label>Кем выдан:<input value={docIssuedBy} onChange={e => setDocIssuedBy(e.target.value)} /></label>
                  <label>Адрес регистрации:<input value={passportAddress} onChange={e => setPassportAddress(e.target.value)} /></label>
                  <label>
                    <p>Проживаю не по паспорту<input type="checkbox" checked={notLivingByPassport} onChange={e => setNotLivingByPassport(e.target.checked)} /></p>
                  </label>
                  {notLivingByPassport && (
                    <label>Адрес фактического проживания:<input value={customAddress} onChange={e => setCustomAddress(e.target.value)} /></label>
                  )}
                </>
              )}

              {documentType === 'birthCert' && (
                <>
                <label>Номер свидетельства:<input value={birthCertNumber} onChange={e => setBirthCertNumber(e.target.value)} /></label>
                <label>Адрес регистрации:<input value={passportAddress} onChange={e => setPassportAddress(e.target.value)} /></label>
                  {notLivingByPassport && (
                    <label>Адрес фактического проживания:<input value={customAddress} onChange={e => setCustomAddress(e.target.value)} /></label>
                  )}
                </>
              )}
            </div>

            <div className={styles.scrollTwo}>
              
              <label>ФИО родителя:<input value={parentFio} onChange={e => setParentFio(e.target.value)} /></label>
              <label>
                Серия и номер паспорта родителя:
                <input
                  maxLength={10}
                  value={parentPassport}
                  onChange={e => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    setParentPassport(onlyDigits);
                  }}
                />
              </label>
              <label>Кем и когда выдан паспорт:<input value={parentIssuedBy} onChange={e => setParentIssuedBy(e.target.value)} /></label>
              <label>Адрес проживания родителя:<input value={parentAddress} onChange={e => setParentAddress(e.target.value)} /></label>

              <label>
                Тип финансирования:
                <select value={fundingType} onChange={e => setFundingType(e.target.value)} required>
                  
                  <option value="budget">Бюджет</option>
                  <option value="commercial">Коммерция</option>
                </select>
              </label>

              <label>Электронная почта:<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>

              <label>
                Наименование программы:
                <select value={selectedCourseTitle} onChange={handleCourseChange} required>
                  <option value="">Выберите курс</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.title}>{course.title}</option>
                  ))}
                </select>
              </label>


            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>Отправить</button>
        </form>

        <button className={styles.closeBtn} onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default EnrollPopup;
