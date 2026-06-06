const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://picsum.photos/200/200?random=user' },
  role: { 
    type: String, 
    enum: ['owner', 'designer', 'constructor', 'supplier', 'admin'], 
    default: 'owner' 
  },
  city: { type: String, default: '北京' },
  profile: {
    gender: String,
    birthday: Date,
    address: String
  },
  designerProfile: {
    title: String,
    styles: [String],
    rating: { type: Number, default: 5 },
    orderCount: { type: Number, default: 0 },
    priceRange: { min: Number, max: Number },
    description: String,
    portfolio: [{
      title: String,
      style: String,
      area: Number,
      budget: Number,
      coverImage: String,
      images: [String],
      panoramaUrl: String
    }],
    certifications: [String],
    experience: Number
  },
  constructorProfile: {
    companyName: String,
    leaderName: String,
    rating: { type: Number, default: 5 },
    completedProjects: { type: Number, default: 0 },
    license: String,
    insurance: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
