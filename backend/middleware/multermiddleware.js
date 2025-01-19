const multer = require('multer'); // Import the multer library
const path = require('path');    // Import the path module

// __dirname is available by default in CommonJS to get the current directory of the file
const publicDir = path.join(__dirname, '..', 'public');// Resolve the 'public' directory path relative to the current file

// Configure storage using Multer's diskStorage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, publicDir); // Set the destination directory for storing uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original name of the uploaded file
    }
});

// Create a multer upload middleware for multiple fields
const upload = multer({
    storage,
    // limits: { fileSize: 1024 * 1024 * 5 }, // Optional: Limit file size to 5MB
});

// Define the upload.fields() middleware for multiple files
const uploadFiles = upload.fields([
    { name: 'image1', maxCount: 1 }, // Accept 1 file under the field name 'image1'
    { name: 'image2', maxCount: 1 }, // Accept 1 file under the field name 'image2'
    { name: 'image3', maxCount: 1 }, // Accept 1 file under the field name 'image3'
    { name: 'image4', maxCount: 1 }  // Accept 1 file under the field name 'image4'
]);

// Export the configured middleware so it can be used in other parts of the app
module.exports = uploadFiles;
