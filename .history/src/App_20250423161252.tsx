import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/Pages/Home/Home';
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
