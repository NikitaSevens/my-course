import Sidebar from '../Sidebar/Sidebar';
import styles from './DashboardLayout.module.css';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet /> {/* сюда будут вставляться дочерние маршруты */}
      </main>
    </div>
  );
};

export default DashboardLayout;