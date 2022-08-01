// setup
const express = require('express');
const router = express.Router();

// imports from the controller
const {
    getUserDetails,
    signup_postRequest,
    login_postRequest,
    addTask,
    deleteTask
} = require('../controllers/auth.controller.js');

// get user details
router.get('/user/:email', getUserDetails);

// Authentication process
// 
// SIGN UP (POST)
// 
router.post('/signup', signup_postRequest);

// 
// LOGIN (POST)
// 
router.post('/login', login_postRequest);


// 
// ADDING A TASK (PATCH)
//
router.patch('/addNew', addTask);
// 
// DELETING A TASK (PATCH)
// 
router.delete('/deleteTask', deleteTask);

// exports 
module.exports = router;