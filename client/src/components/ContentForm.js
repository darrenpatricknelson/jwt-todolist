import React, { useState } from "react";

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

const ContentForm = ({ method, user }) => {
    const [task, setTask] = useState('');
    const [errorVal, setErrorVal] = useState('');

    // function that makes the api request
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!task) {
            return setErrorVal('Please enter a task');
        }

        setErrorVal('');
        const payload = {
            'id': user._id,
            'task': task
        };

        // api request
        const data = await addNewTask(payload);

        console.log(user);
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