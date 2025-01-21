const express = require('express')
const router = express.Router();
const googlerouter = express.Router();
const passport = require('passport');

const authMiddleware = require('../middleware/tokenAuth')
const uploadFiles = require('../middleware/multermiddleware');

const { sendOTP } = require('../controllers/sendOTP')
const { createUser, getUser, updateUser, deleteUser, login, currentUser, verifyOTP, logout, searchEmail, updatePassword, googleCallback, getToken } = require('../controllers/user')
const { addProduct, listProducts, removeProduct, singleProduct } = require('../controllers/product');
const { addToCart, updateCart, getUserCart, deleteFromCart } = require('../controllers/cart')
const { placeOrder, placeOrderStripe, confirmOrder, allOrders, userOrders, updateStatus } = require('../controllers/order');
const adminMiddleware = require('../middleware/adminMiddleware');
const { subscribeUser, verifySubscriber } = require('../controllers/subscription');

router.post('/api/user/create', createUser)
router.get('/api/user/get', authMiddleware, adminMiddleware, getUser)
router.put('/api/user/update/:id', updateUser)
router.delete('/api/user/delete/:id', authMiddleware, adminMiddleware, deleteUser)
router.post('/api/user/login', login)
router.post('/api/user/current', authMiddleware, currentUser)
router.post('/api/otp-verify', verifyOTP)
router.post('/api/resendotp', sendOTP)
router.post('/api/logout/:userId', authMiddleware, logout)
router.post('/api/forgot-password', searchEmail)
router.put('/api/update-password', updatePassword)

router.get('/api/get-token', getToken);
router.get('/api/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);

//product routes
router.post('/api/product/add', authMiddleware, adminMiddleware, uploadFiles, addProduct)
router.delete('/api/product/remove/:id', authMiddleware, adminMiddleware, removeProduct)
router.get('/api/product/get/:id', singleProduct)
router.get('/api/product/list', listProducts)

//cart routes
router.post('/api/cart/add', addToCart)
router.get('/api/cart/get', authMiddleware, getUserCart)
router.delete('/api/cart/delete', authMiddleware, deleteFromCart)
router.put('/api/cart/update', updateCart)


//order routes

// admin features
router.get('/api/order/list', authMiddleware, adminMiddleware, allOrders);
router.put('/api/order/status', authMiddleware, adminMiddleware, updateStatus);
// payment features
router.post('/api/order/stripe', authMiddleware, placeOrderStripe);
router.post('/api/order/confirm', confirmOrder);
router.post('/api/order/cod', authMiddleware, placeOrder);

// user features
router.get('/api/userorders', authMiddleware, userOrders);
// subscription
router.post('/api/subscribe', authMiddleware, subscribeUser);
router.post('/api/subscriber/verify', authMiddleware, verifySubscriber);



module.exports = router;