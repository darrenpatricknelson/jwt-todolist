import React from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar.js';
import Auth from './components/Auth.js';
import Home from './components/Home.js';


const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;