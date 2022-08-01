import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// components
import ContentCard from './ContentCard.js';
import ContentForm from './ContentForm.js';

// styles
import '../assets/home.css';

export const getUserDetails = async (email) => {
    const res = await fetch(`/auth/user/${email}`);
    const data = await res.json();

    if (!data) {
        return console.log('something went wrong ');
    }

    return data;
};

const Home = ({ state }) => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState(null);


    // creating a session variable 
    useEffect(() => {

        const getUser = async () => {
            const email = await JSON.parse(sessionStorage.getItem('user'));

            const { user } = await getUserDetails(email);

            setUser(user[0]);
            setTasks(user[0].tasks);
        };

        getUser();
    }, []);



    if (!state) return <Navigate to="/" />;
    return (
        <div className="home-page">
            <div className="home-content">
                <h2>A list of all your tasks</h2>
                {tasks && tasks.map((task) => <ContentCard key={task._id} setUser={setUser} user={user} task={task} />)}
            </div>
            <div className="home-form">
                <ContentForm setUser={setUser} user={user} />
            </div>
        </div>
    );

};

export default Home;