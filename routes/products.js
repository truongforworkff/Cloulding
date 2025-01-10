const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const upload = require('../middlewares/uploadMiddleware');
// add product
router.post('/', upload.fields([
    { name: 'image01', maxCount: 1 },
    // Thêm các field khác nếu cần
    { name: 'image02', maxCount: 1 }
]), productController.addProduct);


router.get('/', productController.getAllProducts);
router.get('/:id([0-9a-fA-F]{24})', productController.getProductById);
router.get('/:slug', productController.getProductBySlug);
// Thêm sản phẩm mới
// router.post('/', productController.addProduct);

// Cập nhật sản phẩm theo ID
router.put('/:id', upload.fields([
    { name: 'image01', maxCount: 1 },
    { name: 'image02', maxCount: 1 }
]), productController.updateProduct);


// Xóa sản phẩm theo ID
router.delete('/:id', productController.deleteProduct);


module.exports = router;
