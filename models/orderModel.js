const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            },
            size: {
                type: String, // Thay đổi tùy thuộc vào loại dữ liệu bạn muốn lưu
                required: true,
            },
            color: {
                type: String, // Thay đổi tùy thuộc vào loại dữ liệu bạn muốn lưu
                required: true,
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    }
}, {
    timestamps: true,
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
