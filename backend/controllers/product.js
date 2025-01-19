const { json } = require('express');
const uploadOnCloudinary = require('../middleware/cloudinaryMiddleware');
const ProductModel = require('../models/product')

const addProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        // Extract images from request
        const image1 = req.files?.image1?.[0] || null;
        const image2 = req.files?.image2?.[0] || null;
        const image3 = req.files?.image3?.[0] || null;
        const image4 = req.files?.image4?.[0] || null;

        const images = [image1, image2, image3, image4].filter((item) => item !== null);

        // Upload images to Cloudinary
        const uploadedImages = [];
        for (const image of images) {
            // this is for cloudinary
            // const uploadedImageUrl = await uploadOnCloudinary(image.path);

            // this is for local storage on server
            const uploadedImageUrl = image.filename;
            if (uploadedImageUrl) {
                uploadedImages.push(uploadedImageUrl);
            }
        }
        // console.log(name, description, price, category, subCategory, sizes, bestSeller);
        // console.log(uploadedImages);

        // Save product data to database (mock example)
        const productData = {
            name,
            description,
            price,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === 'true' ? true : false,
            images: uploadedImages,
            date: Date.now()
        }
        // console.log(productData);

        const product = new ProductModel(productData);
        await product.save();

        return res.status(201).json({
            message: 'Product added successfully.',
        });
    } catch (error) {
        console.error('Product error:', error);
        next(error);
    }
};
const listProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find({});
        // Check if no products are found
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        // Return the list of products
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        next(error); // Pass error to the error-handling middleware
    }
};
const removeProduct = async (req, res, next) => {
    try {
        const { id } = req.params; // Destructure `id` for cleaner code\
        console.log(id);
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        // Check if the product was not found
        if (!deletedProduct) {
            return res.status(404).json({ message: "No product found with the given ID" });
        }

        // Respond with success
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error); // Log the error for debugging
        next(error); // Pass the error to the error-handling middleware
    }
};
const singleProduct = async (req, res) => {
    try {
        const { id } = req.params; // Destructure `id` for cleaner code\
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const productInfo = await ProductModel.findById(id);

        // Check if the product was not found
        if (!productInfo) {
            return res.status(404).json({ message: "No product found with the given ID" });
        }

        // Respond with success
        res.status(200).json(productInfo);
    } catch (error) {
        console.error("Error deleting product:", error); // Log the error for debugging
        next(error); // Pass the error to the error-handling middleware
    }
}

module.exports = { addProduct, listProducts, removeProduct, singleProduct }