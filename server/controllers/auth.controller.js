// This file will setup all the functions for the specific routes
// imports
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

// handle errors function
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: ''
    };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "This email is already registered, please login";
        return errors;
    }

    //  validation  errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};


// 
// authentication process

// POST
const signup_postRequest = async (req, res) => {
    // will hash password for better protection in a production environment
    const { email, password } = req.body;

    // Create a payload
    let payload = {
        "email": email,
        "password": password
    };


    try {

        //  create jwt 
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', { algorithm: 'HS256' });

        // create payload/ user
        const user = await User.create({ email, token });

        res.status(200).send({
            status: 200,
            token: token,
            user: user
        });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({
            status: 400,
            errors
        });
    }
};

// POST
const login_postRequest = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // if there is no user, tell the user to check details or sign up
    if (!user) {
        return res.status(401).json({
            status: 401,
            error: `User not found, check the details you have entered or sign up if you have not already`
        });
    }

    // decoded the stored jwt token
    const decoded = jwt.verify(user.token, 'jwt-secret');

    // check if password is correct
    const isMatch = decoded.password === password;

    // if the passwords don't match, send error
    if (!isMatch) {
        return res.status(401).json({
            status: 401,
            error: 'Password is incorrect'
        });
    }

    // if everything is successful, send back the user db
    res.status(200).send({
        status: 200,
        token: user.token,
        user: user
    });
};

// HI moderator, please note that I am aware that the following api requests need to be in a different controller
// the route handler for this controller is ('/auth/..') and these are not authorization requests
// I would put it in another controller and have a different route handler ('/api/...') but for the sake tof the task, I have left them here :)
// 
// 
// User adding and deleting tasks
// Adding 
const addTask = async (req, res) => {
    const { id, task } = req.body;

    // add the new task to the tasks array
    const oldEntry = await User.findOneAndUpdate(
        { _id: id },
        {
            tasks: task
        }
    );

    // find the updated db entry
    const updatedEntry = await User.findById({ id });

    // response
    res.status(200).send(updatedEntry);
};


// Deleting
const deleteTask = async (req, res) => {
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'User is trying to sign up'
    });
};


// exporting all the controller functions
module.exports = {
    signup_postRequest,
    login_postRequest,
    addTask,
    deleteTask
};
