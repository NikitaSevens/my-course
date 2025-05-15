import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Home';
import Header from './components/Header/heaer';


function App() {

  return (
    <>
      <h1>My Audio Shop</h1>
      
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
