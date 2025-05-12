// src/pages/Dashboard/DashboardPage.tsx
//import CourseList from '../../components/CourseList/CourseList';
//import ScheduleSidebar from '../../components/ScheduleSidebar/ScheduleSidebar';
//import mockCourses from '../../mock/courses';

const DashboardPage = () => (
  <div className="wrapper">
    <div className="container"  style={{  }}>
      <h2>My Courses</h2>
      <div>
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
