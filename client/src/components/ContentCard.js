import React, { useState } from "react";

// api request 
export const deleteTask = async (payload) => {
    const res = await fetch('/auth/deleteTask', {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = res.json();

    if (!data) {
        console.log(data);
    }

    return data;
};


const ContentCard = ({ setUser, user, task }) => {

    const handleDelete = async (e) => {
        e.preventDefault();

        const payload = {
            'id': user._id,
            'taskID': task._id
        };

        console.log(task._id);

        const data = await deleteTask(payload);

        setUser(data);
    };
    return (
        <div className="content-card">
            <div className="content-task">{task.task}</div>
            <button className="content-deleteButton" onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ContentCard;