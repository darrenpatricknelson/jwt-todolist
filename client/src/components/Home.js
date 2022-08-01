// imports
import React from 'react';
import { Navigate } from 'react-router-dom';

// components
import ContentCard from './ContentCard.js';
import ContentForm from './ContentForm.js';

// styles
import '../assets/home.css';

const Home = ({ state, user }) => {
    // destructure the user object to get the tasks
    // we will map through this tasks array to create cards for each task
    if (state) {
        var { tasks } = user;
    }

    // if the user tries to access the /home path through the url without being signed in, they will be redirected back to the authentication page
    if (!state) return <Navigate to="/authentication" />;
    return (
        <div className="home-page">
            <div className="home-content">
                {tasks.length === 0 ? <h2>Add a task using the form to the right</h2>
                    :
                    <>
                        <h2>A list of all your tasks</h2>
                        {tasks.map((task) => <ContentCard key={task._id} user={user} task={task} />)}
                    </>}
            </div>
            <div className="home-form">
                {/* a form the user will use to add tasks */}
                <ContentForm user={user} />
            </div>
        </div>
    );

};

export default Home;