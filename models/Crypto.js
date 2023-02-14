const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Crypto name must be at leat 2 characters long!']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?:\/\/./
    },
    price: {
        type: Number,
        min: [0, 'Price should be positive number!'],
        requred: true
    },
    description: {
        type: String,
        requred: true,
        minLength: [10, 'Crypto descriptiom must be at least 10 characters long!']
    },
    paymentMethod: {
        type: String,
        emun: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Invalid payment method!'
        },
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'   
    }]
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;