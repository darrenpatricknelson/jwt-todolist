import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// components
import ContentCard from './ContentCard.js';
import ContentForm from './ContentForm.js';

// styles
import '../assets/home.css';

/* 
! 2 requests!
TODO: DELETE + POST 
 */
const lists = [1, 2, 2, 3, 5];


const Home = ({ state }) => {
    const [user, setUser] = useState(null);


    // creating a session variable 
    useEffect(() => {

        const newUser = JSON.parse(sessionStorage.getItem('user'));
        setUser(newUser);
    }, []);

    // deconstruct the user object to get the tasks
    // const { tasks } = user;

    if (!state) return <Navigate to="/" />;
    return (
        <div className="home-page">
            <div className="home-content">
                <h2>A list of all your tasks</h2>
                {/* {tasks.map((task) => <ContentCard key={user._id} list={task} />)} */}
            </div>
            <div className="home-form">
                <ContentForm method={setUser} user={user} />
            </div>
        </div>
    );

};

export default Home;