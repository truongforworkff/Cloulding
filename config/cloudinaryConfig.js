const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Lấy từ .env
    api_key: process.env.API_KEY,      // Lấy từ .env
    api_secret: process.env.API_SECRET // Lấy từ .env
});

module.exports = cloudinary;
