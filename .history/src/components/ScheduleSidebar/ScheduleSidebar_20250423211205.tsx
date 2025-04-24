// src/components/ScheduleSidebar/ScheduleSidebar.tsx
import styles from './ScheduleSidebar.module.css';

const ScheduleSidebar = () => (
  <aside className={styles.sidebar}>
    <div className={styles.calendar}>July 2021 [◄ ►]</div>
    <div className={styles.schedule}>
      <div className={styles.item}>
        <div className={styles.day}>06</div>
        <div>
          <div className={styles.title}>English</div>
          <div className={styles.time}>15:00–16:30</div>
        </div>
      </div>
      {/* ...другие занятия */}
    </div>
  </aside>
);

export default ScheduleSidebar;
