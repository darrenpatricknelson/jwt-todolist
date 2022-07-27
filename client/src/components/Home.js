import React from 'react';
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


const Home = ({ user, state }) => {

    if (!state) return <Navigate to="/" />;
    return (
        <div className="home-page">
            <div className="home-content">
                <h2>A list of all your tasks</h2>
                {lists.map((list) => <ContentCard list={list} />)}
            </div>
            <div className="home-form">
                <ContentForm />
            </div>
        </div>
    );
};

export default Home;