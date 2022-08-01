// creating a schema for the user model
const mongoose = require('mongoose');
// I've installed a package via npm to validate emails
const { isEmail } = require('validator');

// a schema created for the users tasks
const userTasks = new mongoose.Schema({
    task: {
        type: String,
        required: false
    }
});

// a schema created for the entire user object
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password must be minimum 6 characters in length'],
        minlength: 6
    },
    token: {
        type: String,
        required: true
    },
    tasks: [userTasks]
});

const User = mongoose.model('user', userSchema);

module.exports = User;