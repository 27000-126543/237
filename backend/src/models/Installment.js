const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  amount: { type: Number, required: true },
  term: { type: Number, required: true },
  monthlyPayment: Number,
  interestRate: { type: Number, default: 0.045 },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'], 
    default: 'pending' 
  },
  applicationInfo: {
    monthlyIncome: Number,
    hasProperty: Boolean,
    creditScore: Number,
    idCard: String
  },
  repaymentPlan: [{
    period: Number,
    amount: Number,
    principal: Number,
    interest: Number,
    dueDate: Date,
    status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
    paidAt: Date
  }],
  approvedAt: Date,
  rejectedReason: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Installment', installmentSchema);
