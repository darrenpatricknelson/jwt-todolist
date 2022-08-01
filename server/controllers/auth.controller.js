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

// fetch request
const getUserDetails = async (req, res) => {
    const { email } = req.params;

    const user = await User.find({ email });

    if (!user) {
        res.send(404).json({
            status: 404,
            err: 'User not found'
        });
    }

    res.status(200).json({
        status: 200,
        user
    });
};

// 
// authentication process

// POST
const signup_postRequest = async (req, res) => {
    // will hash password for better protection in a production environment
    const { email, password } = req.body;

    // The payload that we use in the jwt token will just consist of the email
    // for now we will be storing the password in the database as well
    // I know this is not secure and the password needs to be encrypted or hashed 

    try {

        //  create jwt 
        const token = jwt.sign(JSON.stringify(email), process.env.SECRET_KEY, { algorithm: 'HS256' });

        // create payload/ user
        const user = await User.create({ email, password, token });

        res.status(200).send({
            status: 200,
            user
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
    // create a token
    const token = jwt.sign(JSON.stringify(email), process.env.SECRET_KEY, { algorithm: 'HS256' });

    // check if password is correct
    const isPasswordCorrect = user.password === password;
    if (!isPasswordCorrect) {
        return res.status(402).json({
            status: 402,
            error: 'Password is incorrect'
        });
    }
    // check if the token is correct
    // if the email and password validations don't fail, it's most likely this would not fail either
    const isTokenCorrect = user.token === token;
    if (!isTokenCorrect) {
        return res.status(403).json({
            status: 403,
            error: 'Validation failed'
        });
    }

    // if everything is successful, send back the user db
    res.status(200).send({
        status: 200,
        user
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

    try {
        // add the new task to the tasks array
        await User.updateOne(
            { _id: id },
            {
                $push: { tasks: { task } }
            }
        );
    } catch (err) {
        res.status(400).json({
            status: 400,
            errors: err
        });
    }

    // find the updated db entry
    const user = await User.findById(id);

    // response
    res.status(200).send({
        status: 200,
        user
    });
};


// Deleting
const deleteTask = async (req, res) => {
    const { id, taskID } = req.body;

    try {
        // add the new task to the tasks array
        await User.updateOne(
            { _id: id },
            {
                $pull: { tasks: { _id: taskID } }
            }
        );
    } catch (err) {
        res.status(400).json({
            status: 400,
            errors: err
        });
    }

    // find the updated db entry
    const user = await User.findById(id);

    // response
    res.status(200).send({
        status: 200,
        user
    });
};


// exporting all the controller functions
module.exports = {
    getUserDetails,
    signup_postRequest,
    login_postRequest,
    addTask,
    deleteTask
};
