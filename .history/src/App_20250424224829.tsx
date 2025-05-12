import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Header/ProtectedRoute';
import DashboardPage from './Pages/Dashboard/Dashboard';
import CreatePage from './Pages/Dashboard/Create/Create';
import Login from './Pages/Auth/Login';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';



function App() {


  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />


        <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Navigate to="create" replace />} /> {/* 👈 Это автоматический переход */}
              <Route path='courses' element={<DashboardPage />} />
              <Route path="create" element={<CreatePage />} />
            </Route>
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App


//<Route path="/admin" element={<Admin />} />