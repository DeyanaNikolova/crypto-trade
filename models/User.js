const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username must be minimum 5 characters long!'],

    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email must be minimum 10 characters long!'],
    },
    password: {
        type: String,
        required: true,
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;


