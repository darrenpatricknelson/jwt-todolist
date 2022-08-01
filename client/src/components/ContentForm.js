import React, { useState } from "react";
import { useUserContext } from "../hooks/useUserContext.js";

// api request
const addNewTask = async (payload) => {
    const res = await fetch('/auth/addNew', {
        method: 'PATCH',
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

const ContentForm = ({ user }) => {
    const { dispatch } = useUserContext();
    const [task, setTask] = useState('');
    const [errorVal, setErrorVal] = useState('');

    // function that makes the api request
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate the task being added
        if (!task) {
            return setErrorVal('Please enter a task');
        }

        // clear any error validations
        setErrorVal('');

        // create a payload to make an api request
        const payload = {
            'id': user._id,
            'task': task
        };

        // api request
        const data = await addNewTask(payload);

        // error validation
        if (data.status === 200) {
            setTask('');
            dispatch({ type: 'UPDATE_USER_CREATE_TASK', payload: data.user });
        }
    };
    return (
        <div className="content-form-container">
            <h4>Add a new task</h4>
            <form className="content-form form">
                <textarea type="text" placeholder="Enter your task..." value={task} onChange={(e) => setTask(e.target.value)} />
                <button className="active" onClick={handleSubmit}>Submit</button>
                {errorVal && <div className="errorVal error"><p>{errorVal}</p></div>}
            </form>
        </div>
    );
};

export default ContentForm;