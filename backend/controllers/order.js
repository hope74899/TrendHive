const Order = require('../models/order'); // Import the Order model
const User = require('../models/users');

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { items, amount, address } = req.body;

        // Create a new order
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData)
        await newOrder.save();

        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({ message: 'Order placed successfully using COD.', order: newOrder });
    } catch (error) {
        console.error('Error placing order using Stripe:', error.message);
        res.status(500).json({ message: 'Failed to place order using Stripe.' });
    }
};
// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;

        // Create a new order
        const newOrder = new Order({
            userId,
            items,
            amount,
            address,
            status: 'pending',
            paymentMethod,
            payment: true, // Assuming payment is successful via Stripe
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully using Stripe.', order: newOrder });
    } catch (error) {
        console.error('Error placing order using Stripe:', error.message);
        res.status(500).json({ message: 'Failed to place order using Stripe.' });
    }
};
// Fetch all orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders
        res.status(200).json({ message: 'Orders fetched successfully.', orders });
    } catch (error) {
        console.error('Error fetching all orders:', error.message);
        res.status(500).json({ message: 'Failed to fetch orders.' });
    }
};
// Fetch user-specific orders for Frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.user._id.toString(); // Assuming `req.user` is populated via middleware

        const orders = await Order.find({ userId }); // Fetch orders for the specific user
        res.status(200).json({ message: 'User orders fetched successfully.', orders });
    } catch (error) {
        console.error('Error fetching user orders:', error.message);
        res.status(500).json({ message: 'Failed to fetch user orders.' });
    }
};
// Update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Update the order status
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json({ message: 'Order status updated successfully.', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error.message);
        res.status(500).json({ message: 'Failed to update order status.' });
    }
};

module.exports = {
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
};
