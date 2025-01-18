const User = require("../models/users");

//to add products to user cart
const addToCart = async (req, res, next) => {
    try {
        const { userId, itemId, size } = req.body;
        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        const cartData = userData.cartData || {}; // Default to empty object
        cartData[itemId] = cartData[itemId] || {}; // Initialize item if not present
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        await User.findByIdAndUpdate(userId, { cartData });

        return res.status(201).json({ message: "Product added to cart successfully." });
    } catch (error) {
        console.error("Error adding to cart:", error);
        next(error);
    }
};

//to update products to user cart
const updateCart = async (req, res, next) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        const cartData = userData.cartData || {};
        if (cartData[itemId]) {
            cartData[itemId][size] = cartData[itemId][size] + quantity; // Update quantity directly
        }

        await User.findByIdAndUpdate(userId, { cartData });

        return res.status(201).json({ message: "Cart updated successfully." });
    } catch (error) {
        console.error("Error updating cart:", error);
        next(error);
    }
};

//to get products from user cart
const getUserCart = async (req, res, next) => {
    try {
        const userId = req.user._id.toString();
        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        const cartData = userData.cartData || {}; // Default to empty object
        return res.status(200).json({ cartData });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        next(error);
    }
};

const deleteFromCart = async (req, res, next) => {
    try {
        const { userId, itemId, size } = req.body; // Expecting userId, itemId and size

        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        const cartData = userData.cartData || {}; // Default to empty object

        if (cartData[itemId]) {
            delete cartData[itemId][size]; // Delete specific size

            // If no sizes remain, delete the whole item
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }

            await User.findByIdAndUpdate(userId, { cartData });

            return res.status(200).json({ message: "Item removed from cart successfully." });
        } else {
            return res.status(404).json({ message: "Item not found in cart." })
        }

    } catch (error) {
        console.error("Error deleting from cart:", error);
        next(error);
    }
};

module.exports = { addToCart, updateCart, getUserCart, deleteFromCart }