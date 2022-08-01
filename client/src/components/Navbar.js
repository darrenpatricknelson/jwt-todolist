// imports
import React from 'react';

// styles 
import '../assets/navbar.css';

// simple component that display the users email on the nav as well as a logout button
// Thats if the user is logged in
const Navbar = ({ user, state, handleLogout }) => {

    return (
        <div className="navbar">
            <nav>
                <div><h1>Your Todo List</h1></div>
                {state &&
                    <div className='userDetails'>
                        <h5>Welcome {user.email}</h5>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                }
            </nav>
        </div>
    );
};

export default Navbar;