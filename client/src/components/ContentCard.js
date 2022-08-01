import React from "react";
import { useUserContext } from "../hooks/useUserContext.js";

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


const ContentCard = ({ task }) => {
    const { user, dispatch } = useUserContext();

    // function to handle a user deleting a task
    const handleDelete = async (e) => {
        e.preventDefault();

        // create a payload consisting of the users ID and the task ID
        const payload = {
            'id': user._id,
            'taskID': task._id
        };

        // use that payload to make an api DELETE request
        const data = await deleteTask(payload);

        // validation before updating context
        if (data.status === 200) {
            dispatch({ type: 'UPDATE_USER_DELETE_TASK', payload: data.user });
        }

    };
    return (
        <div className="content-card">
            <div className="content-task">{task.task}</div>
            <button className="content-deleteButton" onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ContentCard;