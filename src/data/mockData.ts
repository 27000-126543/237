export interface Designer {
  id: string;
  name: string;
  avatar: string;
  title: string;
  style: string;
  experience: number;
  rating: number;
  projects: number;
  description: string;
  tags: string[];
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  brand: string;
  specs: string;
  stock: number;
  sales: number;
  rating: number;
}

export interface Project {
  id: string;
  name: string;
  address: string;
  area: number;
  budget: number;
  progress: number;
  status: 'planning' | 'construction' | 'completed';
  startDate: string;
  endDate: string;
  designer: string;
  manager: string;
  images: string[];
  phases: { name: string; progress: number; status: string }[];
}

export interface Order {
  id: string;
  orderNo: string;
  customer: string;
  phone: string;
  address: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createTime: string;
  payTime?: string;
  shipTime?: string;
  deliverTime?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  totalCustomers: number;
  customersGrowth: number;
  activeProjects: number;
  projectsGrowth: number;
  totalProducts: number;
  lowStockProducts: number;
  pendingOrders: number;
  todayVisits: number;
}

export interface TrendData {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface StylePrediction {
  style: string;
  popularity: number;
  trend: 'up' | 'down' | 'stable';
  growthRate: number;
  description: string;
  image: string;
}

export const designers: Designer[] = [
  {
    id: 'd001',
    name: '张伟',
    avatar: 'https://picsum.photos/seed/designer1/200/200',
    title: '首席设计师',
    style: '现代简约',
    experience: 12,
    rating: 4.9,
    projects: 86,
    description: '专注现代简约风格，擅长空间利用与光线设计，作品多次获得行业奖项。',
    tags: ['现代简约', '小户型专家', '收纳设计'],
    images: [
      'https://picsum.photos/seed/designer1-1/800/600',
      'https://picsum.photos/seed/designer1-2/800/600',
      'https://picsum.photos/seed/designer1-3/800/600'
    ]
  },
  {
    id: 'd002',
    name: '李娜',
    avatar: 'https://picsum.photos/seed/designer2/200/200',
    title: '资深设计师',
    style: '北欧风格',
    experience: 8,
    rating: 4.8,
    projects: 52,
    description: '北欧风格设计专家，注重自然材质与温馨氛围，为客户打造舒适家居。',
    tags: ['北欧风格', '原木风', '温馨家居'],
    images: [
      'https://picsum.photos/seed/designer2-1/800/600',
      'https://picsum.photos/seed/designer2-2/800/600',
      'https://picsum.photos/seed/designer2-3/800/600'
    ]
  },
  {
    id: 'd003',
    name: '王强',
    avatar: 'https://picsum.photos/seed/designer3/200/200',
    title: '设计总监',
    style: '新中式',
    experience: 15,
    rating: 4.9,
    projects: 120,
    description: '新中式风格领军人物，将传统元素与现代设计完美融合，独具东方韵味。',
    tags: ['新中式', '传统美学', '高端定制'],
    images: [
      'https://picsum.photos/seed/designer3-1/800/600',
      'https://picsum.photos/seed/designer3-2/800/600',
      'https://picsum.photos/seed/designer3-3/800/600'
    ]
  },
  {
    id: 'd004',
    name: '陈静',
    avatar: 'https://picsum.photos/seed/designer4/200/200',
    title: '资深设计师',
    style: '轻奢风格',
    experience: 10,
    rating: 4.7,
    projects: 68,
    description: '轻奢风格设计专家，精致细节与品质生活的追求者，打造优雅空间。',
    tags: ['轻奢风格', '金属质感', '精致生活'],
    images: [
      'https://picsum.photos/seed/designer4-1/800/600',
      'https://picsum.photos/seed/designer4-2/800/600',
      'https://picsum.photos/seed/designer4-3/800/600'
    ]
  },
  {
    id: 'd005',
    name: '刘洋',
    avatar: 'https://picsum.photos/seed/designer5/200/200',
    title: '主案设计师',
    style: '工业风格',
    experience: 7,
    rating: 4.6,
    projects: 45,
    description: '工业风格设计爱好者，擅用水泥、铁艺、原木等元素，打造个性空间。',
    tags: ['工业风格', 'Loft', '个性定制'],
    images: [
      'https://picsum.photos/seed/designer5-1/800/600',
      'https://picsum.photos/seed/designer5-2/800/600',
      'https://picsum.photos/seed/designer5-3/800/600'
    ]
  },
  {
    id: 'd006',
    name: '赵雪',
    avatar: 'https://picsum.photos/seed/designer6/200/200',
    title: '资深设计师',
    style: '法式风格',
    experience: 9,
    rating: 4.8,
    projects: 58,
    description: '法式浪漫主义设计代表，注重线条美感与优雅气质，打造精致浪漫空间。',
    tags: ['法式风格', '浪漫主义', '雕花设计'],
    images: [
      'https://picsum.photos/seed/designer6-1/800/600',
      'https://picsum.photos/seed/designer6-2/800/600',
      'https://picsum.photos/seed/designer6-3/800/600'
    ]
  },
  {
    id: 'd007',
    name: '孙磊',
    avatar: 'https://picsum.photos/seed/designer7/200/200',
    title: '主案设计师',
    style: '日式风格',
    experience: 6,
    rating: 4.7,
    projects: 38,
    description: '日式禅意风格设计专家，追求简约自然，注重功能性与美学的统一。',
    tags: ['日式风格', '禅意', '榻榻米'],
    images: [
      'https://picsum.photos/seed/designer7-1/800/600',
      'https://picsum.photos/seed/designer7-2/800/600',
      'https://picsum.photos/seed/designer7-3/800/600'
    ]
  },
  {
    id: 'd008',
    name: '周敏',
    avatar: 'https://picsum.photos/seed/designer8/200/200',
    title: '首席设计师',
    style: '美式风格',
    experience: 11,
    rating: 4.8,
    projects: 72,
    description: '美式古典与现代融合，打造舒适大气的居家环境，注重品质与细节。',
    tags: ['美式风格', '古典大气', '舒适居家'],
    images: [
      'https://picsum.photos/seed/designer8-1/800/600',
      'https://picsum.photos/seed/designer8-2/800/600',
      'https://picsum.photos/seed/designer8-3/800/600'
    ]
  },
  {
    id: 'd009',
    name: '吴涛',
    avatar: 'https://picsum.photos/seed/designer9/200/200',
    title: '设计师',
    style: '极简风格',
    experience: 5,
    rating: 4.5,
    projects: 32,
    description: '极简主义设计践行者，少即是多的设计理念，为客户创造纯粹的空间体验。',
    tags: ['极简风格', '白色系', '空间感'],
    images: [
      'https://picsum.photos/seed/designer9-1/800/600',
      'https://picsum.photos/seed/designer9-2/800/600',
      'https://picsum.photos/seed/designer9-3/800/600'
    ]
  },
  {
    id: 'd010',
    name: '郑芳',
    avatar: 'https://picsum.photos/seed/designer10/200/200',
    title: '资深设计师',
    style: '地中海风格',
    experience: 8,
    rating: 4.6,
    projects: 48,
    description: '地中海风格设计专家，蓝色与白色的浪漫组合，打造清新自然的海洋风情。',
    tags: ['地中海风格', '海洋风情', '清新自然'],
    images: [
      'https://picsum.photos/seed/designer10-1/800/600',
      'https://picsum.photos/seed/designer10-2/800/600',
      'https://picsum.photos/seed/designer10-3/800/600'
    ]
  }
];

export const products: Product[] = [
  {
    id: 'p001',
    name: '三层实木复合地板',
    category: '地板',
    subCategory: '实木地板',
    price: 289,
    unit: '㎡',
    image: 'https://picsum.photos/seed/floor1/400/400',
    description: '橡木表层，环保基材，脚感舒适，耐磨耐用',
    brand: '圣象',
    specs: '1210*165*15mm',
    stock: 500,
    sales: 1256,
    rating: 4.8
  },
  {
    id: 'p002',
    name: '强化复合地板',
    category: '地板',
    subCategory: '强化地板',
    price: 129,
    unit: '㎡',
    image: 'https://picsum.photos/seed/floor2/400/400',
    description: '高密度基材，防水耐磨，适合家装首选',
    brand: '大自然',
    specs: '1218*199*12mm',
    stock: 800,
    sales: 2340,
    rating: 4.6
  },
  {
    id: 'p003',
    name: '纯实木地板',
    category: '地板',
    subCategory: '实木地板',
    price: 459,
    unit: '㎡',
    image: 'https://picsum.photos/seed/floor3/400/400',
    description: '进口原木，天然环保，纹理美观',
    brand: '安信',
    specs: '910*125*18mm',
    stock: 200,
    sales: 568,
    rating: 4.9
  },
  {
    id: 'p004',
    name: 'SPC石塑地板',
    category: '地板',
    subCategory: '石塑地板',
    price: 89,
    unit: '㎡',
    image: 'https://picsum.photos/seed/floor4/400/400',
    description: '零甲醛防水，卡扣安装，适合旧房改造',
    brand: '扬子',
    specs: '1220*180*4mm',
    stock: 1200,
    sales: 3450,
    rating: 4.5
  },
  {
    id: 'p005',
    name: '仿古木纹瓷砖',
    category: '瓷砖',
    subCategory: '木纹砖',
    price: 79,
    unit: '㎡',
    image: 'https://picsum.photos/seed/tile1/400/400',
    description: '仿实木纹理，防滑耐磨，适合客厅卧室',
    brand: '东鹏',
    specs: '600*600mm',
    stock: 600,
    sales: 1890,
    rating: 4.7
  },
  {
    id: 'p006',
    name: '通体大理石瓷砖',
    category: '瓷砖',
    subCategory: '大理石砖',
    price: 159,
    unit: '㎡',
    image: 'https://picsum.photos/seed/tile2/400/400',
    description: '通体大理石纹理，高端大气，适合客厅',
    brand: '马可波罗',
    specs: '800*800mm',
    stock: 450,
    sales: 1230,
    rating: 4.8
  },
  {
    id: 'p007',
    name: '瓷质仿古砖',
    category: '瓷砖',
    subCategory: '仿古砖',
    price: 99,
    unit: '㎡',
    image: 'https://picsum.photos/seed/tile3/400/400',
    description: '复古风格，防滑性能好，适合阳台厨房',
    brand: '诺贝尔',
    specs: '600*600mm',
    stock: 550,
    sales: 980,
    rating: 4.6
  },
  {
    id: 'p008',
    name: '300*600内墙砖',
    category: '瓷砖',
    subCategory: '内墙砖',
    price: 49,
    unit: '㎡',
    image: 'https://picsum.photos/seed/tile4/400/400',
    description: '光亮釉面，易清洁，适合厨房卫生间',
    brand: '冠珠',
    specs: '300*600mm',
    stock: 1000,
    sales: 2560,
    rating: 4.5
  },
  {
    id: 'p009',
    name: '小颗粒马赛克',
    category: '瓷砖',
    subCategory: '马赛克',
    price: 129,
    unit: '㎡',
    image: 'https://picsum.photos/seed/tile5/400/400',
    description: '玻璃材质，多色可选，适合背景墙',
    brand: '赛德斯邦',
    specs: '300*300mm',
    stock: 300,
    sales: 450,
    rating: 4.7
  },
  {
    id: 'p010',
    name: '抛光砖',
    category: '瓷砖',
    subCategory: '抛光砖',
    price: 69,
    unit: '㎡',
    image: 'https://picsum.photos/seed/tile6/400/400',
    description: '高光泽度，坚硬耐磨，性价比高',
    brand: '蒙娜丽莎',
    specs: '800*800mm',
    stock: 700,
    sales: 1670,
    rating: 4.4
  },
  {
    id: 'p011',
    name: '净味内墙乳胶漆',
    category: '涂料',
    subCategory: '乳胶漆',
    price: 399,
    unit: '桶',
    image: 'https://picsum.photos/seed/paint1/400/400',
    description: '净味环保，遮盖力强，可调色',
    brand: '立邦',
    specs: '5L',
    stock: 200,
    sales: 890,
    rating: 4.9
  },
  {
    id: 'p012',
    name: '硅藻泥墙面漆',
    category: '涂料',
    subCategory: '硅藻泥',
    price: 299,
    unit: '桶',
    image: 'https://picsum.photos/seed/paint2/400/400',
    description: '吸附甲醛，调节湿度，环保健康',
    brand: '多乐士',
    specs: '5L',
    stock: 150,
    sales: 560,
    rating: 4.8
  },
  {
    id: 'p013',
    name: '防水涂料',
    category: '涂料',
    subCategory: '防水涂料',
    price: 189,
    unit: '桶',
    image: 'https://picsum.photos/seed/paint3/400/400',
    description: '柔性防水，抗拉强度高，适合厨卫',
    brand: '东方雨虹',
    specs: '18kg',
    stock: 300,
    sales: 1200,
    rating: 4.7
  },
  {
    id: 'p014',
    name: '外墙乳胶漆',
    category: '涂料',
    subCategory: '外墙漆',
    price: 459,
    unit: '桶',
    image: 'https://picsum.photos/seed/paint4/400/400',
    description: '耐候性强，防紫外线，保色性好',
    brand: '立邦',
    specs: '20L',
    stock: 100,
    sales: 320,
    rating: 4.6
  },
  {
    id: 'p015',
    name: '艺术漆',
    category: '涂料',
    subCategory: '艺术漆',
    price: 599,
    unit: '桶',
    image: 'https://picsum.photos/seed/paint5/400/400',
    description: '质感丰富，装饰性强，打造个性空间',
    brand: '三棵树',
    specs: '5L',
    stock: 80,
    sales: 230,
    rating: 4.7
  },
  {
    id: 'p016',
    name: '现代简约吸顶灯',
    category: '灯具',
    subCategory: '吸顶灯',
    price: 299,
    unit: '盏',
    image: 'https://picsum.photos/seed/light1/400/400',
    description: 'LED光源，无极调光，简约大气',
    brand: '欧普照明',
    specs: '直径50cm',
    stock: 150,
    sales: 1890,
    rating: 4.8
  },
  {
    id: 'p017',
    name: '北欧风吊灯',
    category: '灯具',
    subCategory: '吊灯',
    price: 599,
    unit: '盏',
    image: 'https://picsum.photos/seed/light2/400/400',
    description: '铁艺框架，三色调光，适合餐厅',
    brand: '雷士照明',
    specs: '3头',
    stock: 100,
    sales: 670,
    rating: 4.7
  },
  {
    id: 'p018',
    name: '筒灯嵌入式',
    category: '灯具',
    subCategory: '筒灯',
    price: 39,
    unit: '只',
    image: 'https://picsum.photos/seed/light3/400/400',
    description: 'LED芯片，开孔7.5cm，白光暖光可选',
    brand: '飞利浦',
    specs: '5W',
    stock: 500,
    sales: 3450,
    rating: 4.6
  },
  {
    id: 'p019',
    name: 'LED灯带',
    category: '灯具',
    subCategory: '灯带',
    price: 29,
    unit: '米',
    image: 'https://picsum.photos/seed/light4/400/400',
    description: '2835贴片，暖白光，吊顶装饰用',
    brand: '欧普照明',
    specs: '60珠/米',
    stock: 1000,
    sales: 2680,
    rating: 4.5
  },
  {
    id: 'p020',
    name: '镜前灯',
    category: '灯具',
    subCategory: '镜前灯',
    price: 159,
    unit: '盏',
    image: 'https://picsum.photos/seed/light5/400/400',
    description: '防水防雾，LED光源，浴室专用',
    brand: '雷士照明',
    specs: '长度60cm',
    stock: 200,
    sales: 890,
    rating: 4.6
  },
  {
    id: 'p021',
    name: '落地灯',
    category: '灯具',
    subCategory: '落地灯',
    price: 399,
    unit: '盏',
    image: 'https://picsum.photos/seed/light6/400/400',
    description: '北欧风格，可调角度，客厅卧室适用',
    brand: '宜家',
    specs: '高度160cm',
    stock: 80,
    sales: 450,
    rating: 4.7
  },
  {
    id: 'p022',
    name: '实木浴室柜组合',
    category: '卫浴',
    subCategory: '浴室柜',
    price: 2599,
    unit: '套',
    image: 'https://picsum.photos/seed/bath1/400/400',
    description: '橡木材质，陶瓷台盆，带镜柜',
    brand: '恒洁',
    specs: '80cm',
    stock: 50,
    sales: 320,
    rating: 4.8
  },
  {
    id: 'p023',
    name: '喷射虹吸式马桶',
    category: '卫浴',
    subCategory: '马桶',
    price: 1299,
    unit: '台',
    image: 'https://picsum.photos/seed/bath2/400/400',
    description: '节水静音，缓降盖板，釉面光滑',
    brand: '九牧',
    specs: '300/400坑距',
    stock: 120,
    sales: 890,
    rating: 4.7
  },
  {
    id: 'p024',
    name: '智能马桶一体机',
    category: '卫浴',
    subCategory: '智能马桶',
    price: 4999,
    unit: '台',
    image: 'https://picsum.photos/seed/bath3/400/400',
    description: '即热式冲洗，座圈加热，自动冲水',
    brand: 'TOTO',
    specs: '305坑距',
    stock: 40,
    sales: 230,
    rating: 4.9
  },
  {
    id: 'p025',
    name: '淋浴花洒套装',
    category: '卫浴',
    subCategory: '花洒',
    price: 899,
    unit: '套',
    image: 'https://picsum.photos/seed/bath4/400/400',
    description: '全铜主体，三功能出水，带升降杆',
    brand: '摩恩',
    specs: '明装',
    stock: 150,
    sales: 670,
    rating: 4.8
  },
  {
    id: 'p026',
    name: '不锈钢水槽',
    category: '卫浴',
    subCategory: '水槽',
    price: 799,
    unit: '套',
    image: 'https://picsum.photos/seed/bath5/400/400',
    description: '304不锈钢，双槽设计，含龙头',
    brand: '欧琳',
    specs: '78*43cm',
    stock: 100,
    sales: 560,
    rating: 4.7
  },
  {
    id: 'p027',
    name: '太空铝毛巾架',
    category: '卫浴',
    subCategory: '五金挂件',
    price: 299,
    unit: '套',
    image: 'https://picsum.photos/seed/bath6/400/400',
    description: '免打孔安装，防水防锈，六件套',
    brand: '卡贝',
    specs: '6件套',
    stock: 300,
    sales: 1230,
    rating: 4.6
  },
  {
    id: 'p028',
    name: '简约布艺沙发',
    category: '家具',
    subCategory: '沙发',
    price: 3999,
    unit: '套',
    image: 'https://picsum.photos/seed/furniture1/400/400',
    description: '科技布面料，实木框架，可拆洗',
    brand: '顾家家居',
    specs: '三人位+贵妃',
    stock: 30,
    sales: 450,
    rating: 4.8
  },
  {
    id: 'p029',
    name: '实木餐桌椅组合',
    category: '家具',
    subCategory: '餐桌',
    price: 2999,
    unit: '套',
    image: 'https://picsum.photos/seed/furniture2/400/400',
    description: '橡木材质，一桌四椅，简约现代',
    brand: '源氏木语',
    specs: '1.4m餐桌+4椅',
    stock: 50,
    sales: 320,
    rating: 4.7
  },
  {
    id: 'p030',
    name: '板式双人床',
    category: '家具',
    subCategory: '床',
    price: 1999,
    unit: '张',
    image: 'https://picsum.photos/seed/furniture3/400/400',
    description: '环保板材，气动高箱储物，1.8米',
    brand: '全友家居',
    specs: '180*200cm',
    stock: 80,
    sales: 780,
    rating: 4.6
  },
  {
    id: 'p031',
    name: '乳胶床垫',
    category: '家具',
    subCategory: '床垫',
    price: 2599,
    unit: '张',
    image: 'https://picsum.photos/seed/furniture4/400/400',
    description: '泰国进口乳胶，独立袋装弹簧',
    brand: '喜临门',
    specs: '180*200*22cm',
    stock: 60,
    sales: 560,
    rating: 4.9
  },
  {
    id: 'p032',
    name: '整体衣柜定制',
    category: '家具',
    subCategory: '衣柜',
    price: 899,
    unit: '㎡',
    image: 'https://picsum.photos/seed/furniture5/400/400',
    description: 'E0级环保板材，多种门型可选',
    brand: '索菲亚',
    specs: '定制',
    stock: 999,
    sales: 890,
    rating: 4.8
  },
  {
    id: 'p033',
    name: '电视柜茶几组合',
    category: '家具',
    subCategory: '电视柜',
    price: 1999,
    unit: '套',
    image: 'https://picsum.photos/seed/furniture6/400/400',
    description: '简约现代，钢化玻璃台面，可伸缩',
    brand: '全友家居',
    specs: '电视柜+茶几',
    stock: 70,
    sales: 450,
    rating: 4.5
  },
  {
    id: 'p034',
    name: '岩板电视背景墙',
    category: '建材',
    subCategory: '背景墙',
    price: 1299,
    unit: '㎡',
    image: 'https://picsum.photos/seed/material1/400/400',
    description: '1200*2400大规格岩板，轻奢大气',
    brand: '蒙娜丽莎',
    specs: '定制',
    stock: 100,
    sales: 230,
    rating: 4.8
  },
  {
    id: 'p035',
    name: '集成吊顶铝扣板',
    category: '建材',
    subCategory: '吊顶',
    price: 129,
    unit: '㎡',
    image: 'https://picsum.photos/seed/material2/400/400',
    description: '0.6mm厚铝扣板，抗油污易清洁',
    brand: '奥普',
    specs: '300*300mm',
    stock: 500,
    sales: 1670,
    rating: 4.6
  },
  {
    id: 'p036',
    name: '浴霸风暖',
    category: '建材',
    subCategory: '浴霸',
    price: 599,
    unit: '台',
    image: 'https://picsum.photos/seed/material3/400/400',
    description: '双核动力，风暖照明换气三合一',
    brand: '奥普',
    specs: '300*600mm',
    stock: 200,
    sales: 890,
    rating: 4.7
  },
  {
    id: 'p037',
    name: '厨房整体橱柜定制',
    category: '建材',
    subCategory: '橱柜',
    price: 2999,
    unit: '延米',
    image: 'https://picsum.photos/seed/material4/400/400',
    description: '多层实木板柜体，石英石台面',
    brand: '欧派',
    specs: '定制',
    stock: 999,
    sales: 560,
    rating: 4.9
  },
  {
    id: 'p038',
    name: '室内木门',
    category: '建材',
    subCategory: '门',
    price: 1599,
    unit: '樘',
    image: 'https://picsum.photos/seed/material5/400/400',
    description: '实木复合门，静音隔音，含五金',
    brand: 'TATA木门',
    specs: '2100*900mm',
    stock: 150,
    sales: 780,
    rating: 4.8
  },
  {
    id: 'p039',
    name: '定制断桥铝窗户',
    category: '建材',
    subCategory: '窗',
    price: 799,
    unit: '㎡',
    image: 'https://picsum.photos/seed/material6/400/400',
    description: '70系列断桥铝，双层中空玻璃',
    brand: '凤铝',
    specs: '定制',
    stock: 999,
    sales: 340,
    rating: 4.7
  },
  {
    id: 'p040',
    name: '304不锈钢防盗网',
    category: '建材',
    subCategory: '防盗网',
    price: 199,
    unit: '㎡',
    image: 'https://picsum.photos/seed/material7/400/400',
    description: '202/304不锈钢可选，安全防护',
    brand: '定制',
    specs: '定制',
    stock: 999,
    sales: 230,
    rating: 4.5
  },
  {
    id: 'p041',
    name: 'PPR水管',
    category: '建材',
    subCategory: '水电材料',
    price: 15,
    unit: '米',
    image: 'https://picsum.photos/seed/material8/400/400',
    description: '公称外径25mm，壁厚4.2mm',
    brand: '伟星',
    specs: '25*4.2mm',
    stock: 5000,
    sales: 12500,
    rating: 4.8
  },
  {
    id: 'p042',
    name: '国标铜线',
    category: '建材',
    subCategory: '水电材料',
    price: 4.5,
    unit: '米',
    image: 'https://picsum.photos/seed/material9/400/400',
    description: 'BV2.5平方单股铜线，国标品质',
    brand: '远东电缆',
    specs: 'BV2.5mm²',
    stock: 10000,
    sales: 25600,
    rating: 4.9
  },
  {
    id: 'p043',
    name: '防水石膏板',
    category: '建材',
    subCategory: '板材',
    price: 39,
    unit: '张',
    image: 'https://picsum.photos/seed/material10/400/400',
    description: '1200*2400*9.5mm，防水防潮',
    brand: '龙牌',
    specs: '1200*2400*9.5mm',
    stock: 500,
    sales: 2340,
    rating: 4.6
  },
  {
    id: 'p044',
    name: '轻钢龙骨',
    category: '建材',
    subCategory: '龙骨',
    price: 12,
    unit: '米',
    image: 'https://picsum.photos/seed/material11/400/400',
    description: '50系列主龙骨，厚度0.6mm',
    brand: '可耐福',
    specs: '50系列',
    stock: 3000,
    sales: 8900,
    rating: 4.7
  },
  {
    id: 'p045',
    name: '美缝剂',
    category: '建材',
    subCategory: '辅材',
    price: 69,
    unit: '支',
    image: 'https://picsum.photos/seed/material12/400/400',
    description: '双组份真瓷胶，防霉防水',
    brand: '卓高',
    specs: '400ml',
    stock: 1000,
    sales: 5670,
    rating: 4.8
  },
  {
    id: 'p046',
    name: '玻璃胶',
    category: '建材',
    subCategory: '辅材',
    price: 29,
    unit: '支',
    image: 'https://picsum.photos/seed/material13/400/400',
    description: '中性硅酮密封胶，防霉型',
    brand: '道康宁',
    specs: '300ml',
    stock: 2000,
    sales: 7890,
    rating: 4.6
  },
  {
    id: 'p047',
    name: '生态板免漆板',
    category: '建材',
    subCategory: '板材',
    price: 199,
    unit: '张',
    image: 'https://picsum.photos/seed/material14/400/400',
    description: 'E0级17mm厚，马六甲芯，多色可选',
    brand: '兔宝宝',
    specs: '1220*2440*17mm',
    stock: 300,
    sales: 1560,
    rating: 4.7
  },
  {
    id: 'p048',
    name: '不锈钢踢脚线',
    category: '建材',
    subCategory: '踢脚线',
    price: 39,
    unit: '米',
    image: 'https://picsum.photos/seed/material15/400/400',
    description: '拉丝不锈钢，高度8cm，含配件',
    brand: '定制',
    specs: '80mm高',
    stock: 500,
    sales: 890,
    rating: 4.5
  },
  {
    id: 'p049',
    name: '飘窗大理石台面',
    category: '建材',
    subCategory: '石材',
    price: 299,
    unit: '㎡',
    image: 'https://picsum.photos/seed/material16/400/400',
    description: '天然大理石，多色可选，含安装',
    brand: '定制',
    specs: '定制',
    stock: 999,
    sales: 450,
    rating: 4.8
  },
  {
    id: 'p050',
    name: '隐形纱窗',
    category: '建材',
    subCategory: '纱窗',
    price: 199,
    unit: '个',
    image: 'https://picsum.photos/seed/material17/400/400',
    description: '卷帘式隐形纱窗，防蚊防虫',
    brand: '定制',
    specs: '定制',
    stock: 500,
    sales: 670,
    rating: 4.6
  },
  {
    id: 'p051',
    name: '开关插座面板',
    category: '建材',
    subCategory: '开关插座',
    price: 19,
    unit: '个',
    image: 'https://picsum.photos/seed/material18/400/400',
    description: '86型暗装，五孔插座，雅白色',
    brand: '公牛',
    specs: '86型',
    stock: 5000,
    sales: 25600,
    rating: 4.9
  },
  {
    id: 'p052',
    name: '过门石',
    category: '建材',
    subCategory: '石材',
    price: 159,
    unit: '条',
    image: 'https://picsum.photos/seed/material19/400/400',
    description: '天然花岗岩，黑金沙，门槛石',
    brand: '定制',
    specs: '80*30cm',
    stock: 200,
    sales: 560,
    rating: 4.7
  },
  {
    id: 'p053',
    name: '窗帘杆轨道',
    category: '建材',
    subCategory: '窗帘配件',
    price: 59,
    unit: '米',
    image: 'https://picsum.photos/seed/material20/400/400',
    description: '铝合金窗帘杆，罗马杆，含配件',
    brand: '定制',
    specs: '直径28mm',
    stock: 1000,
    sales: 2340,
    rating: 4.5
  }
];

export const projects: Project[] = [
  {
    id: 'proj001',
    name: '翡翠花园三居室装修',
    address: '北京市朝阳区翡翠花园3栋2单元1501',
    area: 128,
    budget: 280000,
    progress: 75,
    status: 'construction',
    startDate: '2026-03-15',
    endDate: '2026-08-20',
    designer: '张伟',
    manager: '李建国',
    images: [
      'https://picsum.photos/seed/project1-1/800/600',
      'https://picsum.photos/seed/project1-2/800/600',
      'https://picsum.photos/seed/project1-3/800/600'
    ],
    phases: [
      { name: '设计阶段', progress: 100, status: 'completed' },
      { name: '拆改阶段', progress: 100, status: 'completed' },
      { name: '水电阶段', progress: 100, status: 'completed' },
      { name: '泥木阶段', progress: 100, status: 'completed' },
      { name: '油漆阶段', progress: 50, status: 'in_progress' },
      { name: '安装阶段', progress: 0, status: 'pending' },
      { name: '竣工验收', progress: 0, status: 'pending' }
    ]
  },
  {
    id: 'proj002',
    name: '阳光海岸两居室北欧风',
    address: '上海市浦东新区阳光海岸8栋1单元802',
    area: 95,
    budget: 168000,
    progress: 100,
    status: 'completed',
    startDate: '2026-01-10',
    endDate: '2026-05-20',
    designer: '李娜',
    manager: '王经理',
    images: [
      'https://picsum.photos/seed/project2-1/800/600',
      'https://picsum.photos/seed/project2-2/800/600',
      'https://picsum.photos/seed/project2-3/800/600'
    ],
    phases: [
      { name: '设计阶段', progress: 100, status: 'completed' },
      { name: '拆改阶段', progress: 100, status: 'completed' },
      { name: '水电阶段', progress: 100, status: 'completed' },
      { name: '泥木阶段', progress: 100, status: 'completed' },
      { name: '油漆阶段', progress: 100, status: 'completed' },
      { name: '安装阶段', progress: 100, status: 'completed' },
      { name: '竣工验收', progress: 100, status: 'completed' }
    ]
  },
  {
    id: 'proj003',
    name: '紫云台新中式大宅',
    address: '深圳市南山区紫云台别墅区A5栋',
    area: 268,
    budget: 880000,
    progress: 35,
    status: 'construction',
    startDate: '2026-04-01',
    endDate: '2026-12-30',
    designer: '王强',
    manager: '张经理',
    images: [
      'https://picsum.photos/seed/project3-1/800/600',
      'https://picsum.photos/seed/project3-2/800/600',
      'https://picsum.photos/seed/project3-3/800/600'
    ],
    phases: [
      { name: '设计阶段', progress: 100, status: 'completed' },
      { name: '拆改阶段', progress: 100, status: 'completed' },
      { name: '水电阶段', progress: 75, status: 'in_progress' },
      { name: '泥木阶段', progress: 0, status: 'pending' },
      { name: '油漆阶段', progress: 0, status: 'pending' },
      { name: '安装阶段', progress: 0, status: 'pending' },
      { name: '竣工验收', progress: 0, status: 'pending' }
    ]
  },
  {
    id: 'proj004',
    name: '青春里LOFT工业风',
    address: '杭州市西湖区青春里公寓B座1218',
    area: 68,
    budget: 128000,
    progress: 15,
    status: 'planning',
    startDate: '2026-06-01',
    endDate: '2026-10-15',
    designer: '刘洋',
    manager: '陈经理',
    images: [
      'https://picsum.photos/seed/project4-1/800/600',
      'https://picsum.photos/seed/project4-2/800/600',
      'https://picsum.photos/seed/project4-3/800/600'
    ],
    phases: [
      { name: '设计阶段', progress: 100, status: 'completed' },
      { name: '拆改阶段', progress: 50, status: 'in_progress' },
      { name: '水电阶段', progress: 0, status: 'pending' },
      { name: '泥木阶段', progress: 0, status: 'pending' },
      { name: '油漆阶段', progress: 0, status: 'pending' },
      { name: '安装阶段', progress: 0, status: 'pending' },
      { name: '竣工验收', progress: 0, status: 'pending' }
    ]
  },
  {
    id: 'proj005',
    name: '锦绣华府轻奢四居',
    address: '广州市天河区锦绣华府5栋3单元2201',
    area: 165,
    budget: 450000,
    progress: 90,
    status: 'construction',
    startDate: '2026-02-20',
    endDate: '2026-07-30',
    designer: '陈静',
    manager: '林经理',
    images: [
      'https://picsum.photos/seed/project5-1/800/600',
      'https://picsum.photos/seed/project5-2/800/600',
      'https://picsum.photos/seed/project5-3/800/600'
    ],
    phases: [
      { name: '设计阶段', progress: 100, status: 'completed' },
      { name: '拆改阶段', progress: 100, status: 'completed' },
      { name: '水电阶段', progress: 100, status: 'completed' },
      { name: '泥木阶段', progress: 100, status: 'completed' },
      { name: '油漆阶段', progress: 100, status: 'completed' },
      { name: '安装阶段', progress: 80, status: 'in_progress' },
      { name: '竣工验收', progress: 0, status: 'pending' }
    ]
  }
];

export const orders: Order[] = [
  {
    id: 'o001',
    orderNo: 'DD202606010001',
    customer: '张先生',
    phone: '138****5678',
    address: '北京市朝阳区翡翠花园3栋2单元1501',
    items: [
      { productId: 'p001', productName: '三层实木复合地板', quantity: 80, price: 289 },
      { productId: 'p011', productName: '净味内墙乳胶漆', quantity: 5, price: 399 },
      { productId: 'p016', productName: '现代简约吸顶灯', quantity: 3, price: 299 }
    ],
    totalAmount: 26902,
    status: 'paid',
    createTime: '2026-06-01 10:30:00',
    payTime: '2026-06-01 10:35:00'
  },
  {
    id: 'o002',
    orderNo: 'DD202606020002',
    customer: '李女士',
    phone: '139****1234',
    address: '上海市浦东新区阳光海岸8栋1单元802',
    items: [
      { productId: 'p005', productName: '仿古木纹瓷砖', quantity: 60, price: 79 },
      { productId: 'p023', productName: '喷射虹吸式马桶', quantity: 2, price: 1299 },
      { productId: 'p025', productName: '淋浴花洒套装', quantity: 2, price: 899 }
    ],
    totalAmount: 9112,
    status: 'shipped',
    createTime: '2026-06-02 14:20:00',
    payTime: '2026-06-02 14:25:00',
    shipTime: '2026-06-03 09:00:00'
  },
  {
    id: 'o003',
    orderNo: 'DD202606030003',
    customer: '王先生',
    phone: '137****9876',
    address: '深圳市南山区紫云台别墅区A5栋',
    items: [
      { productId: 'p024', productName: '智能马桶一体机', quantity: 3, price: 4999 },
      { productId: 'p037', productName: '厨房整体橱柜定制', quantity: 6, price: 2999 }
    ],
    totalAmount: 32991,
    status: 'pending',
    createTime: '2026-06-03 16:45:00'
  },
  {
    id: 'o004',
    orderNo: 'DD202605280004',
    customer: '刘女士',
    phone: '136****5432',
    address: '杭州市西湖区青春里公寓B座1218',
    items: [
      { productId: 'p004', productName: 'SPC石塑地板', quantity: 70, price: 89 },
      { productId: 'p018', productName: '筒灯嵌入式', quantity: 20, price: 39 },
      { productId: 'p019', productName: 'LED灯带', quantity: 30, price: 29 },
      { productId: 'p041', productName: 'PPR水管', quantity: 50, price: 15 }
    ],
    totalAmount: 8630,
    status: 'delivered',
    createTime: '2026-05-28 11:00:00',
    payTime: '2026-05-28 11:05:00',
    shipTime: '2026-05-29 08:30:00',
    deliverTime: '2026-05-31 15:00:00'
  },
  {
    id: 'o005',
    orderNo: 'DD202606040005',
    customer: '陈先生',
    phone: '135****8765',
    address: '广州市天河区锦绣华府5栋3单元2201',
    items: [
      { productId: 'p006', productName: '通体大理石瓷砖', quantity: 120, price: 159 },
      { productId: 'p022', productName: '实木浴室柜组合', quantity: 2, price: 2599 },
      { productId: 'p028', productName: '简约布艺沙发', quantity: 1, price: 3999 },
      { productId: 'p030', productName: '板式双人床', quantity: 2, price: 1999 },
      { productId: 'p031', productName: '乳胶床垫', quantity: 2, price: 2599 }
    ],
    totalAmount: 37674,
    status: 'paid',
    createTime: '2026-06-04 09:15:00',
    payTime: '2026-06-04 09:20:00'
  },
  {
    id: 'o006',
    orderNo: 'DD202605250006',
    customer: '赵女士',
    phone: '133****2345',
    address: '成都市武侯区锦城花园2栋4单元602',
    items: [
      { productId: 'p002', productName: '强化复合地板', quantity: 90, price: 129 },
      { productId: 'p015', productName: '艺术漆', quantity: 3, price: 599 },
      { productId: 'p017', productName: '北欧风吊灯', quantity: 1, price: 599 }
    ],
    totalAmount: 13956,
    status: 'delivered',
    createTime: '2026-05-25 15:30:00',
    payTime: '2026-05-25 15:35:00',
    shipTime: '2026-05-26 10:00:00',
    deliverTime: '2026-05-28 14:30:00'
  },
  {
    id: 'o007',
    orderNo: 'DD202606050007',
    customer: '孙先生',
    phone: '132****7654',
    address: '武汉市江汉区城市广场1栋1单元1803',
    items: [
      { productId: 'p008', productName: '300*600内墙砖', quantity: 80, price: 49 },
      { productId: 'p013', productName: '防水涂料', quantity: 4, price: 189 },
      { productId: 'p026', productName: '不锈钢水槽', quantity: 1, price: 799 },
      { productId: 'p036', productName: '浴霸风暖', quantity: 2, price: 599 }
    ],
    totalAmount: 6672,
    status: 'cancelled',
    createTime: '2026-06-05 08:45:00'
  },
  {
    id: 'o008',
    orderNo: 'DD202606050008',
    customer: '周女士',
    phone: '131****3456',
    address: '南京市鼓楼区学府雅苑6栋2单元1001',
    items: [
      { productId: 'p032', productName: '整体衣柜定制', quantity: 12, price: 899 },
      { productId: 'p038', productName: '室内木门', quantity: 4, price: 1599 },
      { productId: 'p051', productName: '开关插座面板', quantity: 50, price: 19 }
    ],
    totalAmount: 18122,
    status: 'pending',
    createTime: '2026-06-05 13:20:00'
  }
];

export const dashboardStats: DashboardStats = {
  totalRevenue: 1256890,
  revenueGrowth: 15.8,
  totalOrders: 356,
  ordersGrowth: 12.3,
  totalCustomers: 1245,
  customersGrowth: 8.5,
  activeProjects: 23,
  projectsGrowth: 5.2,
  totalProducts: 258,
  lowStockProducts: 12,
  pendingOrders: 45,
  todayVisits: 2856
};

export const trendData: TrendData[] = [
  { month: '2026-01', revenue: 856000, orders: 245, customers: 186 },
  { month: '2026-02', revenue: 723000, orders: 210, customers: 165 },
  { month: '2026-03', revenue: 987000, orders: 289, customers: 215 },
  { month: '2026-04', revenue: 1056000, orders: 312, customers: 234 },
  { month: '2026-05', revenue: 1158000, orders: 338, customers: 256 },
  { month: '2026-06', revenue: 1256000, orders: 356, customers: 278 }
];

export const stylePredictions: StylePrediction[] = [
  {
    style: '现代简约',
    popularity: 85,
    trend: 'up',
    growthRate: 12.5,
    description: '简约而不简单，注重功能性与美学的平衡，适合快节奏生活的都市人群。',
    image: 'https://picsum.photos/seed/style1/600/400'
  },
  {
    style: '新中式',
    popularity: 72,
    trend: 'up',
    growthRate: 18.3,
    description: '传统东方美学与现代设计的完美融合，越来越受高端业主青睐。',
    image: 'https://picsum.photos/seed/style2/600/400'
  },
  {
    style: '北欧风格',
    popularity: 68,
    trend: 'stable',
    growthRate: 2.1,
    description: '自然温馨，以白色和原木色为主，打造舒适宜居的空间氛围。',
    image: 'https://picsum.photos/seed/style3/600/400'
  },
  {
    style: '轻奢风格',
    popularity: 78,
    trend: 'up',
    growthRate: 25.6,
    description: '精致优雅，金属与石材的碰撞，体现品质生活的追求。',
    image: 'https://picsum.photos/seed/style4/600/400'
  },
  {
    style: '日式风格',
    popularity: 45,
    trend: 'up',
    growthRate: 15.8,
    description: '禅意简约，注重收纳与功能性，适合小户型和追求宁静的人群。',
    image: 'https://picsum.photos/seed/style5/600/400'
  },
  {
    style: '工业风格',
    popularity: 38,
    trend: 'stable',
    growthRate: 1.2,
    description: '原始粗犷，水泥、铁艺、裸露砖墙，适合个性年轻人和LOFT户型。',
    image: 'https://picsum.photos/seed/style6/600/400'
  },
  {
    style: '法式风格',
    popularity: 52,
    trend: 'up',
    growthRate: 20.1,
    description: '浪漫优雅，精致线条与柔美色调，打造公主般的梦幻空间。',
    image: 'https://picsum.photos/seed/style7/600/400'
  },
  {
    style: '美式风格',
    popularity: 42,
    trend: 'down',
    growthRate: -3.5,
    description: '舒适大气，经典复古，适合大户型和喜欢传统居家感的人群。',
    image: 'https://picsum.photos/seed/style8/600/400'
  }
];

export const productCategories = [
  { name: '地板', count: 4, icon: 'floor' },
  { name: '瓷砖', count: 7, icon: 'tile' },
  { name: '涂料', count: 5, icon: 'paint' },
  { name: '灯具', count: 6, icon: 'light' },
  { name: '卫浴', count: 6, icon: 'bath' },
  { name: '家具', count: 6, icon: 'furniture' },
  { name: '建材', count: 19, icon: 'material' }
];

export interface ConstructorTeam {
  id: string;
  name: string;
  leaderName: string;
  phone: string;
  rating: number;
  completedProjects: number;
  bidPrice: number;
  bidDays: number;
  tags: string[];
  description: string;
  avatar: string;
}

export interface ConstructionProgress {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  startDate?: string;
  endDate?: string;
  description: string;
}

export interface ConstructionPhoto {
  id: string;
  url: string;
  description: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ConstructionReport {
  id: string;
  title: string;
  content: string;
  submittedBy: string;
  submittedAt: string;
  status: 'normal' | 'warning' | 'issue';
}

export interface RepaymentPlan {
  term: number;
  monthlyPayment: number;
  interestRate: number;
  totalInterest: number;
  totalPayment: number;
}

export const constructorTeams: ConstructorTeam[] = [
  {
    id: 'ct001',
    name: '金牌施工队',
    leaderName: '张建国',
    phone: '138****1234',
    rating: 4.9,
    completedProjects: 156,
    bidPrice: 128000,
    bidDays: 75,
    tags: ['五星团队', '工艺精湛', '准时交付'],
    description: '15年装修经验，专注中高档家装，拥有固定工人团队，工艺精湛，口碑极佳。',
    avatar: 'https://picsum.photos/seed/team1/200/200'
  },
  {
    id: 'ct002',
    name: '精工装饰队',
    leaderName: '李师傅',
    phone: '139****5678',
    rating: 4.8,
    completedProjects: 98,
    bidPrice: 115000,
    bidDays: 80,
    tags: ['性价比高', '细心负责', '零投诉'],
    description: '10年施工经验，注重细节，价格实惠，业主满意度高达98%。',
    avatar: 'https://picsum.photos/seed/team2/200/200'
  },
  {
    id: 'ct003',
    name: '匠心工程队',
    leaderName: '王工长',
    phone: '137****9012',
    rating: 4.7,
    completedProjects: 132,
    bidPrice: 135000,
    bidDays: 70,
    tags: ['快速施工', '品质保证', '售后完善'],
    description: '12年行业经验，施工速度快且品质有保障，提供完善的售后服务。',
    avatar: 'https://picsum.photos/seed/team3/200/200'
  },
  {
    id: 'ct004',
    name: '诚信装修队',
    leaderName: '陈队长',
    phone: '136****3456',
    rating: 4.6,
    completedProjects: 78,
    bidPrice: 108000,
    bidDays: 85,
    tags: ['价格透明', '材料环保', '业主推荐'],
    description: '8年施工经验，价格透明无隐形消费，全部使用环保材料。',
    avatar: 'https://picsum.photos/seed/team4/200/200'
  },
  {
    id: 'ct005',
    name: '优品施工队',
    leaderName: '刘工头',
    phone: '135****7890',
    rating: 4.8,
    completedProjects: 112,
    bidPrice: 122000,
    bidDays: 78,
    tags: ['设计感强', '工艺创新', '高端定制'],
    description: '10年高端家装经验，擅长复杂工艺，能完美实现设计效果。',
    avatar: 'https://picsum.photos/seed/team5/200/200'
  }
];

export const constructionProgress: ConstructionProgress[] = [
  {
    id: 'cp001',
    name: '拆改',
    status: 'completed',
    startDate: '2026-04-10',
    endDate: '2026-04-17',
    description: '墙体拆除、结构改造、铲墙皮等'
  },
  {
    id: 'cp002',
    name: '水电',
    status: 'completed',
    startDate: '2026-04-18',
    endDate: '2026-04-30',
    description: '水电路改造、防水处理、闭水试验'
  },
  {
    id: 'cp003',
    name: '泥瓦',
    status: 'completed',
    startDate: '2026-05-01',
    endDate: '2026-05-15',
    description: '瓷砖铺贴、地面找平、墙面抹灰'
  },
  {
    id: 'cp004',
    name: '木工',
    status: 'in_progress',
    startDate: '2026-05-16',
    description: '吊顶、柜体制作、木门安装'
  },
  {
    id: 'cp005',
    name: '油漆',
    status: 'pending',
    description: '墙面腻子、乳胶漆、木器漆'
  },
  {
    id: 'cp006',
    name: '安装',
    status: 'pending',
    description: '灯具、洁具、橱柜、地板安装'
  },
  {
    id: 'cp007',
    name: '竣工',
    status: 'pending',
    description: '清洁开荒、竣工验收、交付使用'
  }
];

export const constructionPhotos: ConstructionPhoto[] = [
  {
    id: 'photo001',
    url: 'https://picsum.photos/seed/site1/600/400',
    description: '客厅吊顶施工',
    uploadedBy: '张工长',
    uploadedAt: '2026-05-20 10:30'
  },
  {
    id: 'photo002',
    url: 'https://picsum.photos/seed/site2/600/400',
    description: '厨房墙砖铺贴',
    uploadedBy: '张工长',
    uploadedAt: '2026-05-18 14:20'
  },
  {
    id: 'photo003',
    url: 'https://picsum.photos/seed/site3/600/400',
    description: '卫生间防水处理',
    uploadedBy: '李监理',
    uploadedAt: '2026-05-15 09:15'
  },
  {
    id: 'photo004',
    url: 'https://picsum.photos/seed/site4/600/400',
    description: '水电改造完成',
    uploadedBy: '张工长',
    uploadedAt: '2026-04-28 16:45'
  },
  {
    id: 'photo005',
    url: 'https://picsum.photos/seed/site5/600/400',
    description: '主卧衣柜框架',
    uploadedBy: '张工长',
    uploadedAt: '2026-05-22 11:00'
  },
  {
    id: 'photo006',
    url: 'https://picsum.photos/seed/site6/600/400',
    description: '地面找平施工',
    uploadedBy: '李监理',
    uploadedAt: '2026-05-12 15:30'
  },
  {
    id: 'photo007',
    url: 'https://picsum.photos/seed/site7/600/400',
    description: '客餐厅地砖效果',
    uploadedBy: '张工长',
    uploadedAt: '2026-05-16 10:20'
  },
  {
    id: 'photo008',
    url: 'https://picsum.photos/seed/site8/600/400',
    description: '阳台墙砖铺贴',
    uploadedBy: '张工长',
    uploadedAt: '2026-05-14 13:50'
  }
];

export const constructionReports: ConstructionReport[] = [
  {
    id: 'report001',
    title: '第4周监理报告 - 木工阶段',
    content: '本周主要进行木工施工，客厅吊顶龙骨已完成，主卧衣柜框架正在制作中。材料进场验收合格，工人施工规范。需要注意：吊顶转角处需采用L型整板工艺，防止开裂。',
    submittedBy: '李监理',
    submittedAt: '2026-05-22 17:00',
    status: 'normal'
  },
  {
    id: 'report002',
    title: '第3周监理报告 - 泥瓦阶段',
    content: '泥瓦施工基本完成，瓷砖铺贴整体平整度良好，空鼓率控制在3%以内。卫生间闭水试验48小时无渗漏。地面找平完成，等待干透后进行下一步。',
    submittedBy: '李监理',
    submittedAt: '2026-05-15 16:30',
    status: 'normal'
  },
  {
    id: 'report003',
    title: '施工进度提醒',
    content: '按照施工计划，泥瓦阶段应于5月15日完成，目前进度正常。预计5月16日可进入木工阶段，请业主确认木工图纸及材料。',
    submittedBy: '张工长',
    submittedAt: '2026-05-14 10:00',
    status: 'warning'
  },
  {
    id: 'report004',
    title: '第2周监理报告 - 水电阶段',
    content: '水电改造全部完成，打压测试合格，电路绝缘测试正常。强弱电间距符合规范，水管走向合理。建议：预留足够的插座点位，特别是厨房和电视背景墙。',
    submittedBy: '李监理',
    submittedAt: '2026-04-30 18:00',
    status: 'normal'
  },
  {
    id: 'report005',
    title: '第1周监理报告 - 拆改阶段',
    content: '墙体拆除已按图纸完成，拆改垃圾已清运。现场安全防护到位，未发现违规操作。需要注意：拆除后的墙面需找平处理，为后续施工做好准备。',
    submittedBy: '李监理',
    submittedAt: '2026-04-17 15:30',
    status: 'normal'
  }
];

export const repaymentPlans: RepaymentPlan[] = [
  {
    term: 12,
    monthlyPayment: 22426,
    interestRate: 4.35,
    totalInterest: 28912,
    totalPayment: 269112
  },
  {
    term: 24,
    monthlyPayment: 11508,
    interestRate: 4.75,
    totalInterest: 56192,
    totalPayment: 276192
  },
  {
    term: 36,
    monthlyPayment: 7927,
    interestRate: 4.90,
    totalInterest: 85372,
    totalPayment: 305372
  }
];

