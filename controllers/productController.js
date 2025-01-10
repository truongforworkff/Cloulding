const Product = require('../models/productModel');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const cloudinary = require('../config/cloudinaryConfig');


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
            categoryId: product.categorySlug,
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
// exports.addProduct = async (req, res) => {
//     try {
//         const { title, price, image01, image02, categorySlug, slug, description, colors, size } = req.body;

//         const newProduct = new Product({
//             title,
//             price,
//             image01,
//             image02,
//             categorySlug,
//             slug,
//             description,
//             colors,
//             size
//         });

//         const savedProduct = await newProduct.save();
//         res.status(201).json(savedProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.addProduct = async (req, res) => {
    try {
        const { title, price, categorySlug, slug, description, colors, size } = req.body;
        let image01Url = '';
        let image02Url = '';

        console.log('Files received:', req.files);

        // Lấy URL từ thuộc tính path
        if (req.files.image01) {
            image01Url = req.files.image01[0].path;
            // console.log('Image 01 URL:', image01Url);
        }

        if (req.files.image02) {
            image02Url = req.files.image02[0].path;
            // console.log('Image 02 URL:', image02Url);
        }

        console.log('Final Image URLs:', {
            image01: image01Url,
            image02: image02Url
        });

        // Tạo sản phẩm mới với URLs
        const newProduct = new Product({
            title,
            price,
            image01: image01Url,
            image02: image02Url,
            categorySlug,
            slug,
            description,
            colors: colors ? JSON.parse(colors) : [],
            size: size ? JSON.parse(size) : [],
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};


// Cập nhật sản phẩm theo ID
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, price, categorySlug, slug, description, colors, size } = req.body;

        let image01Url = '';
        let image02Url = '';

      

        // Lấy URL từ thuộc tính path
        if (req.files.image01) {
            image01Url = req.files.image01[0].path;
        }

        if (req.files.image02) {
            image02Url = req.files.image02[0].path;
        }

        console.log('Final Image URLs:', {
            image01: image01Url,
            image02: image02Url
        });

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { title, price, image01: image01Url, image02: image02Url, categorySlug, slug, description, colors, size },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm',
                productId
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật sản phẩm thành công',
            product: updatedProduct,
            updatedFields: {
                title: title || 'Không thay đổi',
                price: price || 'Không thay đổi',
                image01: image01Url || 'Không thay đổi',
                image02: image02Url || 'Không thay đổi',
                categorySlug: categorySlug || 'Không thay đổi',
                slug: slug || 'Không thay đổi',
                description: description || 'Không thay đổi',
                colors: colors || 'Không thay đổi',
                size: size || 'Không thay đổi'
            }
        });

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi cập nhật sản phẩm',
            error: error.message,
            details: error.stack
        });
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
