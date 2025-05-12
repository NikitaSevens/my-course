import { useState } from 'react';
import CourseList from '../../components/CourseList/CourseList';
import EnrollPopup from '../../components/EnrollPopup/EnrollPopup';
import { Course } from '../../components/CourseCard/CourseCard';

const DashboardPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleOpenPopup = (course: Course) => {
    setSelectedCourse(course);
    setPopupOpen(true);
  };

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>My Courses</h2>
        <div>
          <button>All</button>
          <button>Active</button>
          <button style={{ fontWeight: 'bold' }}>Upcoming</button>
          <button>Completed</button>
        </div>
        <CourseList onCourseClick={handleOpenPopup} />
      </div>

      {popupOpen && selectedCourse && (
        <EnrollPopup
          onClose={() => setPopupOpen(false)}
          selectedCourse={selectedCourse}
        />
      )}
    </div>
  );
};

export default DashboardPage;
