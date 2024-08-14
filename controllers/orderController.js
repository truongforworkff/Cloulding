const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// Thêm đơn hàng mới
exports.addOrder = async (req, res) => {
    try {
        const { customer, products, totalPrice, status } = req.body;
        const customerDetails = await User.findById(customer);

        // Kiểm tra thông tin bắt buộc
        if (!customerDetails.phone || !customerDetails.address) {
            return res.status(400).json({ message: 'Bạn cần cung cấp đầy đủ thông tin số điện thoại và địa chỉ trước khi đặt hàng.' });
        }
        // Kiểm tra thông tin sản phẩm
        const productDetails = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item.productId); // Tìm sản phẩm theo ID
                return {
                    productId: item.productId,
                    title: product.title, // Lưu tiêu đề sản phẩm
                    quantity: item.quantity,
                    price: product.price, // Giá của sản phẩm từ bảng Product
                    size: item.size, // Kích thước từ yêu cầu
                    color: item.color // Màu sắc từ yêu cầu
                };
            })
        );

        const newOrder = new Order({
            customer,
            products: productDetails,
            totalPrice,
            status
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer') // Populate thông tin khách hàng
            .populate('products.productId'); // Populate thông tin sản phẩm

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId)
            .populate('customer') // Populate thông tin khách hàng
            .populate('products.productId'); // Populate thông tin sản phẩm

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Cập nhật đơn hàng theo ID
exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Xóa đơn hàng theo ID
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

