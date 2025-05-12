import style from ../Pages/Dashboard.module.css

const DashboardPage = () => (
  <div className="wrapper">
    <div className="container"  >
      <h2 className="title">My Courses</h2>
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
