

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/:slug', productController.getProductBySlug);
// Thêm sản phẩm mới
router.post('/', productController.addProduct);

// Cập nhật sản phẩm theo ID
router.put('/:id', productController.updateProduct);

// Xóa sản phẩm theo ID
router.delete('/:id', productController.deleteProduct);


module.exports = router;
