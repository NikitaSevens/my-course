import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Home';


function App() {

  return (
    <>
      <h1>My Audio Shop</h1>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Router path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
