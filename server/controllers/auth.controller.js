// This file will setup all the functions for the specific routes
// imports
const User = require('../models/user.model.js');

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
// SIGNUP requests
// GET
const signup_getRequest = (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'User is trying to sign up'
    });
};

// POST
const signup_postRequest = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(200).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// 
// LOGIN requests
// GET
const login_getRequest = (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'User is trying to login'
    });
};

// POST
const login_postRequest = async (req, res) => {
    res.send('User login');
};


// exporting all the controller functions
module.exports = {
    signup_getRequest,
    signup_postRequest,
    login_getRequest,
    login_postRequest
};
