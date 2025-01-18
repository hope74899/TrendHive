const cloudinary = require('cloudinary').v2; // Import Cloudinary
const fs = require('fs'); // Import File System module

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,       // Your Cloudinary cloud name
    api_key: process.env.CLOUD_API_KEY,      // Your API key
    api_secret: process.env.CLOUD_API_SECRET // Your API secret
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return;

        // Upload file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically detect the resource type
        });

        return uploadResult.url; // Return the uploaded file's URL
    } catch (error) {
        // Remove the locally saved file if the upload operation fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Cloudinary upload error:", error);
    }
};

// Export the function
module.exports = uploadOnCloudinary;
