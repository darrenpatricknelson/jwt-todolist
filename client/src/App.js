import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar.js';
import Auth from './components/Auth.js';
import Home from './components/Home.js';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // function that deals with a user signing up/ logging in
  const handleAuth = (user) => {
    sessionStorage.setItem('auth', true);
    const state = sessionStorage.getItem('auth');
    sessionStorage.setItem('user', JSON.stringify(user.user.email));

    setIsLoggedIn(state);
  };

  // function deals with a user logging out
  const handleLogout = () => {

    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  // creating a session variable 
  useEffect(() => {
    if (!sessionStorage.user) {
      return sessionStorage.setItem('auth', false);
    }

    const state = sessionStorage.getItem('auth');
    console.log(state);
    setIsLoggedIn(state);
  }, []);

  return (
    <div className="app">
      <Navbar state={isLoggedIn} handleLogout={handleLogout} />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Auth method={handleAuth} state={isLoggedIn} />} />
          <Route path="/home" element={<Home state={isLoggedIn} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;