const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User ID of the customer
    items: { type: Array, required: true }, // Array of items in the order
    amount: { type: Number, required: true }, // Total amount for the order
    address: { type: Object, required: true }, // Shipping address
    status: { type: String, required: true, default: 'Order placed' }, // Order status (e.g., pending, shipped)
    paymentMethod: { type: String, required: true }, // Payment method (e.g., credit card, PayPal)
    payment: { type: Boolean, required: true, default: false }, // Payment status (default: not paid)
    date: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
