import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
//import Admin from './pages/Admin/Admin';
//import Login from './pages/Auth/Login';
//import Register from './pages/Auth/Register';
import Header from './components/Header';
import './styles/global.css';

function App() {


  return (
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />

    </Routes>
  </Router>
  )
}

export default App



//<Route path="/admin" element={<Admin />} />
//<Route path="/login" element={<Login />} />
//<Route path="/register" element={<Register />} />