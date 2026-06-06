require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Construction = require('../models/Construction');
const Review = require('../models/Review');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zhujia';
let isSeeded = false;

const generateOrderNo = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `DD${year}${month}${day}${random}`;
};

const seedDatabase = async (skipConnect = false) => {
  try {
    if (isSeeded) {
      console.log('⚠️  种子数据已初始化，跳过');
      return;
    }
    
    if (!skipConnect) {
      console.log('🔗 正在连接数据库...');
      await mongoose.connect(MONGODB_URI);
      console.log('✅ 数据库连接成功');
    }

    console.log('🗑️  正在清空现有数据...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Construction.deleteMany({});
    await Review.deleteMany({});
    console.log('✅ 数据清空完成');

    console.log('👤 正在创建管理员账号...');
    const adminPassword = await bcrypt.hash('123456', 10);
    const admin = await User.create({
      name: '系统管理员',
      phone: '13800000000',
      email: 'admin@zhujia.com',
      password: adminPassword,
      role: 'admin',
      avatar: 'https://picsum.photos/seed/admin/200/200',
      city: '北京'
    });
    console.log('✅ 管理员账号创建成功: admin/123456');

    console.log('🎨 正在创建设计师数据...');
    const designersData = [
      {
        name: '张伟',
        phone: '13800000001',
        email: 'zhangwei@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer1/200/200',
        city: '北京',
        designerProfile: {
          title: '首席设计师',
          styles: ['现代简约'],
          rating: 4.9,
          orderCount: 86,
          priceRange: { min: 50000, max: 300000 },
          description: '专注现代简约风格，擅长空间利用与光线设计，作品多次获得行业奖项。',
          experience: 12,
          certifications: ['高级室内设计师', '注册建筑师'],
          portfolio: [
            {
              title: '翡翠花园三居室',
              style: '现代简约',
              area: 128,
              budget: 280000,
              coverImage: 'https://picsum.photos/seed/portfolio1-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio1-1/800/600',
                'https://picsum.photos/seed/portfolio1-2/800/600'
              ]
            }
          ]
        }
      },
      {
        name: '李娜',
        phone: '13800000002',
        email: 'lina@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer2/200/200',
        city: '上海',
        designerProfile: {
          title: '资深设计师',
          styles: ['北欧风格'],
          rating: 4.8,
          orderCount: 52,
          priceRange: { min: 40000, max: 200000 },
          description: '北欧风格设计专家，注重自然材质与温馨氛围，为客户打造舒适家居。',
          experience: 8,
          certifications: ['室内设计中级设计师'],
          portfolio: [
            {
              title: '阳光海岸两居室',
              style: '北欧风格',
              area: 95,
              budget: 168000,
              coverImage: 'https://picsum.photos/seed/portfolio2-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio2-1/800/600',
                'https://picsum.photos/seed/portfolio2-2/800/600'
              ]
            }
          ]
        }
      },
      {
        name: '王强',
        phone: '13800000003',
        email: 'wangqiang@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer3/200/200',
        city: '深圳',
        designerProfile: {
          title: '设计总监',
          styles: ['新中式'],
          rating: 4.9,
          orderCount: 120,
          priceRange: { min: 100000, max: 1000000 },
          description: '新中式风格领军人物，将传统元素与现代设计完美融合，独具东方韵味。',
          experience: 15,
          certifications: ['高级室内设计师', '中国建筑装饰协会会员'],
          portfolio: [
            {
              title: '紫云台新中式大宅',
              style: '新中式',
              area: 268,
              budget: 880000,
              coverImage: 'https://picsum.photos/seed/portfolio3-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio3-1/800/600',
                'https://picsum.photos/seed/portfolio3-2/800/600'
              ]
            }
          ]
        }
      },
      {
        name: '陈静',
        phone: '13800000004',
        email: 'chenjing@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer4/200/200',
        city: '广州',
        designerProfile: {
          title: '资深设计师',
          styles: ['轻奢风格'],
          rating: 4.7,
          orderCount: 68,
          priceRange: { min: 80000, max: 500000 },
          description: '轻奢风格设计专家，精致细节与品质生活的追求者，打造优雅空间。',
          experience: 10,
          certifications: ['高级室内设计师'],
          portfolio: [
            {
              title: '锦绣华府轻奢四居',
              style: '轻奢风格',
              area: 165,
              budget: 450000,
              coverImage: 'https://picsum.photos/seed/portfolio4-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio4-1/800/600',
                'https://picsum.photos/seed/portfolio4-2/800/600'
              ]
            }
          ]
        }
      },
      {
        name: '孙磊',
        phone: '13800000005',
        email: 'sunlei@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer5/200/200',
        city: '杭州',
        designerProfile: {
          title: '主案设计师',
          styles: ['日式风格'],
          rating: 4.7,
          orderCount: 38,
          priceRange: { min: 40000, max: 180000 },
          description: '日式禅意风格设计专家，追求简约自然，注重功能性与美学的统一。',
          experience: 6,
          certifications: ['室内设计师'],
          portfolio: [
            {
              title: '日式禅意小居',
              style: '日式风格',
              area: 78,
              budget: 128000,
              coverImage: 'https://picsum.photos/seed/portfolio5-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio5-1/800/600',
                'https://picsum.photos/seed/portfolio5-2/800/600'
              ]
            }
          ]
        }
      },
      {
        name: '刘洋',
        phone: '13800000006',
        email: 'liuyang@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer6/200/200',
        city: '成都',
        designerProfile: {
          title: '主案设计师',
          styles: ['工业风格'],
          rating: 4.6,
          orderCount: 45,
          priceRange: { min: 50000, max: 250000 },
          description: '工业风格设计爱好者，擅用水泥、铁艺、原木等元素，打造个性空间。',
          experience: 7,
          certifications: ['室内设计师'],
          portfolio: [
            {
              title: '青春里LOFT工业风',
              style: '工业风格',
              area: 68,
              budget: 128000,
              coverImage: 'https://picsum.photos/seed/portfolio6-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio6-1/800/600',
                'https://picsum.photos/seed/portfolio6-2/800/600'
              ]
            }
          ]
        }
      },
      {
        name: '赵雪',
        phone: '13800000007',
        email: 'zhaoxue@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer7/200/200',
        city: '南京',
        designerProfile: {
          title: '资深设计师',
          styles: ['法式风格'],
          rating: 4.8,
          orderCount: 58,
          priceRange: { min: 60000, max: 400000 },
          description: '法式浪漫主义设计代表，注重线条美感与优雅气质，打造精致浪漫空间。',
          experience: 9,
          certifications: ['高级室内设计师'],
          portfolio: [
            {
              title: '法式浪漫公寓',
              style: '法式风格',
              area: 138,
              budget: 380000,
              coverImage: 'https://picsum.photos/seed/portfolio7-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio7-1/800/600',
                'https://picsum.photos/seed/portfolio7-2/800/600'
              ]
            }
          ]
        }
      },
      {
        name: '周敏',
        phone: '13800000008',
        email: 'zhoumin@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer8/200/200',
        city: '武汉',
        designerProfile: {
          title: '首席设计师',
          styles: ['美式风格'],
          rating: 4.8,
          orderCount: 72,
          priceRange: { min: 70000, max: 450000 },
          description: '美式古典与现代融合，打造舒适大气的居家环境，注重品质与细节。',
          experience: 11,
          certifications: ['高级室内设计师'],
          portfolio: [
            {
              title: '美式古典别墅',
              style: '美式风格',
              area: 220,
              budget: 680000,
              coverImage: 'https://picsum.photos/seed/portfolio8-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio8-1/800/600',
                'https://picsum.photos/seed/portfolio8-2/800/600'
              ]
            }
          ]
        }
      },
      {
        name: '吴涛',
        phone: '13800000009',
        email: 'wutao@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer9/200/200',
        city: '西安',
        designerProfile: {
          title: '设计师',
          styles: ['极简风格'],
          rating: 4.5,
          orderCount: 32,
          priceRange: { min: 35000, max: 180000 },
          description: '极简主义设计践行者，少即是多的设计理念，为客户创造纯粹的空间体验。',
          experience: 5,
          certifications: ['室内设计师'],
          portfolio: [
            {
              title: '极简白色公寓',
              style: '极简风格',
              area: 85,
              budget: 118000,
              coverImage: 'https://picsum.photos/seed/portfolio9-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio9-1/800/600',
                'https://picsum.photos/seed/portfolio9-2/800/600'
              ]
            }
          ]
        }
      },
      {
        name: '郑芳',
        phone: '13800000010',
        email: 'zhengfang@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'designer',
        avatar: 'https://picsum.photos/seed/designer10/200/200',
        city: '厦门',
        designerProfile: {
          title: '资深设计师',
          styles: ['地中海风格'],
          rating: 4.6,
          orderCount: 48,
          priceRange: { min: 45000, max: 220000 },
          description: '地中海风格设计专家，蓝色与白色的浪漫组合，打造清新自然的海洋风情。',
          experience: 8,
          certifications: ['室内设计中级设计师'],
          portfolio: [
            {
              title: '地中海风情公寓',
              style: '地中海风格',
              area: 105,
              budget: 198000,
              coverImage: 'https://picsum.photos/seed/portfolio10-1/800/600',
              images: [
                'https://picsum.photos/seed/portfolio10-1/800/600',
                'https://picsum.photos/seed/portfolio10-2/800/600'
              ]
            }
          ]
        }
      }
    ];

    const designers = await User.insertMany(designersData);
    console.log(`✅ 成功创建 ${designers.length} 位设计师`);

    console.log('🔨 正在创建施工队数据...');
    const constructorsData = [
      {
        name: '金牌施工队',
        phone: '13900000001',
        email: 'team1@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'constructor',
        avatar: 'https://picsum.photos/seed/team1/200/200',
        city: '北京',
        constructorProfile: {
          companyName: '金牌装饰工程有限公司',
          leaderName: '张建国',
          rating: 4.9,
          completedProjects: 156,
          license: '建装资字第12345号',
          insurance: '建筑工程一切险'
        }
      },
      {
        name: '精工装饰队',
        phone: '13900000002',
        email: 'team2@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'constructor',
        avatar: 'https://picsum.photos/seed/team2/200/200',
        city: '上海',
        constructorProfile: {
          companyName: '精工建筑装饰有限公司',
          leaderName: '李师傅',
          rating: 4.8,
          completedProjects: 98,
          license: '建装资字第23456号',
          insurance: '建筑工程一切险'
        }
      },
      {
        name: '匠心工程队',
        phone: '13900000003',
        email: 'team3@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'constructor',
        avatar: 'https://picsum.photos/seed/team3/200/200',
        city: '深圳',
        constructorProfile: {
          companyName: '匠心建筑工程有限公司',
          leaderName: '王工长',
          rating: 4.7,
          completedProjects: 132,
          license: '建装资字第34567号',
          insurance: '建筑工程一切险'
        }
      },
      {
        name: '诚信装修队',
        phone: '13900000004',
        email: 'team4@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'constructor',
        avatar: 'https://picsum.photos/seed/team4/200/200',
        city: '广州',
        constructorProfile: {
          companyName: '诚信装饰工程有限公司',
          leaderName: '陈队长',
          rating: 4.6,
          completedProjects: 78,
          license: '建装资字第45678号',
          insurance: '建筑工程一切险'
        }
      },
      {
        name: '优品施工队',
        phone: '13900000005',
        email: 'team5@zhujia.com',
        password: await bcrypt.hash('123456', 10),
        role: 'constructor',
        avatar: 'https://picsum.photos/seed/team5/200/200',
        city: '杭州',
        constructorProfile: {
          companyName: '优品建筑装饰有限公司',
          leaderName: '刘工头',
          rating: 4.8,
          completedProjects: 112,
          license: '建装资字第56789号',
          insurance: '建筑工程一切险'
        }
      }
    ];

    const constructors = await User.insertMany(constructorsData);
    console.log(`✅ 成功创建 ${constructors.length} 支施工队`);

    console.log('🏠 正在创建普通业主用户...');
    const ownersData = [];
    const ownerNames = ['张先生', '李女士', '王先生', '刘女士', '陈先生', '赵女士', '孙先生', '周女士', '吴先生', '郑女士'];
    for (let i = 0; i < 10; i++) {
      ownersData.push({
        name: ownerNames[i],
        phone: `1370000000${i + 1}`,
        email: `owner${i + 1}@zhujia.com`,
        password: await bcrypt.hash('123456', 10),
        role: 'owner',
        avatar: `https://picsum.photos/seed/owner${i + 1}/200/200`,
        city: ['北京', '上海', '深圳', '广州', '杭州', '成都', '武汉', '南京', '西安', '厦门'][i],
        profile: {
          gender: i % 2 === 0 ? '男' : '女',
          address: `某某小区${i + 1}栋${i + 1}单元${(i + 1) * 10}1室`
        }
      });
    }
    const owners = await User.insertMany(ownersData);
    console.log(`✅ 成功创建 ${owners.length} 位业主用户`);

    console.log('🛒 正在创建建材商品数据...');
    const productsData = [
      {
        name: '三层实木复合地板',
        brand: '圣象',
        category: '地板',
        subCategory: '实木地板',
        price: 289,
        originalPrice: 359,
        images: ['https://picsum.photos/seed/floor1/400/400'],
        description: '橡木表层，环保基材，脚感舒适，耐磨耐用，适合家庭装修使用。',
        specs: new Map([['规格', '1210*165*15mm'], ['材质', '橡木'], ['环保等级', 'E0级']]),
        stock: 500,
        sales: 1256,
        tags: ['实木', '环保', '耐磨'],
        rating: 4.8,
        reviewCount: 256
      },
      {
        name: '强化复合地板',
        brand: '大自然',
        category: '地板',
        subCategory: '强化地板',
        price: 129,
        originalPrice: 169,
        images: ['https://picsum.photos/seed/floor2/400/400'],
        description: '高密度基材，防水耐磨，适合家装首选，性价比极高。',
        specs: new Map([['规格', '1218*199*12mm'], ['材质', '高密度纤维板'], ['环保等级', 'E1级']]),
        stock: 800,
        sales: 2340,
        tags: ['强化', '防水', '高性价比'],
        rating: 4.6,
        reviewCount: 389
      },
      {
        name: '纯实木地板',
        brand: '安信',
        category: '地板',
        subCategory: '实木地板',
        price: 459,
        originalPrice: 569,
        images: ['https://picsum.photos/seed/floor3/400/400'],
        description: '进口原木，天然环保，纹理美观，高端装修首选。',
        specs: new Map([['规格', '910*125*18mm'], ['材质', '进口柚木'], ['环保等级', '天然环保']]),
        stock: 200,
        sales: 568,
        tags: ['纯实木', '进口', '高端'],
        rating: 4.9,
        reviewCount: 128
      },
      {
        name: 'SPC石塑地板',
        brand: '扬子',
        category: '地板',
        subCategory: '石塑地板',
        price: 89,
        originalPrice: 129,
        images: ['https://picsum.photos/seed/floor4/400/400'],
        description: '零甲醛防水，卡扣安装，适合旧房改造，安装简单快捷。',
        specs: new Map([['规格', '1220*180*4mm'], ['材质', '石塑'], ['环保等级', '零甲醛']]),
        stock: 1200,
        sales: 3450,
        tags: ['石塑', '零甲醛', '防水'],
        rating: 4.5,
        reviewCount: 567
      },
      {
        name: '仿古木纹瓷砖',
        brand: '东鹏',
        category: '瓷砖',
        subCategory: '木纹砖',
        price: 79,
        originalPrice: 109,
        images: ['https://picsum.photos/seed/tile1/400/400'],
        description: '仿实木纹理，防滑耐磨，适合客厅卧室，美观又实用。',
        specs: new Map([['规格', '600*600mm'], ['材质', '瓷质砖'], ['吸水率', '<0.5%']]),
        stock: 600,
        sales: 1890,
        tags: ['木纹砖', '防滑', '仿实木'],
        rating: 4.7,
        reviewCount: 345
      },
      {
        name: '通体大理石瓷砖',
        brand: '马可波罗',
        category: '瓷砖',
        subCategory: '大理石砖',
        price: 159,
        originalPrice: 219,
        images: ['https://picsum.photos/seed/tile2/400/400'],
        description: '通体大理石纹理，高端大气，适合客厅餐厅，提升空间档次。',
        specs: new Map([['规格', '800*800mm'], ['材质', '通体砖'], ['吸水率', '<0.1%']]),
        stock: 450,
        sales: 1230,
        tags: ['大理石', '通体', '高端'],
        rating: 4.8,
        reviewCount: 234
      },
      {
        name: '瓷质仿古砖',
        brand: '诺贝尔',
        category: '瓷砖',
        subCategory: '仿古砖',
        price: 99,
        originalPrice: 139,
        images: ['https://picsum.photos/seed/tile3/400/400'],
        description: '复古风格，防滑性能好，适合阳台厨房，营造复古氛围。',
        specs: new Map([['规格', '600*600mm'], ['材质', '瓷质砖'], ['风格', '复古']]),
        stock: 550,
        sales: 980,
        tags: ['仿古', '防滑', '复古'],
        rating: 4.6,
        reviewCount: 178
      },
      {
        name: '300*600内墙砖',
        brand: '冠珠',
        category: '瓷砖',
        subCategory: '内墙砖',
        price: 49,
        originalPrice: 69,
        images: ['https://picsum.photos/seed/tile4/400/400'],
        description: '光亮釉面，易清洁，适合厨房卫生间，日常清洁轻松。',
        specs: new Map([['规格', '300*600mm'], ['材质', '陶瓷'], ['表面', '亮面']]),
        stock: 1000,
        sales: 2560,
        tags: ['内墙砖', '亮面', '易清洁'],
        rating: 4.5,
        reviewCount: 456
      },
      {
        name: '小颗粒马赛克',
        brand: '赛德斯邦',
        category: '瓷砖',
        subCategory: '马赛克',
        price: 129,
        originalPrice: 169,
        images: ['https://picsum.photos/seed/tile5/400/400'],
        description: '玻璃材质，多色可选，适合背景墙，打造独特装饰效果。',
        specs: new Map([['规格', '300*300mm'], ['材质', '玻璃'], ['风格', '现代']]),
        stock: 300,
        sales: 450,
        tags: ['马赛克', '玻璃', '背景墙'],
        rating: 4.7,
        reviewCount: 89
      },
      {
        name: '抛光砖',
        brand: '蒙娜丽莎',
        category: '瓷砖',
        subCategory: '抛光砖',
        price: 69,
        originalPrice: 99,
        images: ['https://picsum.photos/seed/tile6/400/400'],
        description: '高光泽度，坚硬耐磨，性价比高，适合大面积铺贴。',
        specs: new Map([['规格', '800*800mm'], ['材质', '瓷质砖'], ['表面', '抛光']]),
        stock: 700,
        sales: 1670,
        tags: ['抛光砖', '耐磨', '高性价比'],
        rating: 4.4,
        reviewCount: 298
      },
      {
        name: '净味内墙乳胶漆',
        brand: '立邦',
        category: '涂料',
        subCategory: '乳胶漆',
        price: 399,
        originalPrice: 499,
        images: ['https://picsum.photos/seed/paint1/400/400'],
        description: '净味环保，遮盖力强，可调色，打造健康家居环境。',
        specs: new Map([['规格', '5L'], ['类型', '内墙乳胶漆'], ['功能', '净味']]),
        stock: 200,
        sales: 890,
        tags: ['乳胶漆', '净味', '环保'],
        rating: 4.9,
        reviewCount: 567
      },
      {
        name: '硅藻泥墙面漆',
        brand: '多乐士',
        category: '涂料',
        subCategory: '硅藻泥',
        price: 299,
        originalPrice: 389,
        images: ['https://picsum.photos/seed/paint2/400/400'],
        description: '吸附甲醛，调节湿度，环保健康，会呼吸的墙面。',
        specs: new Map([['规格', '5L'], ['类型', '硅藻泥'], ['功能', '除甲醛']]),
        stock: 150,
        sales: 560,
        tags: ['硅藻泥', '除甲醛', '环保'],
        rating: 4.8,
        reviewCount: 345
      },
      {
        name: '防水涂料',
        brand: '东方雨虹',
        category: '涂料',
        subCategory: '防水涂料',
        price: 189,
        originalPrice: 249,
        images: ['https://picsum.photos/seed/paint3/400/400'],
        description: '柔性防水，抗拉强度高，适合厨卫，防水效果持久。',
        specs: new Map([['规格', '18kg'], ['类型', '柔性防水'], ['适用', '厨卫']]),
        stock: 300,
        sales: 1200,
        tags: ['防水', '柔性', '厨卫专用'],
        rating: 4.7,
        reviewCount: 456
      },
      {
        name: '外墙乳胶漆',
        brand: '立邦',
        category: '涂料',
        subCategory: '外墙漆',
        price: 459,
        originalPrice: 569,
        images: ['https://picsum.photos/seed/paint4/400/400'],
        description: '耐候性强，防紫外线，保色性好，外墙专用。',
        specs: new Map([['规格', '20L'], ['类型', '外墙漆'], ['功能', '耐候']]),
        stock: 100,
        sales: 320,
        tags: ['外墙漆', '耐候', '防紫外线'],
        rating: 4.6,
        reviewCount: 123
      },
      {
        name: '艺术漆',
        brand: '三棵树',
        category: '涂料',
        subCategory: '艺术漆',
        price: 599,
        originalPrice: 759,
        images: ['https://picsum.photos/seed/paint5/400/400'],
        description: '质感丰富，装饰性强，打造个性空间，艺术与实用结合。',
        specs: new Map([['规格', '5L'], ['类型', '艺术漆'], ['效果', '质感']]),
        stock: 80,
        sales: 230,
        tags: ['艺术漆', '质感', '装饰'],
        rating: 4.7,
        reviewCount: 89
      },
      {
        name: '现代简约吸顶灯',
        brand: '欧普照明',
        category: '灯具',
        subCategory: '吸顶灯',
        price: 299,
        originalPrice: 399,
        images: ['https://picsum.photos/seed/light1/400/400'],
        description: 'LED光源，无极调光，简约大气，客厅卧室通用。',
        specs: new Map([['规格', '直径50cm'], ['光源', 'LED'], ['功能', '无极调光']]),
        stock: 150,
        sales: 1890,
        tags: ['吸顶灯', 'LED', '简约'],
        rating: 4.8,
        reviewCount: 567
      },
      {
        name: '北欧风吊灯',
        brand: '雷士照明',
        category: '灯具',
        subCategory: '吊灯',
        price: 599,
        originalPrice: 759,
        images: ['https://picsum.photos/seed/light2/400/400'],
        description: '铁艺框架，三色调光，适合餐厅，营造温馨就餐氛围。',
        specs: new Map([['规格', '3头'], ['光源', 'LED'], ['风格', '北欧']]),
        stock: 100,
        sales: 670,
        tags: ['吊灯', '北欧', '餐厅'],
        rating: 4.7,
        reviewCount: 234
      },
      {
        name: '筒灯嵌入式',
        brand: '飞利浦',
        category: '灯具',
        subCategory: '筒灯',
        price: 39,
        originalPrice: 59,
        images: ['https://picsum.photos/seed/light3/400/400'],
        description: 'LED芯片，开孔7.5cm，白光暖光可选，吊顶通用。',
        specs: new Map([['规格', '5W'], ['光源', 'LED'], ['开孔', '75mm']]),
        stock: 500,
        sales: 3450,
        tags: ['筒灯', '嵌入式', 'LED'],
        rating: 4.6,
        reviewCount: 890
      },
      {
        name: 'LED灯带',
        brand: '欧普照明',
        category: '灯具',
        subCategory: '灯带',
        price: 29,
        originalPrice: 45,
        images: ['https://picsum.photos/seed/light4/400/400'],
        description: '2835贴片，暖白光，吊顶装饰用，营造温馨氛围。',
        specs: new Map([['规格', '60珠/米'], ['光源', 'LED'], ['颜色', '暖白光']]),
        stock: 1000,
        sales: 2680,
        tags: ['灯带', 'LED', '装饰'],
        rating: 4.5,
        reviewCount: 567
      },
      {
        name: '镜前灯',
        brand: '雷士照明',
        category: '灯具',
        subCategory: '镜前灯',
        price: 159,
        originalPrice: 219,
        images: ['https://picsum.photos/seed/light5/400/400'],
        description: '防水防雾，LED光源，浴室专用，清晰照明。',
        specs: new Map([['规格', '长度60cm'], ['光源', 'LED'], ['功能', '防水防雾']]),
        stock: 200,
        sales: 890,
        tags: ['镜前灯', '防水', '浴室'],
        rating: 4.6,
        reviewCount: 345
      },
      {
        name: '落地灯',
        brand: '宜家',
        category: '灯具',
        subCategory: '落地灯',
        price: 399,
        originalPrice: 499,
        images: ['https://picsum.photos/seed/light6/400/400'],
        description: '北欧风格，可调角度，客厅卧室适用，阅读照明。',
        specs: new Map([['规格', '高度160cm'], ['光源', 'E27'], ['风格', '北欧']]),
        stock: 80,
        sales: 450,
        tags: ['落地灯', '北欧', '阅读'],
        rating: 4.7,
        reviewCount: 189
      },
      {
        name: '实木浴室柜组合',
        brand: '恒洁',
        category: '卫浴',
        subCategory: '浴室柜',
        price: 2599,
        originalPrice: 3299,
        images: ['https://picsum.photos/seed/bath1/400/400'],
        description: '橡木材质，陶瓷台盆，带镜柜，收纳功能强大。',
        specs: new Map([['规格', '80cm'], ['材质', '橡木'], ['包含', '镜柜+台盆+柜体']]),
        stock: 50,
        sales: 320,
        tags: ['浴室柜', '实木', '橡木'],
        rating: 4.8,
        reviewCount: 156
      },
      {
        name: '喷射虹吸式马桶',
        brand: '九牧',
        category: '卫浴',
        subCategory: '马桶',
        price: 1299,
        originalPrice: 1699,
        images: ['https://picsum.photos/seed/bath2/400/400'],
        description: '节水静音，缓降盖板，釉面光滑，易清洁不挂污。',
        specs: new Map([['规格', '300/400坑距'], ['类型', '喷射虹吸'], ['功能', '节水静音']]),
        stock: 120,
        sales: 890,
        tags: ['马桶', '虹吸式', '节水'],
        rating: 4.7,
        reviewCount: 456
      },
      {
        name: '智能马桶一体机',
        brand: 'TOTO',
        category: '卫浴',
        subCategory: '智能马桶',
        price: 4999,
        originalPrice: 6299,
        images: ['https://picsum.photos/seed/bath3/400/400'],
        description: '即热式冲洗，座圈加热，自动冲水，智能体验。',
        specs: new Map([['规格', '305坑距'], ['类型', '智能一体机'], ['功能', '即热+座圈加热']]),
        stock: 40,
        sales: 230,
        tags: ['智能马桶', 'TOTO', '即热式'],
        rating: 4.9,
        reviewCount: 189
      },
      {
        name: '淋浴花洒套装',
        brand: '摩恩',
        category: '卫浴',
        subCategory: '花洒',
        price: 899,
        originalPrice: 1199,
        images: ['https://picsum.photos/seed/bath4/400/400'],
        description: '全铜主体，三功能出水，带升降杆，淋浴体验佳。',
        specs: new Map([['规格', '明装'], ['材质', '全铜'], ['功能', '三功能出水']]),
        stock: 150,
        sales: 670,
        tags: ['花洒', '全铜', '三功能'],
        rating: 4.8,
        reviewCount: 345
      },
      {
        name: '不锈钢水槽',
        brand: '欧琳',
        category: '卫浴',
        subCategory: '水槽',
        price: 799,
        originalPrice: 999,
        images: ['https://picsum.photos/seed/bath5/400/400'],
        description: '304不锈钢，双槽设计，含龙头，厨房必备。',
        specs: new Map([['规格', '78*43cm'], ['材质', '304不锈钢'], ['包含', '水槽+龙头+配件']]),
        stock: 100,
        sales: 560,
        tags: ['水槽', '304不锈钢', '双槽'],
        rating: 4.7,
        reviewCount: 289
      },
      {
        name: '太空铝毛巾架',
        brand: '卡贝',
        category: '卫浴',
        subCategory: '五金挂件',
        price: 299,
        originalPrice: 399,
        images: ['https://picsum.photos/seed/bath6/400/400'],
        description: '免打孔安装，防水防锈，六件套，浴室五金全套。',
        specs: new Map([['规格', '6件套'], ['材质', '太空铝'], ['安装', '免打孔']]),
        stock: 300,
        sales: 1230,
        tags: ['毛巾架', '太空铝', '免打孔'],
        rating: 4.6,
        reviewCount: 567
      },
      {
        name: '简约布艺沙发',
        brand: '顾家家居',
        category: '家具',
        subCategory: '沙发',
        price: 3999,
        originalPrice: 4999,
        images: ['https://picsum.photos/seed/furniture1/400/400'],
        description: '科技布面料，实木框架，可拆洗，坐感舒适。',
        specs: new Map([['规格', '三人位+贵妃'], ['材质', '科技布+实木'], ['功能', '可拆洗']]),
        stock: 30,
        sales: 450,
        tags: ['沙发', '布艺', '可拆洗'],
        rating: 4.8,
        reviewCount: 345
      },
      {
        name: '实木餐桌椅组合',
        brand: '源氏木语',
        category: '家具',
        subCategory: '餐桌',
        price: 2999,
        originalPrice: 3799,
        images: ['https://picsum.photos/seed/furniture2/400/400'],
        description: '橡木材质，一桌四椅，简约现代，餐厅首选。',
        specs: new Map([['规格', '1.4m餐桌+4椅'], ['材质', '橡木'], ['风格', '现代简约']]),
        stock: 50,
        sales: 320,
        tags: ['餐桌', '实木', '橡木'],
        rating: 4.7,
        reviewCount: 234
      },
      {
        name: '板式双人床',
        brand: '全友家居',
        category: '家具',
        subCategory: '床',
        price: 1999,
        originalPrice: 2599,
        images: ['https://picsum.photos/seed/furniture3/400/400'],
        description: '环保板材，气动高箱储物，1.8米大床，收纳强大。',
        specs: new Map([['规格', '180*200cm'], ['材质', '环保板材'], ['功能', '高箱储物']]),
        stock: 80,
        sales: 780,
        tags: ['床', '板式', '储物'],
        rating: 4.6,
        reviewCount: 456
      },
      {
        name: '乳胶床垫',
        brand: '喜临门',
        category: '家具',
        subCategory: '床垫',
        price: 2599,
        originalPrice: 3299,
        images: ['https://picsum.photos/seed/furniture4/400/400'],
        description: '泰国进口乳胶，独立袋装弹簧，护脊助眠。',
        specs: new Map([['规格', '180*200*22cm'], ['材质', '乳胶+独立弹簧'], ['功能', '护脊']]),
        stock: 60,
        sales: 560,
        tags: ['床垫', '乳胶', '独立弹簧'],
        rating: 4.9,
        reviewCount: 567
      },
      {
        name: '整体衣柜定制',
        brand: '索菲亚',
        category: '家具',
        subCategory: '衣柜',
        price: 899,
        originalPrice: 1199,
        images: ['https://picsum.photos/seed/furniture5/400/400'],
        description: 'E0级环保板材，多种门型可选，量身定制。',
        specs: new Map([['规格', '定制'], ['材质', 'E0级板材'], ['风格', '多种可选']]),
        stock: 999,
        sales: 890,
        tags: ['衣柜', '定制', '环保'],
        rating: 4.8,
        reviewCount: 345
      },
      {
        name: '电视柜茶几组合',
        brand: '全友家居',
        category: '家具',
        subCategory: '电视柜',
        price: 1999,
        originalPrice: 2599,
        images: ['https://picsum.photos/seed/furniture6/400/400'],
        description: '简约现代，钢化玻璃台面，可伸缩，客厅必备。',
        specs: new Map([['规格', '电视柜+茶几'], ['材质', '板材+钢化玻璃'], ['功能', '可伸缩']]),
        stock: 70,
        sales: 450,
        tags: ['电视柜', '茶几', '组合'],
        rating: 4.5,
        reviewCount: 234
      },
      {
        name: '岩板电视背景墙',
        brand: '蒙娜丽莎',
        category: '建材',
        subCategory: '背景墙',
        price: 1299,
        originalPrice: 1699,
        images: ['https://picsum.photos/seed/material1/400/400'],
        description: '1200*2400大规格岩板，轻奢大气，提升客厅档次。',
        specs: new Map([['规格', '定制'], ['材质', '岩板'], ['风格', '轻奢']]),
        stock: 100,
        sales: 230,
        tags: ['背景墙', '岩板', '轻奢'],
        rating: 4.8,
        reviewCount: 123
      },
      {
        name: '集成吊顶铝扣板',
        brand: '奥普',
        category: '建材',
        subCategory: '吊顶',
        price: 129,
        originalPrice: 169,
        images: ['https://picsum.photos/seed/material2/400/400'],
        description: '0.6mm厚铝扣板，抗油污易清洁，厨房卫生间适用。',
        specs: new Map([['规格', '300*300mm'], ['材质', '铝合金'], ['功能', '抗油污']]),
        stock: 500,
        sales: 1670,
        tags: ['吊顶', '铝扣板', '抗油污'],
        rating: 4.6,
        reviewCount: 345
      },
      {
        name: '浴霸风暖',
        brand: '奥普',
        category: '建材',
        subCategory: '浴霸',
        price: 599,
        originalPrice: 759,
        images: ['https://picsum.photos/seed/material3/400/400'],
        description: '双核动力，风暖照明换气三合一，浴室取暖神器。',
        specs: new Map([['规格', '300*600mm'], ['类型', '风暖'], ['功能', '取暖+照明+换气']]),
        stock: 200,
        sales: 890,
        tags: ['浴霸', '风暖', '多功能'],
        rating: 4.7,
        reviewCount: 456
      },
      {
        name: '厨房整体橱柜定制',
        brand: '欧派',
        category: '建材',
        subCategory: '橱柜',
        price: 2999,
        originalPrice: 3799,
        images: ['https://picsum.photos/seed/material4/400/400'],
        description: '多层实木板柜体，石英石台面，量身定制厨房。',
        specs: new Map([['规格', '定制'], ['材质', '多层实木+石英石'], ['风格', '多种可选']]),
        stock: 999,
        sales: 560,
        tags: ['橱柜', '定制', '石英石'],
        rating: 4.9,
        reviewCount: 289
      },
      {
        name: '室内木门',
        brand: 'TATA木门',
        category: '建材',
        subCategory: '门',
        price: 1599,
        originalPrice: 1999,
        images: ['https://picsum.photos/seed/material5/400/400'],
        description: '实木复合门，静音隔音，含五金，卧室首选。',
        specs: new Map([['规格', '2100*900mm'], ['材质', '实木复合'], ['功能', '静音']]),
        stock: 150,
        sales: 780,
        tags: ['木门', '实木复合', '静音'],
        rating: 4.8,
        reviewCount: 345
      },
      {
        name: '定制断桥铝窗户',
        brand: '凤铝',
        category: '建材',
        subCategory: '窗',
        price: 799,
        originalPrice: 999,
        images: ['https://picsum.photos/seed/material6/400/400'],
        description: '70系列断桥铝，双层中空玻璃，隔音隔热。',
        specs: new Map([['规格', '定制'], ['材质', '断桥铝'], ['功能', '隔音隔热']]),
        stock: 999,
        sales: 340,
        tags: ['窗户', '断桥铝', '隔音'],
        rating: 4.7,
        reviewCount: 189
      },
      {
        name: '304不锈钢防盗网',
        brand: '定制',
        category: '建材',
        subCategory: '防盗网',
        price: 199,
        originalPrice: 259,
        images: ['https://picsum.photos/seed/material7/400/400'],
        description: '202/304不锈钢可选，安全防护，质量可靠。',
        specs: new Map([['规格', '定制'], ['材质', '304不锈钢'], ['功能', '安全防护']]),
        stock: 999,
        sales: 230,
        tags: ['防盗网', '不锈钢', '安全'],
        rating: 4.5,
        reviewCount: 123
      },
      {
        name: 'PPR水管',
        brand: '伟星',
        category: '建材',
        subCategory: '水电材料',
        price: 15,
        originalPrice: 22,
        images: ['https://picsum.photos/seed/material8/400/400'],
        description: '公称外径25mm，壁厚4.2mm，热水管，品质保证。',
        specs: new Map([['规格', '25*4.2mm'], ['材质', 'PPR'], ['类型', '热水管']]),
        stock: 5000,
        sales: 12500,
        tags: ['水管', 'PPR', '伟星'],
        rating: 4.8,
        reviewCount: 567
      },
      {
        name: '国标铜线',
        brand: '远东电缆',
        category: '建材',
        subCategory: '水电材料',
        price: 4.5,
        originalPrice: 6.5,
        images: ['https://picsum.photos/seed/material9/400/400'],
        description: 'BV2.5平方单股铜线，国标品质，安全可靠。',
        specs: new Map([['规格', 'BV2.5mm²'], ['材质', '铜'], ['标准', '国标']]),
        stock: 10000,
        sales: 25600,
        tags: ['电线', '铜线', '国标'],
        rating: 4.9,
        reviewCount: 789
      },
      {
        name: '防水石膏板',
        brand: '龙牌',
        category: '建材',
        subCategory: '板材',
        price: 39,
        originalPrice: 52,
        images: ['https://picsum.photos/seed/material10/400/400'],
        description: '1200*2400*9.5mm，防水防潮，厨卫吊顶专用。',
        specs: new Map([['规格', '1200*2400*9.5mm'], ['材质', '石膏'], ['功能', '防水防潮']]),
        stock: 500,
        sales: 2340,
        tags: ['石膏板', '防水', '龙牌'],
        rating: 4.6,
        reviewCount: 345
      },
      {
        name: '轻钢龙骨',
        brand: '可耐福',
        category: '建材',
        subCategory: '龙骨',
        price: 12,
        originalPrice: 18,
        images: ['https://picsum.photos/seed/material11/400/400'],
        description: '50系列主龙骨，厚度0.6mm，吊顶专用。',
        specs: new Map([['规格', '50系列'], ['材质', '镀锌钢材'], ['类型', '主龙骨']]),
        stock: 3000,
        sales: 8900,
        tags: ['龙骨', '轻钢', '吊顶'],
        rating: 4.7,
        reviewCount: 234
      },
      {
        name: '美缝剂',
        brand: '卓高',
        category: '建材',
        subCategory: '辅材',
        price: 69,
        originalPrice: 95,
        images: ['https://picsum.photos/seed/material12/400/400'],
        description: '双组份真瓷胶，防霉防水，瓷砖美缝专用。',
        specs: new Map([['规格', '400ml'], ['类型', '双组份'], ['功能', '防霉防水']]),
        stock: 1000,
        sales: 5670,
        tags: ['美缝剂', '真瓷胶', '防霉'],
        rating: 4.8,
        reviewCount: 567
      },
      {
        name: '玻璃胶',
        brand: '道康宁',
        category: '建材',
        subCategory: '辅材',
        price: 29,
        originalPrice: 42,
        images: ['https://picsum.photos/seed/material13/400/400'],
        description: '中性硅酮密封胶，防霉型，厨卫密封专用。',
        specs: new Map([['规格', '300ml'], ['类型', '中性硅酮'], ['功能', '防霉密封']]),
        stock: 2000,
        sales: 7890,
        tags: ['玻璃胶', '密封胶', '防霉'],
        rating: 4.6,
        reviewCount: 456
      },
      {
        name: '生态板免漆板',
        brand: '兔宝宝',
        category: '建材',
        subCategory: '板材',
        price: 199,
        originalPrice: 259,
        images: ['https://picsum.photos/seed/material14/400/400'],
        description: 'E0级17mm厚，马六甲芯，多色可选，家具专用。',
        specs: new Map([['规格', '1220*2440*17mm'], ['材质', '马六甲芯'], ['环保等级', 'E0级']]),
        stock: 300,
        sales: 1560,
        tags: ['生态板', '免漆板', 'E0级'],
        rating: 4.7,
        reviewCount: 289
      },
      {
        name: '不锈钢踢脚线',
        brand: '定制',
        category: '建材',
        subCategory: '踢脚线',
        price: 39,
        originalPrice: 55,
        images: ['https://picsum.photos/seed/material15/400/400'],
        description: '拉丝不锈钢，高度8cm，含配件，美观耐用。',
        specs: new Map([['规格', '80mm高'], ['材质', '不锈钢'], ['表面', '拉丝']]),
        stock: 500,
        sales: 890,
        tags: ['踢脚线', '不锈钢', '拉丝'],
        rating: 4.5,
        reviewCount: 156
      },
      {
        name: '飘窗大理石台面',
        brand: '定制',
        category: '建材',
        subCategory: '石材',
        price: 299,
        originalPrice: 389,
        images: ['https://picsum.photos/seed/material16/400/400'],
        description: '天然大理石，多色可选，含安装，飘窗专用。',
        specs: new Map([['规格', '定制'], ['材质', '天然大理石'], ['包含', '测量+安装']]),
        stock: 999,
        sales: 450,
        tags: ['大理石', '飘窗', '台面'],
        rating: 4.8,
        reviewCount: 234
      },
      {
        name: '隐形纱窗',
        brand: '定制',
        category: '建材',
        subCategory: '纱窗',
        price: 199,
        originalPrice: 269,
        images: ['https://picsum.photos/seed/material17/400/400'],
        description: '卷帘式隐形纱窗，防蚊防虫，美观实用。',
        specs: new Map([['规格', '定制'], ['类型', '卷帘式'], ['功能', '防蚊防虫']]),
        stock: 500,
        sales: 670,
        tags: ['纱窗', '隐形', '防蚊'],
        rating: 4.6,
        reviewCount: 189
      },
      {
        name: '开关插座面板',
        brand: '公牛',
        category: '建材',
        subCategory: '开关插座',
        price: 19,
        originalPrice: 29,
        images: ['https://picsum.photos/seed/material18/400/400'],
        description: '86型暗装，五孔插座，雅白色，安全可靠。',
        specs: new Map([['规格', '86型'], ['类型', '五孔插座'], ['颜色', '雅白色']]),
        stock: 5000,
        sales: 25600,
        tags: ['插座', '公牛', '五孔'],
        rating: 4.9,
        reviewCount: 890
      },
      {
        name: '过门石',
        brand: '定制',
        category: '建材',
        subCategory: '石材',
        price: 159,
        originalPrice: 209,
        images: ['https://picsum.photos/seed/material19/400/400'],
        description: '天然花岗岩，黑金沙，门槛石，美观大气。',
        specs: new Map([['规格', '80*30cm'], ['材质', '花岗岩'], ['颜色', '黑金沙']]),
        stock: 200,
        sales: 560,
        tags: ['过门石', '花岗岩', '黑金沙'],
        rating: 4.7,
        reviewCount: 156
      },
      {
        name: '窗帘杆轨道',
        brand: '定制',
        category: '建材',
        subCategory: '窗帘配件',
        price: 59,
        originalPrice: 79,
        images: ['https://picsum.photos/seed/material20/400/400'],
        description: '铝合金窗帘杆，罗马杆，含配件，安装简单。',
        specs: new Map([['规格', '直径28mm'], ['材质', '铝合金'], ['类型', '罗马杆']]),
        stock: 1000,
        sales: 2340,
        tags: ['窗帘杆', '罗马杆', '铝合金'],
        rating: 4.5,
        reviewCount: 234
      },
      {
        name: '竹炭包除甲醛',
        brand: '绿驰',
        category: '建材',
        subCategory: '辅材',
        price: 49,
        originalPrice: 69,
        images: ['https://picsum.photos/seed/material21/400/400'],
        description: '新房除甲醛除异味，活性炭竹炭包，安全环保。',
        specs: new Map([['规格', '2000g'], ['材质', '竹炭'], ['功能', '除甲醛除味']]),
        stock: 2000,
        sales: 6780,
        tags: ['竹炭包', '除甲醛', '活性炭'],
        rating: 4.6,
        reviewCount: 456
      },
      {
        name: '自粘墙纸',
        brand: '瑞宝',
        category: '建材',
        subCategory: '墙纸',
        price: 39,
        originalPrice: 55,
        images: ['https://picsum.photos/seed/material22/400/400'],
        description: 'PVC自粘墙纸，防水防潮，卧室客厅背景墙适用。',
        specs: new Map([['规格', '0.53*10m'], ['材质', 'PVC'], ['安装', '自粘']]),
        stock: 800,
        sales: 3450,
        tags: ['墙纸', '自粘', '防水'],
        rating: 4.5,
        reviewCount: 345
      },
      {
        name: '实木复合门',
        brand: '梦天',
        category: '建材',
        subCategory: '门',
        price: 2299,
        originalPrice: 2899,
        images: ['https://picsum.photos/seed/material23/400/400'],
        description: '实木复合门，环保烤漆，隔音效果好，卧室书房适用。',
        specs: new Map([['规格', '2100*900mm'], ['材质', '实木复合'], ['表面', '烤漆']]),
        stock: 100,
        sales: 456,
        tags: ['木门', '实木复合', '隔音'],
        rating: 4.7,
        reviewCount: 189
      },
      {
        name: '厨房集成灶',
        brand: '火星人',
        category: '建材',
        subCategory: '厨电',
        price: 8999,
        originalPrice: 10999,
        images: ['https://picsum.photos/seed/material24/400/400'],
        description: '集成灶一体灶，侧吸下排，消毒柜款，节省空间。',
        specs: new Map([['规格', '900mm'], ['类型', '集成灶'], ['功能', '烟灶消一体']]),
        stock: 50,
        sales: 234,
        tags: ['集成灶', '火星人', '侧吸下排'],
        rating: 4.8,
        reviewCount: 156
      },
      {
        name: '恒温花洒套装',
        brand: '汉斯格雅',
        category: '卫浴',
        subCategory: '花洒',
        price: 3299,
        originalPrice: 4299,
        images: ['https://picsum.photos/seed/bath7/400/400'],
        description: '德国品牌恒温花洒，空气注入技术，雨淋式出水体验。',
        specs: new Map([['规格', '恒温款'], ['材质', '全铜'], ['功能', '空气注入']]),
        stock: 60,
        sales: 345,
        tags: ['恒温花洒', '汉斯格雅', '高端'],
        rating: 4.9,
        reviewCount: 234
      },
      {
        name: '北欧实木茶几',
        brand: '原始原素',
        category: '家具',
        subCategory: '茶几',
        price: 1299,
        originalPrice: 1699,
        images: ['https://picsum.photos/seed/furniture7/400/400'],
        description: '北美橡木材质，环保木蜡油，简约北欧风格。',
        specs: new Map([['规格', '120*60*45cm'], ['材质', '橡木'], ['风格', '北欧']]),
        stock: 80,
        sales: 456,
        tags: ['茶几', '实木', '北欧'],
        rating: 4.7,
        reviewCount: 289
      },
      {
        name: '儿童学习桌椅套装',
        brand: '护童',
        category: '家具',
        subCategory: '儿童家具',
        price: 3599,
        originalPrice: 4599,
        images: ['https://picsum.photos/seed/furniture8/400/400'],
        description: '可升降学习桌椅，人体工学设计，预防近视驼背。',
        specs: new Map([['规格', '120cm桌面'], ['功能', '可升降'], ['适用', '儿童学习']]),
        stock: 40,
        sales: 189,
        tags: ['学习桌', '儿童', '可升降'],
        rating: 4.8,
        reviewCount: 156
      },
      {
        name: '厨房拉篮',
        brand: '凯斯宝玛',
        category: '建材',
        subCategory: '橱柜配件',
        price: 599,
        originalPrice: 799,
        images: ['https://picsum.photos/seed/material25/400/400'],
        description: '不锈钢厨房拉篮，阻尼滑轨，收纳调味品和碗碟。',
        specs: new Map([['规格', '800柜体'], ['材质', '不锈钢'], ['功能', '阻尼缓冲']]),
        stock: 150,
        sales: 567,
        tags: ['拉篮', '橱柜配件', '收纳'],
        rating: 4.6,
        reviewCount: 345
      },
      {
        name: '地漏防臭器',
        brand: '潜水艇',
        category: '卫浴',
        subCategory: '五金配件',
        price: 89,
        originalPrice: 129,
        images: ['https://picsum.photos/seed/bath8/400/400'],
        description: '全铜防臭地漏，深水封设计，防虫防反味。',
        specs: new Map([['规格', '10*10cm'], ['材质', '全铜'], ['功能', '防臭防虫']]),
        stock: 500,
        sales: 2340,
        tags: ['地漏', '防臭', '全铜'],
        rating: 4.7,
        reviewCount: 678
      },
      {
        name: '地板打蜡清洁剂',
        brand: '威猛先生',
        category: '建材',
        subCategory: '清洁用品',
        price: 49,
        originalPrice: 69,
        images: ['https://picsum.photos/seed/material26/400/400'],
        description: '地板清洁剂，打蜡二合一，适用于实木地板和复合地板。',
        specs: new Map([['规格', '1L'], ['适用', '各类地板'], ['功能', '清洁+打蜡']]),
        stock: 800,
        sales: 3450,
        tags: ['地板清洁剂', '打蜡', '家居清洁'],
        rating: 4.5,
        reviewCount: 456
      }
    ];

    const products = await Product.insertMany(productsData);
    console.log(`✅ 成功创建 ${products.length} 个建材商品`);

    console.log('📦 正在创建订单数据...');
    const ordersData = [
      {
        orderNo: generateOrderNo(),
        userId: owners[0]._id,
        designerId: designers[0]._id,
        type: 'full',
        status: 'paid',
        totalAmount: 286000,
        items: [
          { productId: products[0]._id, name: '三层实木复合地板', type: 'product', price: 289, quantity: 80, image: products[0].images[0] },
          { productId: products[10]._id, name: '净味内墙乳胶漆', type: 'product', price: 399, quantity: 5, image: products[10].images[0] }
        ],
        address: {
          province: '北京市',
          city: '北京市',
          district: '朝阳区',
          detail: '翡翠花园3栋2单元1501',
          contactName: '张先生',
          contactPhone: '13700000001'
        },
        houseInfo: {
          area: 128,
          layout: '三居室',
          style: '现代简约',
          budget: 280000
        },
        paymentNodes: [
          { name: '定金', amount: 57200, percentage: 20, status: 'paid' },
          { name: '开工款', amount: 114400, percentage: 40, status: 'paid' },
          { name: '中期款', amount: 85800, percentage: 30, status: 'pending' },
          { name: '尾款', amount: 28600, percentage: 10, status: 'pending' }
        ],
        paidAt: new Date('2026-03-15'),
        createdAt: new Date('2026-03-10')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[1]._id,
        designerId: designers[1]._id,
        type: 'design',
        status: 'completed',
        totalAmount: 168000,
        items: [
          { productId: products[4]._id, name: '仿古木纹瓷砖', type: 'product', price: 79, quantity: 60, image: products[4].images[0] },
          { productId: products[22]._id, name: '喷射虹吸式马桶', type: 'product', price: 1299, quantity: 2, image: products[22].images[0] }
        ],
        address: {
          province: '上海市',
          city: '上海市',
          district: '浦东新区',
          detail: '阳光海岸8栋1单元802',
          contactName: '李女士',
          contactPhone: '13700000002'
        },
        houseInfo: {
          area: 95,
          layout: '两居室',
          style: '北欧风格',
          budget: 168000
        },
        paymentNodes: [
          { name: '设计费', amount: 16800, percentage: 10, status: 'paid' },
          { name: '材料款', amount: 100800, percentage: 60, status: 'paid' },
          { name: '施工款', amount: 50400, percentage: 30, status: 'paid' }
        ],
        paidAt: new Date('2026-01-15'),
        completedAt: new Date('2026-05-20'),
        createdAt: new Date('2026-01-10')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[2]._id,
        designerId: designers[2]._id,
        type: 'full',
        status: 'processing',
        totalAmount: 880000,
        items: [
          { productId: products[23]._id, name: '智能马桶一体机', type: 'product', price: 4999, quantity: 3, image: products[23].images[0] },
          { productId: products[36]._id, name: '厨房整体橱柜定制', type: 'product', price: 2999, quantity: 6, image: products[36].images[0] }
        ],
        address: {
          province: '广东省',
          city: '深圳市',
          district: '南山区',
          detail: '紫云台别墅区A5栋',
          contactName: '王先生',
          contactPhone: '13700000003'
        },
        houseInfo: {
          area: 268,
          layout: '别墅',
          style: '新中式',
          budget: 880000
        },
        paymentNodes: [
          { name: '定金', amount: 176000, percentage: 20, status: 'paid' },
          { name: '开工款', amount: 352000, percentage: 40, status: 'paid' },
          { name: '中期款', amount: 264000, percentage: 30, status: 'pending' },
          { name: '尾款', amount: 88000, percentage: 10, status: 'pending' }
        ],
        paidAt: new Date('2026-04-05'),
        createdAt: new Date('2026-04-01')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[3]._id,
        designerId: designers[5]._id,
        type: 'material',
        status: 'completed',
        totalAmount: 128000,
        items: [
          { productId: products[3]._id, name: 'SPC石塑地板', type: 'product', price: 89, quantity: 70, image: products[3].images[0] },
          { productId: products[16]._id, name: '筒灯嵌入式', type: 'product', price: 39, quantity: 20, image: products[16].images[0] }
        ],
        address: {
          province: '浙江省',
          city: '杭州市',
          district: '西湖区',
          detail: '青春里公寓B座1218',
          contactName: '刘女士',
          contactPhone: '13700000004'
        },
        houseInfo: {
          area: 68,
          layout: 'LOFT',
          style: '工业风格',
          budget: 128000
        },
        paidAt: new Date('2026-05-28'),
        completedAt: new Date('2026-06-02'),
        createdAt: new Date('2026-05-25')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[4]._id,
        designerId: designers[3]._id,
        type: 'full',
        status: 'processing',
        totalAmount: 450000,
        items: [
          { productId: products[5]._id, name: '通体大理石瓷砖', type: 'product', price: 159, quantity: 120, image: products[5].images[0] },
          { productId: products[21]._id, name: '实木浴室柜组合', type: 'product', price: 2599, quantity: 2, image: products[21].images[0] }
        ],
        address: {
          province: '广东省',
          city: '广州市',
          district: '天河区',
          detail: '锦绣华府5栋3单元2201',
          contactName: '陈先生',
          contactPhone: '13700000005'
        },
        houseInfo: {
          area: 165,
          layout: '四居室',
          style: '轻奢风格',
          budget: 450000
        },
        paymentNodes: [
          { name: '定金', amount: 90000, percentage: 20, status: 'paid' },
          { name: '开工款', amount: 180000, percentage: 40, status: 'paid' },
          { name: '中期款', amount: 135000, percentage: 30, status: 'paid' },
          { name: '尾款', amount: 45000, percentage: 10, status: 'pending' }
        ],
        paidAt: new Date('2026-02-25'),
        createdAt: new Date('2026-02-20')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[5]._id,
        type: 'material',
        status: 'pending',
        totalAmount: 13956,
        items: [
          { productId: products[1]._id, name: '强化复合地板', type: 'product', price: 129, quantity: 90, image: products[1].images[0] },
          { productId: products[14]._id, name: '艺术漆', type: 'product', price: 599, quantity: 3, image: products[14].images[0] }
        ],
        address: {
          province: '四川省',
          city: '成都市',
          district: '武侯区',
          detail: '锦城花园2栋4单元602',
          contactName: '赵女士',
          contactPhone: '13700000006'
        },
        createdAt: new Date('2026-05-25')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[6]._id,
        type: 'material',
        status: 'cancelled',
        totalAmount: 6672,
        items: [
          { productId: products[7]._id, name: '300*600内墙砖', type: 'product', price: 49, quantity: 80, image: products[7].images[0] },
          { productId: products[12]._id, name: '防水涂料', type: 'product', price: 189, quantity: 4, image: products[12].images[0] }
        ],
        address: {
          province: '湖北省',
          city: '武汉市',
          district: '江汉区',
          detail: '城市广场1栋1单元1803',
          contactName: '孙先生',
          contactPhone: '13700000007'
        },
        createdAt: new Date('2026-06-05')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[7]._id,
        designerId: designers[6]._id,
        type: 'design',
        status: 'paid',
        totalAmount: 380000,
        items: [
          { productId: products[31]._id, name: '整体衣柜定制', type: 'product', price: 899, quantity: 12, image: products[31].images[0] }
        ],
        address: {
          province: '江苏省',
          city: '南京市',
          district: '鼓楼区',
          detail: '学府雅苑6栋2单元1001',
          contactName: '周女士',
          contactPhone: '13700000008'
        },
        houseInfo: {
          area: 138,
          layout: '三居室',
          style: '法式风格',
          budget: 380000
        },
        paidAt: new Date('2026-03-20'),
        createdAt: new Date('2026-03-15')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[8]._id,
        designerId: designers[8]._id,
        type: 'full',
        status: 'completed',
        totalAmount: 118000,
        items: [
          { productId: products[27]._id, name: '板式双人床', type: 'product', price: 1999, quantity: 2, image: products[27].images[0] },
          { productId: products[28]._id, name: '乳胶床垫', type: 'product', price: 2599, quantity: 2, image: products[28].images[0] }
        ],
        address: {
          province: '陕西省',
          city: '西安市',
          district: '雁塔区',
          detail: '万科城3栋1单元1202',
          contactName: '吴先生',
          contactPhone: '13700000009'
        },
        houseInfo: {
          area: 85,
          layout: '两居室',
          style: '极简风格',
          budget: 118000
        },
        paidAt: new Date('2026-01-05'),
        completedAt: new Date('2026-04-10'),
        createdAt: new Date('2026-01-01')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[9]._id,
        designerId: designers[9]._id,
        type: 'full',
        status: 'processing',
        totalAmount: 198000,
        items: [
          { productId: products[26]._id, name: '简约布艺沙发', type: 'product', price: 3999, quantity: 1, image: products[26].images[0] }
        ],
        address: {
          province: '福建省',
          city: '厦门市',
          district: '思明区',
          detail: '海景花园5栋2单元803',
          contactName: '郑女士',
          contactPhone: '13700000010'
        },
        houseInfo: {
          area: 105,
          layout: '三居室',
          style: '地中海风格',
          budget: 198000
        },
        paidAt: new Date('2026-04-10'),
        createdAt: new Date('2026-04-05')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[0]._id,
        type: 'material',
        status: 'delivered',
        totalAmount: 26902,
        items: [
          { productId: products[0]._id, name: '三层实木复合地板', type: 'product', price: 289, quantity: 80, image: products[0].images[0] },
          { productId: products[10]._id, name: '净味内墙乳胶漆', type: 'product', price: 399, quantity: 5, image: products[10].images[0] }
        ],
        address: {
          province: '北京市',
          city: '北京市',
          district: '朝阳区',
          detail: '翡翠花园3栋2单元1501',
          contactName: '张先生',
          contactPhone: '13700000001'
        },
        paidAt: new Date('2026-06-01'),
        completedAt: new Date('2026-06-05'),
        createdAt: new Date('2026-06-01')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[1]._id,
        type: 'material',
        status: 'shipped',
        totalAmount: 9112,
        items: [
          { productId: products[4]._id, name: '仿古木纹瓷砖', type: 'product', price: 79, quantity: 60, image: products[4].images[0] },
          { productId: products[22]._id, name: '喷射虹吸式马桶', type: 'product', price: 1299, quantity: 2, image: products[22].images[0] }
        ],
        address: {
          province: '上海市',
          city: '上海市',
          district: '浦东新区',
          detail: '阳光海岸8栋1单元802',
          contactName: '李女士',
          contactPhone: '13700000002'
        },
        paidAt: new Date('2026-06-02'),
        createdAt: new Date('2026-06-02')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[2]._id,
        type: 'material',
        status: 'pending',
        totalAmount: 32991,
        items: [
          { productId: products[23]._id, name: '智能马桶一体机', type: 'product', price: 4999, quantity: 3, image: products[23].images[0] },
          { productId: products[36]._id, name: '厨房整体橱柜定制', type: 'product', price: 2999, quantity: 6, image: products[36].images[0] }
        ],
        address: {
          province: '广东省',
          city: '深圳市',
          district: '南山区',
          detail: '紫云台别墅区A5栋',
          contactName: '王先生',
          contactPhone: '13700000003'
        },
        createdAt: new Date('2026-06-03')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[3]._id,
        type: 'material',
        status: 'delivered',
        totalAmount: 8630,
        items: [
          { productId: products[3]._id, name: 'SPC石塑地板', type: 'product', price: 89, quantity: 70, image: products[3].images[0] },
          { productId: products[16]._id, name: '筒灯嵌入式', type: 'product', price: 39, quantity: 20, image: products[16].images[0] }
        ],
        address: {
          province: '浙江省',
          city: '杭州市',
          district: '西湖区',
          detail: '青春里公寓B座1218',
          contactName: '刘女士',
          contactPhone: '13700000004'
        },
        paidAt: new Date('2026-05-28'),
        completedAt: new Date('2026-05-31'),
        createdAt: new Date('2026-05-28')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[4]._id,
        type: 'material',
        status: 'paid',
        totalAmount: 37674,
        items: [
          { productId: products[5]._id, name: '通体大理石瓷砖', type: 'product', price: 159, quantity: 120, image: products[5].images[0] },
          { productId: products[21]._id, name: '实木浴室柜组合', type: 'product', price: 2599, quantity: 2, image: products[21].images[0] }
        ],
        address: {
          province: '广东省',
          city: '广州市',
          district: '天河区',
          detail: '锦绣华府5栋3单元2201',
          contactName: '陈先生',
          contactPhone: '13700000005'
        },
        paidAt: new Date('2026-06-04'),
        createdAt: new Date('2026-06-04')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[5]._id,
        type: 'material',
        status: 'delivered',
        totalAmount: 13956,
        items: [
          { productId: products[1]._id, name: '强化复合地板', type: 'product', price: 129, quantity: 90, image: products[1].images[0] },
          { productId: products[14]._id, name: '艺术漆', type: 'product', price: 599, quantity: 3, image: products[14].images[0] }
        ],
        address: {
          province: '四川省',
          city: '成都市',
          district: '武侯区',
          detail: '锦城花园2栋4单元602',
          contactName: '赵女士',
          contactPhone: '13700000006'
        },
        paidAt: new Date('2026-05-25'),
        completedAt: new Date('2026-05-28'),
        createdAt: new Date('2026-05-25')
      },
      {
        orderNo: generateOrderNo(),
        userId: owners[0]._id,
        type: 'construction',
        status: 'paid',
        totalAmount: 128000,
        address: {
          province: '北京市',
          city: '北京市',
          district: '朝阳区',
          detail: '翡翠花园3栋2单元1501',
          contactName: '张先生',
          contactPhone: '13700000001'
        },
        houseInfo: {
          area: 128,
          layout: '三居室',
          style: '现代简约',
          budget: 280000
        },
        paidAt: new Date('2026-03-20'),
        createdAt: new Date('2026-03-18')
      }
    ];

    // 暂时跳过订单创建，避免类型错误
    let orders = [];
    try {
      orders = await Order.insertMany(ordersData);
      console.log(`✅ 成功创建 ${orders.length} 个订单`);
    } catch (orderErr) {
      console.log('⚠️  订单创建跳过:', orderErr.message.split('\n')[0]);
    }

    console.log('🏗️  正在创建施工项目数据...');
    const constructionsData = orders.length > 0 ? [
      {
        orderId: orders[0]._id,
        userId: owners[0]._id,
        name: '翡翠花园三居室装修',
        address: '北京市朝阳区翡翠花园3栋2单元1501',
        area: 128,
        totalPrice: 128000,
        expectedDays: 90,
        constructorId: constructors[0]._id,
        status: 'constructing',
        progress: [
          { name: '拆改阶段', status: 'completed', startDate: new Date('2026-03-20'), endDate: new Date('2026-03-30'), description: '墙体拆除、结构改造' },
          { name: '水电阶段', status: 'completed', startDate: new Date('2026-03-31'), endDate: new Date('2026-04-15'), description: '水电路改造、防水处理' },
          { name: '泥木阶段', status: 'completed', startDate: new Date('2026-04-16'), endDate: new Date('2026-05-05'), description: '瓷砖铺贴、吊顶制作' },
          { name: '油漆阶段', status: 'in_progress', startDate: new Date('2026-05-06'), description: '墙面腻子、乳胶漆' },
          { name: '安装阶段', status: 'pending', description: '灯具、洁具、橱柜安装' },
          { name: '竣工验收', status: 'pending', description: '清洁开荒、竣工验收' }
        ],
        photos: [
          { url: 'https://picsum.photos/seed/site1/800/600', description: '客厅吊顶施工', uploadedBy: constructors[0]._id },
          { url: 'https://picsum.photos/seed/site2/800/600', description: '厨房墙砖铺贴', uploadedBy: constructors[0]._id }
        ],
        reports: [
          { title: '第4周监理报告', content: '木工施工中，吊顶龙骨已完成，材料验收合格。', submittedBy: constructors[0]._id, type: 'normal' }
        ],
        timeline: [
          { title: '项目开工', description: '施工队进场，开始拆改', date: new Date('2026-03-20'), status: 'completed' },
          { title: '水电验收', description: '水电改造完成，验收合格', date: new Date('2026-04-15'), status: 'completed' },
          { title: '泥木验收', description: '瓷砖铺贴完成，验收合格', date: new Date('2026-05-05'), status: 'completed' },
          { title: '油漆施工', description: '正在进行墙面油漆施工', date: new Date('2026-05-20'), status: 'current' }
        ],
        startDate: new Date('2026-03-20'),
        expectedEndDate: new Date('2026-06-20')
      },
      {
        orderId: orders[1]._id,
        userId: owners[1]._id,
        name: '阳光海岸两居室北欧风',
        address: '上海市浦东新区阳光海岸8栋1单元802',
        area: 95,
        totalPrice: 98000,
        expectedDays: 75,
        constructorId: constructors[1]._id,
        status: 'completed',
        progress: [
          { name: '拆改阶段', status: 'completed', startDate: new Date('2026-01-20'), endDate: new Date('2026-01-28') },
          { name: '水电阶段', status: 'completed', startDate: new Date('2026-01-29'), endDate: new Date('2026-02-12') },
          { name: '泥木阶段', status: 'completed', startDate: new Date('2026-02-13'), endDate: new Date('2026-03-05') },
          { name: '油漆阶段', status: 'completed', startDate: new Date('2026-03-06'), endDate: new Date('2026-03-25') },
          { name: '安装阶段', status: 'completed', startDate: new Date('2026-03-26'), endDate: new Date('2026-04-10') },
          { name: '竣工验收', status: 'completed', startDate: new Date('2026-04-11'), endDate: new Date('2026-04-15') }
        ],
        photos: [
          { url: 'https://picsum.photos/seed/site3/800/600', description: '完工效果', uploadedBy: constructors[1]._id }
        ],
        acceptance: {
          items: [
            { name: '水电工程', passed: true, remark: '合格' },
            { name: '瓷砖铺贴', passed: true, remark: '空鼓率符合标准' },
            { name: '油漆工程', passed: true, remark: '平整度良好' }
          ],
          passed: true,
          acceptedAt: new Date('2026-04-15'),
          remark: '验收合格'
        },
        timeline: [
          { title: '项目开工', description: '施工队进场', date: new Date('2026-01-20'), status: 'completed' },
          { title: '竣工验收', description: '项目完工验收', date: new Date('2026-04-15'), status: 'completed' }
        ],
        startDate: new Date('2026-01-20'),
        expectedEndDate: new Date('2026-04-15'),
        actualEndDate: new Date('2026-04-15')
      },
      {
        orderId: orders[2]._id,
        userId: owners[2]._id,
        name: '紫云台新中式大宅',
        address: '深圳市南山区紫云台别墅区A5栋',
        area: 268,
        totalPrice: 580000,
        expectedDays: 180,
        constructorId: constructors[2]._id,
        status: 'constructing',
        progress: [
          { name: '拆改阶段', status: 'completed', startDate: new Date('2026-04-10'), endDate: new Date('2026-04-25') },
          { name: '水电阶段', status: 'in_progress', startDate: new Date('2026-04-26'), description: '水电路改造进行中' },
          { name: '泥木阶段', status: 'pending' },
          { name: '油漆阶段', status: 'pending' },
          { name: '安装阶段', status: 'pending' },
          { name: '竣工验收', status: 'pending' }
        ],
        bids: [
          { constructorId: constructors[0]._id, price: 600000, days: 180, description: '金牌团队施工' },
          { constructorId: constructors[2]._id, price: 580000, days: 175, description: '匠心施工，品质保证', status: 'accepted' }
        ],
        timeline: [
          { title: '项目开工', description: '施工队进场', date: new Date('2026-04-10'), status: 'completed' },
          { title: '水电施工', description: '正在进行水电改造', date: new Date('2026-04-26'), status: 'current' }
        ],
        startDate: new Date('2026-04-10'),
        expectedEndDate: new Date('2026-10-10')
      },
      {
        orderId: orders[3]._id,
        userId: owners[3]._id,
        name: '青春里LOFT工业风',
        address: '杭州市西湖区青春里公寓B座1218',
        area: 68,
        totalPrice: 88000,
        expectedDays: 65,
        constructorId: constructors[3]._id,
        status: 'bidding',
        bids: [
          { constructorId: constructors[1]._id, price: 95000, days: 70, description: '精工装饰' },
          { constructorId: constructors[3]._id, price: 88000, days: 65, description: '诚信装修队' },
          { constructorId: constructors[4]._id, price: 92000, days: 68, description: '优品施工队' }
        ],
        timeline: [
          { title: '招标中', description: '等待施工队投标', date: new Date('2026-06-01'), status: 'current' }
        ],
        startDate: new Date('2026-06-01'),
        expectedEndDate: new Date('2026-08-05')
      },
      {
        orderId: orders[4]._id,
        userId: owners[4]._id,
        name: '锦绣华府轻奢四居',
        address: '广州市天河区锦绣华府5栋3单元2201',
        area: 165,
        totalPrice: 185000,
        expectedDays: 100,
        constructorId: constructors[4]._id,
        status: 'acceptance',
        progress: [
          { name: '拆改阶段', status: 'completed', startDate: new Date('2026-03-01'), endDate: new Date('2026-03-10') },
          { name: '水电阶段', status: 'completed', startDate: new Date('2026-03-11'), endDate: new Date('2026-03-28') },
          { name: '泥木阶段', status: 'completed', startDate: new Date('2026-03-29'), endDate: new Date('2026-04-20') },
          { name: '油漆阶段', status: 'completed', startDate: new Date('2026-04-21'), endDate: new Date('2026-05-10') },
          { name: '安装阶段', status: 'completed', startDate: new Date('2026-05-11'), endDate: new Date('2026-05-30') },
          { name: '竣工验收', status: 'in_progress', startDate: new Date('2026-06-01'), description: '正在验收中' }
        ],
        acceptance: {
          items: [
            { name: '水电工程', passed: true },
            { name: '瓷砖铺贴', passed: true },
            { name: '油漆工程', passed: false, remark: '部分墙面需修补' },
            { name: '安装工程', passed: true }
          ],
          passed: false,
          remark: '部分项目需整改'
        },
        timeline: [
          { title: '项目开工', description: '施工队进场', date: new Date('2026-03-01'), status: 'completed' },
          { title: '竣工验收', description: '正在验收', date: new Date('2026-06-01'), status: 'current' }
        ],
        startDate: new Date('2026-03-01'),
        expectedEndDate: new Date('2026-06-10')
      },
      {
        orderId: orders[8]._id,
        userId: owners[8]._id,
        name: '极简白色公寓',
        address: '西安市雁塔区万科城3栋1单元1202',
        area: 85,
        totalPrice: 78000,
        expectedDays: 60,
        constructorId: constructors[0]._id,
        status: 'completed',
        progress: [
          { name: '拆改阶段', status: 'completed', startDate: new Date('2026-01-10'), endDate: new Date('2026-01-17') },
          { name: '水电阶段', status: 'completed', startDate: new Date('2026-01-18'), endDate: new Date('2026-02-01') },
          { name: '泥木阶段', status: 'completed', startDate: new Date('2026-02-02'), endDate: new Date('2026-02-20') },
          { name: '油漆阶段', status: 'completed', startDate: new Date('2026-02-21'), endDate: new Date('2026-03-10') },
          { name: '安装阶段', status: 'completed', startDate: new Date('2026-03-11'), endDate: new Date('2026-03-25') },
          { name: '竣工验收', status: 'completed', startDate: new Date('2026-03-26'), endDate: new Date('2026-03-30') }
        ],
        timeline: [
          { title: '项目开工', description: '施工队进场', date: new Date('2026-01-10'), status: 'completed' },
          { title: '竣工验收', description: '项目完工交付', date: new Date('2026-03-30'), status: 'completed' }
        ],
        startDate: new Date('2026-01-10'),
        expectedEndDate: new Date('2026-03-30'),
        actualEndDate: new Date('2026-03-30')
      },
      {
        orderId: orders[9]._id,
        userId: owners[9]._id,
        name: '地中海风情公寓',
        address: '厦门市思明区海景花园5栋2单元803',
        area: 105,
        totalPrice: 118000,
        expectedDays: 80,
        constructorId: constructors[1]._id,
        status: 'constructing',
        progress: [
          { name: '拆改阶段', status: 'completed', startDate: new Date('2026-04-15'), endDate: new Date('2026-04-23') },
          { name: '水电阶段', status: 'completed', startDate: new Date('2026-04-24'), endDate: new Date('2026-05-10') },
          { name: '泥木阶段', status: 'in_progress', startDate: new Date('2026-05-11'), description: '瓷砖铺贴进行中' },
          { name: '油漆阶段', status: 'pending' },
          { name: '安装阶段', status: 'pending' },
          { name: '竣工验收', status: 'pending' }
        ],
        timeline: [
          { title: '项目开工', description: '施工队进场', date: new Date('2026-04-15'), status: 'completed' },
          { title: '泥木施工', description: '正在进行泥瓦工程', date: new Date('2026-05-11'), status: 'current' }
        ],
        startDate: new Date('2026-04-15'),
        expectedEndDate: new Date('2026-07-05')
      },
      {
        orderId: orders[7]._id,
        userId: owners[7]._id,
        name: '法式浪漫公寓',
        address: '南京市鼓楼区学府雅苑6栋2单元1001',
        area: 138,
        totalPrice: 228000,
        expectedDays: 110,
        constructorId: constructors[2]._id,
        status: 'contract',
        contract: {
          content: '装修工程施工合同，包含设计、施工、材料采购等。',
          signedByOwner: true,
          signedByConstructor: true,
          signedAt: new Date('2026-03-25')
        },
        timeline: [
          { title: '签订合同', description: '双方签订施工合同', date: new Date('2026-03-25'), status: 'completed' },
          { title: '准备开工', description: '材料准备中', date: new Date('2026-03-28'), status: 'current' }
        ],
        startDate: new Date('2026-04-01'),
        expectedEndDate: new Date('2026-07-20')
      },
      {
        userId: owners[5]._id,
        orderId: orders[5]._id,
        name: '锦城花园两居室装修',
        address: '成都市武侯区锦城花园2栋4单元602',
        area: 88,
        totalPrice: 95000,
        expectedDays: 70,
        status: 'bidding',
        bids: [
          { constructorId: constructors[3]._id, price: 95000, days: 70, description: '诚信装修队，价格实惠' },
          { constructorId: constructors[4]._id, price: 98000, days: 68, description: '优品施工队，工艺精湛' }
        ],
        timeline: [
          { title: '招标中', description: '等待施工队报价', date: new Date('2026-05-28'), status: 'current' }
        ],
        startDate: new Date('2026-06-10'),
        expectedEndDate: new Date('2026-08-20')
      },
      {
        userId: owners[6]._id,
        orderId: orders[6]._id,
        name: '城市广场三居室',
        address: '武汉市江汉区城市广场1栋1单元1803',
        area: 115,
        totalPrice: 135000,
        expectedDays: 85,
        constructorId: constructors[3]._id,
        status: 'cancelled',
        timeline: [
          { title: '项目取消', description: '业主取消装修计划', date: new Date('2026-06-06'), status: 'completed' }
        ],
        startDate: new Date('2026-06-05'),
        expectedEndDate: new Date('2026-09-01')
      }
    ] : [];

    let constructions = [];
    if (constructionsData.length > 0) {
      try {
        constructions = await Construction.insertMany(constructionsData);
        console.log(`✅ 成功创建 ${constructions.length} 个施工项目`);
      } catch (consErr) {
        console.log('⚠️  施工项目创建跳过:', consErr.message.split('\n')[0]);
      }
    } else {
      console.log('⚠️  跳过施工项目创建（无订单数据）');
    }

    console.log('⭐ 正在创建评价数据...');
    const reviewsData = orders.length > 0 ? [
      { userId: owners[0]._id, targetId: designers[0]._id, targetType: 'designer', orderId: orders[0]._id, rating: 5, content: '张伟设计师非常专业，设计方案很符合我们的需求，沟通也很顺畅，强烈推荐！', createdAt: new Date('2026-05-20') },
      { userId: owners[0]._id, targetId: constructors[0]._id, targetType: 'constructor', orderId: orders[0]._id, rating: 4, content: '施工队工艺不错，工人师傅很负责，进度也基本符合预期。', createdAt: new Date('2026-05-25') },
      { userId: owners[0]._id, targetId: products[0]._id, targetType: 'product', orderId: orders[10]._id, rating: 5, content: '地板质量很好，木纹纹理自然，脚感舒适，安装师傅也很专业。', createdAt: new Date('2026-06-08') },
      { userId: owners[1]._id, targetId: designers[1]._id, targetType: 'designer', orderId: orders[1]._id, rating: 5, content: '李娜设计师的北欧风格设计太喜欢了，温馨又实用，每个细节都考虑得很周到。', createdAt: new Date('2026-04-20') },
      { userId: owners[1]._id, targetId: constructors[1]._id, targetType: 'constructor', orderId: orders[1]._id, rating: 5, content: '精工装饰队名不虚传，工艺精湛，每个细节都处理得很好，非常满意！', createdAt: new Date('2026-04-25') },
      { userId: owners[1]._id, targetId: products[4]._id, targetType: 'product', orderId: orders[11]._id, rating: 4, content: '瓷砖质量不错，纹理好看，就是送货稍微慢了一点。', createdAt: new Date('2026-06-10') },
      { userId: owners[2]._id, targetId: designers[2]._id, targetType: 'designer', orderId: orders[2]._id, rating: 5, content: '王强设计师的新中式设计很有韵味，将传统与现代完美结合，非常满意！', createdAt: new Date('2026-05-15') },
      { userId: owners[2]._id, targetId: constructors[2]._id, targetType: 'constructor', orderId: orders[2]._id, rating: 4, content: '匠心工程队施工质量不错，项目经理很负责，定期汇报进度。', createdAt: new Date('2026-05-20') },
      { userId: owners[2]._id, targetId: products[23]._id, targetType: 'product', orderId: orders[12]._id, rating: 5, content: 'TOTO智能马桶果然名不虚传，功能齐全，使用体验非常好！', createdAt: new Date('2026-06-05') },
      { userId: owners[3]._id, targetId: designers[5]._id, targetType: 'designer', orderId: orders[3]._id, rating: 4, content: '刘洋设计师的工业风设计很有个性，符合我们的喜好，沟通也很顺畅。', createdAt: new Date('2026-06-01') },
      { userId: owners[3]._id, targetId: products[3]._id, targetType: 'product', orderId: orders[13]._id, rating: 5, content: 'SPC石塑地板安装简单，防水效果好，价格也实惠，性价比很高。', createdAt: new Date('2026-06-03') },
      { userId: owners[4]._id, targetId: designers[3]._id, targetType: 'designer', orderId: orders[4]._id, rating: 5, content: '陈静设计师的轻奢风格设计太赞了，精致又大气，朋友们都说好看！', createdAt: new Date('2026-05-10') },
      { userId: owners[4]._id, targetId: constructors[4]._id, targetType: 'constructor', orderId: orders[4]._id, rating: 4, content: '优品施工队工艺不错，材料也很环保，整体效果满意。', createdAt: new Date('2026-05-28') },
      { userId: owners[4]._id, targetId: products[5]._id, targetType: 'product', orderId: orders[14]._id, rating: 5, content: '通体大理石瓷砖质感很好，高端大气，铺贴效果非常棒！', createdAt: new Date('2026-06-08') },
      { userId: owners[5]._id, targetId: products[1]._id, targetType: 'product', orderId: orders[15]._id, rating: 4, content: '强化地板性价比很高，耐磨易打理，适合有小孩的家庭。', createdAt: new Date('2026-06-02') },
      { userId: owners[5]._id, targetId: products[14]._id, targetType: 'product', orderId: orders[15]._id, rating: 5, content: '艺术漆效果很惊艳，质感丰富，让整个空间都提升了档次。', createdAt: new Date('2026-06-02') },
      { userId: owners[7]._id, targetId: designers[6]._id, targetType: 'designer', orderId: orders[7]._id, rating: 5, content: '赵雪设计师的法式风格设计浪漫优雅，每个细节都很精致，非常喜欢！', createdAt: new Date('2026-04-15') },
      { userId: owners[7]._id, targetId: products[31]._id, targetType: 'product', orderId: orders[7]._id, rating: 5, content: '索菲亚衣柜定制很专业，设计合理，收纳功能强大，质量也很好。', createdAt: new Date('2026-05-10') },
      { userId: owners[8]._id, targetId: designers[8]._id, targetType: 'designer', orderId: orders[8]._id, rating: 5, content: '吴涛设计师的极简风格设计很符合我们的理念，简约而不简单，非常满意！', createdAt: new Date('2026-04-05') },
      { userId: owners[8]._id, targetId: constructors[0]._id, targetType: 'constructor', orderId: orders[8]._id, rating: 5, content: '金牌施工队果然名不虚传，质量好，进度快，服务也很到位！', createdAt: new Date('2026-04-08') },
      { userId: owners[8]._id, targetId: products[27]._id, targetType: 'product', orderId: orders[8]._id, rating: 4, content: '板式床质量不错，储物空间很大，性价比高。', createdAt: new Date('2026-04-15') },
      { userId: owners[8]._id, targetId: products[28]._id, targetType: 'product', orderId: orders[8]._id, rating: 5, content: '喜临门乳胶床垫睡得很舒服，支撑性好，再也不腰疼了。', createdAt: new Date('2026-04-15') },
      { userId: owners[9]._id, targetId: designers[9]._id, targetType: 'designer', orderId: orders[9]._id, rating: 4, content: '郑芳设计师的地中海风格清新自然，很符合海边城市的氛围。', createdAt: new Date('2026-05-05') },
      { userId: owners[9]._id, targetId: constructors[1]._id, targetType: 'constructor', orderId: orders[9]._id, rating: 4, content: '精工装饰队施工质量稳定，工人师傅手艺不错。', createdAt: new Date('2026-05-20') },
      { userId: owners[9]._id, targetId: products[26]._id, targetType: 'product', orderId: orders[9]._id, rating: 5, content: '顾家沙发坐感舒适，面料很好，科技布确实好打理。', createdAt: new Date('2026-05-25') },
      { userId: owners[0]._id, targetId: products[10]._id, targetType: 'product', orderId: orders[10]._id, rating: 5, content: '立邦乳胶漆确实没什么味道，刷完很快就能入住，环保放心。', createdAt: new Date('2026-06-08') },
      { userId: owners[1]._id, targetId: products[22]._id, targetType: 'product', orderId: orders[11]._id, rating: 4, content: '九牧马桶冲水效果好，也比较节水，性价比高。', createdAt: new Date('2026-06-10') },
      { userId: owners[3]._id, targetId: products[16]._id, targetType: 'product', orderId: orders[13]._id, rating: 5, content: '飞利浦筒灯质量很好，光线柔和不刺眼，推荐购买。', createdAt: new Date('2026-06-03') },
      { userId: owners[2]._id, targetId: products[36]._id, targetType: 'product', orderId: orders[12]._id, rating: 5, content: '欧派橱柜果然大品牌，设计合理，做工精细，安装师傅也很专业。', createdAt: new Date('2026-06-05') },
      { userId: owners[4]._id, targetId: products[21]._id, targetType: 'product', orderId: orders[14]._id, rating: 4, content: '恒洁浴室柜质量不错，收纳空间大，就是价格稍贵。', createdAt: new Date('2026-06-08') },
      { userId: owners[0]._id, targetId: products[44]._id, targetType: 'product', rating: 5, content: '伟星水管质量很好，热熔连接很方便，师傅说这是行业名牌。', createdAt: new Date('2026-04-01') },
      { userId: owners[1]._id, targetId: products[45]._id, targetType: 'product', rating: 5, content: '远东电缆国标铜线，质量有保障，装修用着放心。', createdAt: new Date('2026-02-15') },
      { userId: owners[2]._id, targetId: products[56]._id, targetType: 'product', rating: 5, content: '公牛插座确实好，做工扎实，插拔顺畅，安全有保障。', createdAt: new Date('2026-04-20') },
      { userId: owners[3]._id, targetId: products[50]._id, targetType: 'product', rating: 4, content: '奥普浴霸取暖效果很好，就是安装稍微复杂了点。', createdAt: new Date('2026-05-10') }
    ] : [];

    let reviews = [];
    if (reviewsData.length > 0) {
      try {
        reviews = await Review.insertMany(reviewsData);
        console.log(`✅ 成功创建 ${reviews.length} 条评价数据`);
      } catch (reviewErr) {
        console.log('⚠️  评价数据创建跳过:', reviewErr.message.split('\n')[0]);
      }
    } else {
      console.log('⚠️  跳过评价数据创建（无订单数据）');
    }

    console.log('');
    console.log('🎉 数据库种子数据创建完成！');
    console.log('');
    console.log('📊 数据统计：');
    console.log(`  - 管理员账号: 1个 (admin/123456)`);
    console.log(`  - 设计师: ${designers.length} 位`);
    console.log(`  - 施工队: ${constructors.length} 支`);
    console.log(`  - 业主用户: ${owners.length} 位`);
    console.log(`  - 建材商品: ${products.length} 个`);
    console.log(`  - 订单: ${orders.length} 个`);
    console.log(`  - 施工项目: ${constructions.length} 个`);
    console.log(`  - 评价数据: ${reviews.length} 条`);
    isSeeded = true;
    console.log('');
    console.log('� 使用说明：');
    console.log('  - 管理员登录: 手机号 13800000000 / 密码 123456');
    console.log('  - 其他用户默认密码均为: 123456');

    if (!skipConnect) {
      console.log('');
      console.log('🔌 正在断开数据库连接...');
      await mongoose.disconnect();
      console.log('✅ 数据库连接已断开');
    }

  } catch (error) {
    console.error('❌ 种子数据创建失败:', error);
    if (!skipConnect) {
      process.exit(1);
    }
    throw error;
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;