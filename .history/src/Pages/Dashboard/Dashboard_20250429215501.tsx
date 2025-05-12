import styles from './Dashboard.module.css';

const DashboardPage = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}  >
      <h2 className={styles.title}>Курсы</h2>
      <div >
        <button>All</button>
        <button>Active</button>
        <button style={{ fontWeight: 'bold' }}>Upcoming</button>
        <button>Completed</button>
      </div>
      
      {/*<CourseList  /> добавлю позже */}
    </div>
    {/*<ScheduleSidebar /> добавлю позже */}
  </div>
);

export default DashboardPage;
