const Product = require('../models/productModel');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categorySlug');
        
        // Định dạng lại kết quả
        const formattedProducts = products.map(product => ({
            id: product._id,
            title: product.title,
            price: product.price,
            image01: product.image01,
            image02: product.image02,
            categorySlug: product.categorySlug.slug,
            colors: product.colors, // Chỉ lấy display của category
            slug: product.slug,
            size: product.size,
            description: product.description
            
            
        }));

        res.json(formattedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id; // Lấy productId từ tham số
        const product = await Product.findById(productId).populate('categorySlug'); // Populate với categorySlug

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductBySlug = async (req, res) => {
    try {
        const productSlug = req.params.slug; // Lấy slug từ tham số
        const product = await Product.findOne({ slug: productSlug }).populate('categorySlug'); // Tìm sản phẩm theo slug và populate với categorySlug

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
    try {
        const { title, price, image01, image02, categorySlug, slug, description, colors, size } = req.body;

        const newProduct = new Product({
            title,
            price,
            image01,
            image02,
            categorySlug,
            slug,
            description,
            colors,
            size
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Cập nhật sản phẩm theo ID
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, price, image01, image02, categorySlug, slug, description, colors, size } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { title, price, image01, image02, categorySlug, slug, description, colors, size },
            { new: true } // Trả về tài liệu đã cập nhật
        );

        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Xóa sản phẩm theo ID
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
