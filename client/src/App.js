import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar.js';
import Auth from './components/Auth.js';
import Home from './components/Home.js';


const App = () => {
  /* 
  ! REMEMBER!!!

  REMEMBER TO CHANGE THE STATE TO FALSE
  
  CHANGE THE STATE TO FALSE!!!!
  TODO: Find a different way to handle these session variables. Possibly cookies 
  */
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);

  const handleAuth = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Auth method={handleAuth} state={isLoggedIn} />} />
          <Route path="/home" element={<Home user={user} state={isLoggedIn} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;