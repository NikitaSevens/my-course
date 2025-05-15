import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Home';
import Header from './components/Header';


function App() {

  return (
    <>
      <h1>My Audio Shop</h1>
      <Router>
      <Router>
        <Router path="/" element={<Home />} />
        <Router path="/cart" element={<Cart />} />
      </Router>
    </Router>
    </>
  )
}

export default App
