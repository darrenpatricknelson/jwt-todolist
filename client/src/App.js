// imports
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useUserContext } from './hooks/useUserContext.js';

// components
import Navbar from './components/Navbar.js';
import Auth from './components/Auth.js';
import Home from './components/Home.js';

// styles 
import './assets/auth.css';

// api request
export const getUserDetails = async (email) => {
  const res = await fetch(`/auth/user/${email}`);
  const data = await res.json();

  return data.user[0];

};


const App = () => {
  // destructure context
  const { user, dispatch } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  // function that deals with a user signing up/ logging in
  const handleAuth = (user) => {
    sessionStorage.setItem('auth', true);
    const state = sessionStorage.getItem('auth');
    sessionStorage.setItem('user', user.user.email);
    dispatch({ type: 'GET_USER', payload: user.user });
    // console.log(user); {status: 200, user {...}}
    setIsLoggedIn(state);
  };

  // function deals with a user logging out
  const handleLogout = () => {

    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  // creating a session variable 
  useEffect(() => {
    // the following function checks if a user exists in the session storage
    // I used session storage because I don't want to use cookies for such a small project
    const checkUserAuthentication = async () => {
      setIsLoading(true);
      if (!sessionStorage.user) {
        setIsLoading(false);

        return sessionStorage.setItem('auth', false);
      }

      const state = sessionStorage.getItem('auth');
      const user = sessionStorage.getItem('user');
      const data = await getUserDetails(user);
      dispatch({ type: 'GET_USER', payload: data });
      setIsLoading(false);

      setIsLoggedIn(state);
    };

    checkUserAuthentication();
  }, []);



  return (
    <div className="app">
      <BrowserRouter>
        <Navbar state={isLoggedIn} handleLogout={handleLogout} user={user} />
        <div className="pages">
          {/* loading animation */}
          {isLoading ? <div className='loading'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div> :
            <Routes>
              <Route path="/authentication" element={<Auth handleAuth={handleAuth} state={isLoggedIn} />} />
              <Route path="/home" element={<Home state={isLoggedIn} user={user} />} />
            </Routes>
          }
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;