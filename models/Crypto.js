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
        emun: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})