// src/components/DashboardLayout/DashboardLayout.tsx
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './DashboardLayout.module.css';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.container}>
    <Sidebar />
    <main className={styles.main}>{children}</main>
  </div>
);
export default DashboardLayout;
