const Subscriber = require('../models/subscriber');
const { sendCouponEmail } = require('../utils/mailer');

// Utility function to generate a unique coupon code
const generateCouponCode = () => {
    return 'WELCOME' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Subscription controller
const subscribeUser = async (req, res) => {
    const { email } = req.body;
    // Validate email
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing email address.' });
    }
    try {
        // Check if the user is already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'You are already subscriber!' });
        }

        // Generate a unique coupon code
        const couponCode = generateCouponCode();
        // Attempt to send the coupon email
        const emailSent = await sendCouponEmail(email, couponCode);
        if (!emailSent) {
            throw new Error('Failed to send email.');
        }
        // Create a new subscriber entry
        const newSubscriber = new Subscriber({ email, couponCode });
        await newSubscriber.save();
        return res.status(201).json({
            message: 'Subscription successful! Check your email for a discount coupon.',
        });
    } catch (error) {
        console.error('Error subscribing user:', error.message || error);
        // Specific error messages for known issues
        if (error.code === 11000) { // Handle duplicate key error (if using unique index on email)
            return res.status(400).json({ message: 'This email is already subscribed.' });
        }
        return res.status(500).json({ message: 'Failed to subscribe. Please try again later.' });
    }
};

const verifySubscriber = async (req, res) => {
    const { coupon } = req.body;
    console.log(coupon);

    // Validate coupon
    if (!coupon || typeof coupon !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing coupon code.' });
    }

    try {
        // Find the subscriber with the provided coupon code
        const findCoupon = await Subscriber.findOne({ couponCode: coupon });


        if (!findCoupon) {
            return res.status(400).json({ message: 'Coupon is not correct or does not exist.' });
        }
        console.log(findCoupon);

        // Check if the coupon has expired (30 days from createdAt)
        const currentDate = new Date();
        const couponCreationDate = new Date(findCoupon.createdAt);
        const expiryDate = new Date(couponCreationDate);
        expiryDate.setDate(couponCreationDate.getDate() + 30);

        if (currentDate > expiryDate) {
            // Coupon has expired, nullify it
            findCoupon.couponCode = null;
            await findCoupon.save();
            return res.status(400).json({ message: 'Coupon has expired.' });
        }

        // Invalidate the coupon immediately after successful verification
        findCoupon.couponCode = null;
        await findCoupon.save();
        return res.status(200).json({
            message: 'Coupon is valid and has been applied.',
        });
    } catch (error) {
        console.error('Error verifying coupon:', error.message || error);

        return res.status(500).json({
            message: 'Failed to verify the coupon. Please try again later.',
        });
    }
};



module.exports = { subscribeUser, verifySubscriber };
