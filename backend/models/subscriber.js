const mongoose = require('mongoose');

// Schema for Subscriber with Email and Coupon Code
const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    couponCode: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
