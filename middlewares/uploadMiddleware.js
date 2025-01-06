const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

// Cấu hình storage cho Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Thư mục lưu trữ trên Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // Tùy chỉnh kích thước ảnh nếu cần
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
