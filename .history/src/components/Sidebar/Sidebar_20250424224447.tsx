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
        <Link to="/admin/create" className={styles.link}>Создать</Link>
        <Link to="/admin/courses" className={`${styles.link} ${styles.active}`}>Курсы</Link>
        <Link to="/admin/calendar" className={styles.link}>Calendar</Link>
      </nav>
      <button className={styles.logout} onClick={logout}>
        Log Out
      </button>
    </aside>
  );
};

export default Sidebar;
