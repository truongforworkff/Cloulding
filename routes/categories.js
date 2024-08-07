const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);

// Cập nhật danh mục theo ID
router.put('/:id', categoryController.updateCategory);

// Xóa danh mục theo ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;