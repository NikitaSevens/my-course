// src/pages/Dashboard/DashboardPage.tsx
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import CourseList from '../../components/CourseList/CourseList';
import ScheduleSidebar from '../../components/ScheduleSidebar/ScheduleSidebar';
import mockCourses from '../../mock/courses';

const DashboardPage = () => (

    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2>My Courses</h2>
      <div>
        <button>All</button>
        <button>Active</button>
        <button style={{ fontWeight: 'bold' }}>Upcoming</button>
        <button>Completed</button>
      </div>
      <CourseList courses={mockCourses} />
    </div>
    <ScheduleSidebar />

);
export default DashboardPage;
