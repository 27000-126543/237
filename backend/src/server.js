require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('./routes/authRoutes');
const designerRoutes = require('./routes/designerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const constructionRoutes = require('./routes/constructionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const reportRoutes = require('./routes/reportRoutes');
const seedDatabase = require('./data/seed');

const app = express();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadDir));

let dbConnected = false;
let mongoServer = null;

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    dbConnected = true;
    console.log('✅ MongoDB connected successfully (local)');
    return true;
  } catch (err) {
    console.log('⚠️  本地MongoDB连接失败，正在启动内存数据库...');
    try {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      dbConnected = true;
      console.log('✅ MongoDB connected successfully (in-memory)');
      console.log('📌 内存数据库URI:', mongoUri);
      
      console.log('🌱 正在初始化种子数据...');
      await seedDatabase(true);
      console.log('✅ 种子数据初始化完成');
      return true;
    } catch (memoryErr) {
      console.error('❌ 内存数据库启动失败:', memoryErr.message);
      return false;
    }
  }
}

connectDatabase().then((connected) => {
  if (!connected) {
    console.log('⚠️  数据库连接失败，但服务将继续运行');
  }
});

app.use((req, res, next) => {
  if (!dbConnected && !req.path.includes('/health')) {
    return res.status(503).json({
      success: false,
      message: '数据库连接未就绪，正在初始化中...',
    });
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/designers', designerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/construction', constructionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reports', reportRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '筑家平台后端服务运行正常',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
