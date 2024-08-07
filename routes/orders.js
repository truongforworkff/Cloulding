const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Thêm đơn hàng mới
router.post('/', orderController.addOrder);

// Lấy tất cả đơn hàng
router.get('/', orderController.getAllOrders);

// Lấy đơn hàng theo ID
router.get('/:id', orderController.getOrderById);

// Cập nhật đơn hàng theo ID
router.put('/:id', orderController.updateOrder);

// Xóa đơn hàng theo ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
