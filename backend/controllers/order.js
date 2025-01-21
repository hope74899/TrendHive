const Order = require('../models/order'); // Import the Order model
const User = require('../models/users');
const Stripe = require("stripe");

//Gateway initialized
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing orders using Stripe Method by using Checkout Session
const placeOrderStripe = async (req, res) => {
    try {
        const { address, amount, items } = req.body;
        const { origin } = req.headers;

        if (!amount || amount <= 0) {
            console.log("Invalid amount:", amount);
            return res.status(400).json({ message: "Invalid amount." });
        }
        // Save order with payment as false
        const newOrder = new Order({
            userId: req.user._id.toString(),
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        });
        await newOrder.save();
        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Order Payment",
                        },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/verify?success=true&sessionId={CHECKOUT_SESSION_ID}&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ message: "Failed to create checkout session." });
    }
};
// Confirm Order After Payment Success
const confirmOrder = async (req, res) => {
    try {
        const { sessionId, orderId } = req.body;
        console.log("Received confirmation request:", { sessionId, orderId });


        // Retrieve the Stripe session
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Verify payment status
        if (session.payment_status !== "paid") {
            return res.status(400).json({ message: "Payment not completed." });
        }

        // Find and update the order
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { payment: true }, // Mark payment as completed
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ message: "Order payment confirmed!", order: updatedOrder });
    } catch (error) {
        console.error("Error confirming order:", error.message);
        res.status(500).json({ message: "Failed to confirm the order." });
    }
};
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
    confirmOrder,
    allOrders,
    userOrders,
    updateStatus,
};
