// setup
const express = require('express');
const router = express.Router();

// imports from the controller
const {
    signup_getRequest,
    signup_postRequest,
    login_getRequest,
    login_postRequest
} = require('../controllers/auth.controller.js');

// setup routes
// 
// SIGN UP (GET)
//
router.get('/signup', signup_getRequest);

// 
// SIGN UP (POST)
// 
router.post('/signup', signup_postRequest);

// 
// LOGIN (GET)
// 
router.get('/login', login_getRequest);

// 
// LOGIN (POST)
// 
router.post('/login', login_postRequest);

// 
// LOGOUT (GET)
// 
// router.get('/' () => {})

// exports 
module.exports = router;