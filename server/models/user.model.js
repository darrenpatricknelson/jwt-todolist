// creating a schema for the user model
const mongoose = require('mongoose');
// I've installed a package via npm to validate emails
const { isEmail } = require('validator');

const userTasks = new mongoose.Schema({
    tasks: {
        type: String,
        required: false
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    token: {
        type: String,
        required: true
    },
    tasks: [userTasks]
});

const User = mongoose.model('user', userSchema);

module.exports = User;