import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
//import Login from './Pages/Admin';
import Login from './Pages/Auth/Login';
//import Register from './pages/Auth/Register';


function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
            
          </Route>
    </Routes>
  </Router>
  )
}

export default App


<Route path="/admin" element={<Admin />} />