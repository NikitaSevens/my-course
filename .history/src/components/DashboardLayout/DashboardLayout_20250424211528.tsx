// src/components/DashboardLayout/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import styles from './DashboardLayout.module.css';

const DashboardLayout: React.FC = () => (
  <div className={styles.container}>
    <Sidebar />
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;