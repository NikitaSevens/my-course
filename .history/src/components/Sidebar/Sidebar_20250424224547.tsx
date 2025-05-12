// src/components/Sidebar/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>My Course</div>
      <nav className={styles.nav}>
  <NavLink
    to="/admin/create"
    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
  >
    Создать
  </NavLink>
  <NavLink
    to="/admin/courses"
    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
  >
    Курсы
  </NavLink>
  <NavLink
    to="/admin/calendar"
    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
  >
    Calendar
  </NavLink>
</nav>
      <button className={styles.logout} onClick={logout}>
        Log Out
      </button>
    </aside>
  );
};

export default Sidebar;
