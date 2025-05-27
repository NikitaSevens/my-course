import { useState, useEffect } from "react";
import styles from "./CourseList.module.css";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

const DashboardPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState("Upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки курсов", err);
        setIsLoading(false);
      });
  }, []);

  const today = new Date();

  const filteredCourses = courses.filter((course) => {
    const start = new Date(course.startDate);
    const end = new Date(course.endDate);

    if (filter === "Все") return true;
    if (filter === "Активные") return start <= today && end >= today;
    if (filter === "Будут") return start > today;
    if (filter === "Завершенные") return end < today;

    return true;
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm("Вы точно хотите удалить этот курс?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}`, {
        method: "DELETE",
      });
      setCourses((prev) => prev.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении курса", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Курсы</h2>

        <div className={styles.list}>
          {["Все", "Активные", "Будут", "Завершенные"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={filter === status ? styles.activeFilter : ""}
            >
              {status}
            </button>
          ))}
        </div>

        <div className={styles.courseGrid}>
          {isLoading ? (
            [...Array(3)].map((_, idx) => (
              <div key={idx} className={`${styles.courseCard} ${styles.skeletonCard}`}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonButtons}></div>
              </div>
            ))
          ) : (
            filteredCourses.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <h3>{course.title}</h3>
                <p>
                  С {course.startDate} по {course.endDate}
                </p>
                <div className={styles.cardActions}>
                  <button
                    onClick={() =>
                      navigate(`/admin/create`, { state: { course } })
                    }
                    className={styles.editBtn}
                  >
                    ✏️ Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className={styles.deleteBtn}
                  >
                    🗑 Удалить
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
