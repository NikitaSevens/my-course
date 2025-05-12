import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Header/ProtectedRoute';
import DashboardPage from './Pages/Dashboard/Dashboard';
//import Login from './Pages/Admin';
import Login from './Pages/Auth/Login';
//import Register from './pages/Auth/Register';


function App() {


  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<DashboardPage  />} />
        <Route path="create" element={<CreatePage />} />
            </Route>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App


//<Route path="/admin" element={<Admin />} />