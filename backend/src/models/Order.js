const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  type: String,
  price: Number,
  quantity: Number,
  image: String,
  specs: Object
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  designerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { 
    type: String, 
    enum: ['design', 'material', 'construction', 'full'], 
    required: true 
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'processing', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  totalAmount: { type: Number, required: true },
  items: [orderItemSchema],
  address: {
    province: String,
    city: String,
    district: String,
    detail: String,
    contactName: String,
    contactPhone: String
  },
  paymentNodes: [{
    name: String,
    amount: Number,
    percentage: Number,
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    deadline: Date,
    paidAt: Date
  }],
  houseInfo: {
    area: Number,
    layout: String,
    style: String,
    budget: Number
  },
  remark: String,
  paidAt: Date,
  completedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
