const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        requred: true
    },
    description: {
        type: String,
        requred: true
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