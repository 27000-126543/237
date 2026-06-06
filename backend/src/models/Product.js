const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  images: [{ type: String }],
  description: String,
  specs: { type: Map, of: String },
  stock: { type: Number, default: 100 },
  sales: { type: Number, default: 0 },
  tags: [String],
  rating: { type: Number, default: 5 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
