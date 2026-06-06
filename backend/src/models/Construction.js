const mongoose = require('mongoose');

const constructionSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  address: String,
  area: Number,
  totalPrice: Number,
  expectedDays: Number,
  constructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['bidding', 'contract', 'constructing', 'acceptance', 'completed', 'cancelled'],
    default: 'bidding'
  },
  bids: [{
    constructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    days: Number,
    description: String,
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
  }],
  contract: {
    content: String,
    signedByOwner: { type: Boolean, default: false },
    signedByConstructor: { type: Boolean, default: false },
    signedAt: Date,
    ownerSignature: String,
    constructorSignature: String
  },
  progress: [{
    name: String,
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    startDate: Date,
    endDate: Date,
    completedAt: Date,
    description: String
  }],
  photos: [{
    url: String,
    description: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now }
  }],
  reports: [{
    title: String,
    content: String,
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submittedAt: { type: Date, default: Date.now },
    type: { type: String, enum: ['normal', 'warning', 'issue'], default: 'normal' }
  }],
  acceptance: {
    items: [{
      name: String,
      passed: Boolean,
      remark: String
    }],
    passed: Boolean,
    acceptedAt: Date,
    remark: String
  },
  timeline: [{
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['completed', 'current', 'pending'], default: 'pending' }
  }],
  startDate: Date,
  expectedEndDate: Date,
  actualEndDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Construction', constructionSchema);
