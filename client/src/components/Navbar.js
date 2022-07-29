import React, { useState } from 'react';

// styles 
import '../assets/navbar.css';


const Navbar = ({ state, method }) => {
    if (state) {
        var user = JSON.parse(sessionStorage.getItem('user'));
        // console.log(newUser.email);
    }






    return (
        <div className="navbar">
            <nav>
                <div><h1>Your Todo List</h1></div>
                {state &&
                    <div className='userDetails'>
                        <h5>Welcome {user.email}</h5>
                        <button onClick={method}>Logout</button>
                    </div>
                }
            </nav>
        </div>
    );
};

export default Navbar;