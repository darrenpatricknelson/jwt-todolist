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
    // will hash password for better protection in a production environment
    const { email, password } = req.body;

    try {
        // create payload/ user
        const user = await User.create({ email, password });

        //  create jwt 
        const token = jwt.sign(JSON.stringify(user), 'jwt-secret', { algorithm: 'HS256' });
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

// LOGIN
// GET
const login_getRequest = (req, res) => {
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'User is trying to sign up'
    });
};

// POST
const login_postRequest = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            status: 401,
            error: `User not found, check the details you have entered or sign up if you have not already`
        });
    }

    // check if password is correct
    const isMatch = user.password === password;

    if (!isMatch) {
        return res.status(401).json({
            status: 401,
            error: 'Password is incorrect'
        });
    }

    // create jwt
    const token = jwt.sign(
        JSON.stringify(user),
        'jwt-secret',
        { algorithm: 'HS256' }
    );
    res.status(200).send({ 'token': token, 'user': user });
};


// exporting all the controller functions
module.exports = {
    signup_getRequest,
    signup_postRequest,
    login_getRequest,
    login_postRequest
};
