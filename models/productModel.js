const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image01: { type: String, required: true },
    image02: { type: String }, 
    categorySlug: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    colors: { type: [String], default: [] },
    size: { type: [String], default: [] },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;


