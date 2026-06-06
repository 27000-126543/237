const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const dayjs = require('dayjs');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const Review = require('../models/Review');

const generateMonthlyReport = async (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const orders = await Order.find({
    createdAt: { $gte: startDate, $lte: endDate }
  }).populate('userId', 'name phone').populate('designerId', 'name');

  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + (order.status !== 'cancelled' && order.status !== 'refunded' ? order.totalAmount : 0), 0);
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const processingOrders = orders.filter(o => o.status === 'processing').length;

  const orderTypeStats = {};
  orders.forEach(order => {
    if (!orderTypeStats[order.type]) {
      orderTypeStats[order.type] = { count: 0, amount: 0 };
    }
    orderTypeStats[order.type].count++;
    if (order.status !== 'cancelled' && order.status !== 'refunded') {
      orderTypeStats[order.type].amount += order.totalAmount;
    }
  });

  const dailyStats = [];
  for (let day = 1; day <= endDate.getDate(); day++) {
    const dayStart = new Date(year, month - 1, day);
    const dayEnd = new Date(year, month - 1, day, 23, 59, 59, 999);
    const dayOrders = orders.filter(o => o.createdAt >= dayStart && o.createdAt <= dayEnd);
    dailyStats.push({
      date: `${month}/${day}/${year}`,
      orderCount: dayOrders.length,
      amount: dayOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' && o.status !== 'refunded' ? o.totalAmount : 0), 0)
    });
  }

  const reportData = {
    title: `${year}年${month}月运营报表`,
    generatedAt: new Date(),
    summary: {
      totalOrders,
      totalAmount,
      completedOrders,
      cancelledOrders,
      pendingOrders,
      processingOrders,
      completionRate: totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(2) + '%' : '0%'
    },
    orderTypeStats,
    dailyStats,
    orders: orders.map(order => ({
      orderNo: order.orderNo,
      customerName: order.userId?.name || '未知',
      customerPhone: order.userId?.phone || '未知',
      designerName: order.designerId?.name || '未分配',
      type: order.type,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }))
  };

  return reportData;
};

const generateMonthlyReportExcel = async (year, month) => {
  const data = await generateMonthlyReport(year, month);
  const workbook = new ExcelJS.Workbook();
  workbook.creator = '筑家平台';
  workbook.created = new Date();

  const summarySheet = workbook.addWorksheet('运营概览');
  summarySheet.columns = [
    { header: '指标', key: 'metric', width: 25 },
    { header: '数值', key: 'value', width: 20 }
  ];

  summarySheet.addRow({ metric: '报表名称', value: data.title });
  summarySheet.addRow({ metric: '生成时间', value: dayjs(data.generatedAt).format('YYYY-MM-DD HH:mm:ss') });
  summarySheet.addRow({ metric: '总订单数', value: data.summary.totalOrders });
  summarySheet.addRow({ metric: '总成交额', value: '¥' + data.summary.totalAmount.toFixed(2) });
  summarySheet.addRow({ metric: '已完成订单', value: data.summary.completedOrders });
  summarySheet.addRow({ metric: '进行中订单', value: data.summary.processingOrders });
  summarySheet.addRow({ metric: '待处理订单', value: data.summary.pendingOrders });
  summarySheet.addRow({ metric: '已取消订单', value: data.summary.cancelledOrders });
  summarySheet.addRow({ metric: '完成率', value: data.summary.completionRate });

  summarySheet.getRow(1).font = { bold: true, size: 14 };
  summarySheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  const typeSheet = workbook.addWorksheet('订单类型统计');
  typeSheet.columns = [
    { header: '订单类型', key: 'type', width: 20 },
    { header: '订单数量', key: 'count', width: 15 },
    { header: '成交金额', key: 'amount', width: 20 }
  ];

  const typeNames = {
    design: '设计订单',
    material: '材料订单',
    construction: '施工订单',
    full: '全案订单'
  };

  Object.keys(data.orderTypeStats).forEach(type => {
    typeSheet.addRow({
      type: typeNames[type] || type,
      count: data.orderTypeStats[type].count,
      amount: '¥' + data.orderTypeStats[type].amount.toFixed(2)
    });
  });

  typeSheet.getRow(1).font = { bold: true, size: 12 };
  typeSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  const dailySheet = workbook.addWorksheet('每日统计');
  dailySheet.columns = [
    { header: '日期', key: 'date', width: 15 },
    { header: '订单数', key: 'orderCount', width: 12 },
    { header: '成交额', key: 'amount', width: 18 }
  ];

  data.dailyStats.forEach(stat => {
    dailySheet.addRow({
      date: stat.date,
      orderCount: stat.orderCount,
      amount: '¥' + stat.amount.toFixed(2)
    });
  });

  dailySheet.getRow(1).font = { bold: true, size: 12 };
  dailySheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  const ordersSheet = workbook.addWorksheet('订单明细');
  ordersSheet.columns = [
    { header: '订单编号', key: 'orderNo', width: 20 },
    { header: '客户姓名', key: 'customerName', width: 15 },
    { header: '联系电话', key: 'customerPhone', width: 15 },
    { header: '设计师', key: 'designerName', width: 15 },
    { header: '订单类型', key: 'type', width: 12 },
    { header: '订单状态', key: 'status', width: 12 },
    { header: '订单金额', key: 'totalAmount', width: 15 },
    { header: '创建时间', key: 'createdAt', width: 20 }
  ];

  const statusNames = {
    pending: '待支付',
    paid: '已支付',
    processing: '进行中',
    completed: '已完成',
    cancelled: '已取消',
    refunded: '已退款'
  };

  data.orders.forEach(order => {
    ordersSheet.addRow({
      ...order,
      type: typeNames[order.type] || order.type,
      status: statusNames[order.status] || order.status,
      totalAmount: '¥' + order.totalAmount.toFixed(2)
    });
  });

  ordersSheet.getRow(1).font = { bold: true, size: 12 };
  ordersSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  return workbook;
};

const generateMonthlyReportPDF = async (year, month) => {
  const data = await generateMonthlyReport(year, month);
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).text(data.title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text(`生成时间: ${dayjs(data.generatedAt).format('YYYY-MM-DD HH:mm:ss')}`, { align: 'center' });
  doc.moveDown(2);

  doc.fontSize(14).text('一、运营概览');
  doc.moveDown();
  doc.fontSize(11);
  const summaryItems = [
    ['总订单数', data.summary.totalOrders.toString()],
    ['总成交额', '¥' + data.summary.totalAmount.toFixed(2)],
    ['已完成订单', data.summary.completedOrders.toString()],
    ['进行中订单', data.summary.processingOrders.toString()],
    ['待处理订单', data.summary.pendingOrders.toString()],
    ['已取消订单', data.summary.cancelledOrders.toString()],
    ['完成率', data.summary.completionRate]
  ];

  const tableTop = doc.y;
  const col1X = 50;
  const col2X = 250;
  const rowHeight = 25;

  summaryItems.forEach((item, i) => {
    const y = tableTop + i * rowHeight;
    doc.rect(col1X, y, 200, rowHeight).stroke();
    doc.rect(col2X, y, 200, rowHeight).stroke();
    doc.text(item[0], col1X + 5, y + 8);
    doc.text(item[1], col2X + 5, y + 8);
  });

  doc.y = tableTop + summaryItems.length * rowHeight + 20;

  doc.addPage();
  doc.fontSize(14).text('二、订单类型统计');
  doc.moveDown();
  doc.fontSize(11);

  const typeNames = {
    design: '设计订单',
    material: '材料订单',
    construction: '施工订单',
    full: '全案订单'
  };

  const typeTableTop = doc.y;
  const typeColX = [50, 200, 350];
  const typeHeaders = ['订单类型', '订单数量', '成交金额'];

  typeHeaders.forEach((header, i) => {
    doc.rect(typeColX[i], typeTableTop, 150, rowHeight).stroke();
    doc.text(header, typeColX[i] + 5, typeTableTop + 8);
  });

  let typeRow = 1;
  Object.keys(data.orderTypeStats).forEach(type => {
    const y = typeTableTop + typeRow * rowHeight;
    doc.rect(typeColX[0], y, 150, rowHeight).stroke();
    doc.rect(typeColX[1], y, 150, rowHeight).stroke();
    doc.rect(typeColX[2], y, 150, rowHeight).stroke();
    doc.text(typeNames[type] || type, typeColX[0] + 5, y + 8);
    doc.text(data.orderTypeStats[type].count.toString(), typeColX[1] + 5, y + 8);
    doc.text('¥' + data.orderTypeStats[type].amount.toFixed(2), typeColX[2] + 5, y + 8);
    typeRow++;
  });

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
};

const generateDesignerPerformance = async () => {
  const designers = await User.find({ role: 'designer' });
  const orders = await Order.find({ designerId: { $exists: true } });
  const reviews = await Review.find({ targetType: 'designer' });

  const designerStats = designers.map(designer => {
    const designerOrders = orders.filter(o => o.designerId?.toString() === designer._id.toString());
    const designerReviews = reviews.filter(r => r.targetId.toString() === designer._id.toString());
    const totalRevenue = designerOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' && o.status !== 'refunded' ? o.totalAmount : 0), 0);
    const completedCount = designerOrders.filter(o => o.status === 'completed').length;
    const avgRating = designerReviews.length > 0
      ? (designerReviews.reduce((sum, r) => sum + r.rating, 0) / designerReviews.length).toFixed(1)
      : '5.0';

    return {
      designerId: designer._id,
      name: designer.name,
      phone: designer.phone,
      title: designer.designerProfile?.title || '设计师',
      experience: designer.designerProfile?.experience || 0,
      orderCount: designerOrders.length,
      completedCount,
      totalRevenue,
      avgRating,
      reviewCount: designerReviews.length
    };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue);

  return {
    title: '设计师绩效报表',
    generatedAt: new Date(),
    totalDesigners: designers.length,
    designers: designerStats
  };
};

const generateDesignerPerformanceExcel = async () => {
  const data = await generateDesignerPerformance();
  const workbook = new ExcelJS.Workbook();
  workbook.creator = '筑家平台';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('设计师绩效');
  sheet.columns = [
    { header: '排名', key: 'rank', width: 8 },
    { header: '设计师姓名', key: 'name', width: 15 },
    { header: '联系电话', key: 'phone', width: 15 },
    { header: '职称', key: 'title', width: 15 },
    { header: '从业年限', key: 'experience', width: 12 },
    { header: '订单总数', key: 'orderCount', width: 12 },
    { header: '已完成订单', key: 'completedCount', width: 14 },
    { header: '总营收', key: 'totalRevenue', width: 18 },
    { header: '平均评分', key: 'avgRating', width: 12 },
    { header: '评价数', key: 'reviewCount', width: 12 }
  ];

  data.designers.forEach((designer, index) => {
    sheet.addRow({
      rank: index + 1,
      ...designer,
      totalRevenue: '¥' + designer.totalRevenue.toFixed(2)
    });
  });

  sheet.getRow(1).font = { bold: true, size: 12 };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  return workbook;
};

const generateDesignerPerformancePDF = async () => {
  const data = await generateDesignerPerformance();
  const doc = new PDFDocument({ size: 'A4', margin: 30, layout: 'landscape' });

  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).text(data.title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text(`生成时间: ${dayjs(data.generatedAt).format('YYYY-MM-DD HH:mm:ss')}`, { align: 'center' });
  doc.text(`设计师总数: ${data.totalDesigners}人`, { align: 'center' });
  doc.moveDown(2);

  doc.fontSize(11);
  const tableTop = doc.y;
  const colWidths = [40, 80, 80, 80, 60, 60, 70, 80, 60, 60];
  const headers = ['排名', '姓名', '电话', '职称', '年限', '订单数', '完成数', '总营收', '评分', '评价数'];
  const colX = [30];
  for (let i = 1; i < headers.length; i++) {
    colX.push(colX[i - 1] + colWidths[i - 1]);
  }

  const rowHeight = 25;

  headers.forEach((header, i) => {
    doc.rect(colX[i], tableTop, colWidths[i], rowHeight).stroke();
    doc.text(header, colX[i] + 3, tableTop + 8);
  });

  data.designers.slice(0, 20).forEach((designer, index) => {
    const y = tableTop + (index + 1) * rowHeight;
    const rowData = [
      (index + 1).toString(),
      designer.name,
      designer.phone,
      designer.title,
      designer.experience.toString(),
      designer.orderCount.toString(),
      designer.completedCount.toString(),
      '¥' + designer.totalRevenue.toFixed(0),
      designer.avgRating,
      designer.reviewCount.toString()
    ];

    rowData.forEach((cell, i) => {
      doc.rect(colX[i], y, colWidths[i], rowHeight).stroke();
      doc.text(cell, colX[i] + 3, y + 8);
    });
  });

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
};

const generateConstructorRating = async () => {
  const constructors = await User.find({ role: 'constructor' });
  const reviews = await Review.find({ targetType: 'constructor' });

  const constructorStats = constructors.map(constructor => {
    const constructorReviews = reviews.filter(r => r.targetId.toString() === constructor._id.toString());
    const avgRating = constructorReviews.length > 0
      ? (constructorReviews.reduce((sum, r) => sum + r.rating, 0) / constructorReviews.length).toFixed(1)
      : '5.0';

    return {
      constructorId: constructor._id,
      name: constructor.name,
      phone: constructor.phone,
      companyName: constructor.constructorProfile?.companyName || '未设置',
      leaderName: constructor.constructorProfile?.leaderName || '未设置',
      completedProjects: constructor.constructorProfile?.completedProjects || 0,
      avgRating,
      reviewCount: constructorReviews.length,
      fiveStarCount: constructorReviews.filter(r => r.rating === 5).length,
      fourStarCount: constructorReviews.filter(r => r.rating === 4).length,
      threeStarCount: constructorReviews.filter(r => r.rating === 3).length,
      twoStarCount: constructorReviews.filter(r => r.rating === 2).length,
      oneStarCount: constructorReviews.filter(r => r.rating === 1).length
    };
  }).sort((a, b) => parseFloat(b.avgRating) - parseFloat(a.avgRating));

  return {
    title: '施工队评分报表',
    generatedAt: new Date(),
    totalConstructors: constructors.length,
    constructors: constructorStats
  };
};

const generateConstructorRatingExcel = async () => {
  const data = await generateConstructorRating();
  const workbook = new ExcelJS.Workbook();
  workbook.creator = '筑家平台';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('施工队评分');
  sheet.columns = [
    { header: '排名', key: 'rank', width: 8 },
    { header: '施工队名称', key: 'companyName', width: 20 },
    { header: '负责人', key: 'leaderName', width: 12 },
    { header: '联系电话', key: 'phone', width: 15 },
    { header: '已完成项目', key: 'completedProjects', width: 14 },
    { header: '平均评分', key: 'avgRating', width: 12 },
    { header: '评价总数', key: 'reviewCount', width: 12 },
    { header: '5星', key: 'fiveStarCount', width: 8 },
    { header: '4星', key: 'fourStarCount', width: 8 },
    { header: '3星', key: 'threeStarCount', width: 8 },
    { header: '2星', key: 'twoStarCount', width: 8 },
    { header: '1星', key: 'oneStarCount', width: 8 }
  ];

  data.constructors.forEach((constructor, index) => {
    sheet.addRow({
      rank: index + 1,
      ...constructor
    });
  });

  sheet.getRow(1).font = { bold: true, size: 12 };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  return workbook;
};

const generateConstructorRatingPDF = async () => {
  const data = await generateConstructorRating();
  const doc = new PDFDocument({ size: 'A4', margin: 30, layout: 'landscape' });

  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).text(data.title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text(`生成时间: ${dayjs(data.generatedAt).format('YYYY-MM-DD HH:mm:ss')}`, { align: 'center' });
  doc.text(`施工队总数: ${data.totalConstructors}家`, { align: 'center' });
  doc.moveDown(2);

  doc.fontSize(10);
  const tableTop = doc.y;
  const colWidths = [35, 100, 60, 70, 60, 50, 50, 35, 35, 35, 35, 35];
  const headers = ['排名', '公司名称', '负责人', '电话', '完成项目', '评分', '评价数', '5星', '4星', '3星', '2星', '1星'];
  const colX = [30];
  for (let i = 1; i < headers.length; i++) {
    colX.push(colX[i - 1] + colWidths[i - 1]);
  }

  const rowHeight = 25;

  headers.forEach((header, i) => {
    doc.rect(colX[i], tableTop, colWidths[i], rowHeight).stroke();
    doc.text(header, colX[i] + 2, tableTop + 8);
  });

  data.constructors.slice(0, 15).forEach((constructor, index) => {
    const y = tableTop + (index + 1) * rowHeight;
    const rowData = [
      (index + 1).toString(),
      constructor.companyName,
      constructor.leaderName,
      constructor.phone,
      constructor.completedProjects.toString(),
      constructor.avgRating,
      constructor.reviewCount.toString(),
      constructor.fiveStarCount.toString(),
      constructor.fourStarCount.toString(),
      constructor.threeStarCount.toString(),
      constructor.twoStarCount.toString(),
      constructor.oneStarCount.toString()
    ];

    rowData.forEach((cell, i) => {
      doc.rect(colX[i], y, colWidths[i], rowHeight).stroke();
      doc.text(cell, colX[i] + 2, y + 8);
    });
  });

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
};

const generateMaterialSales = async () => {
  const products = await Product.find().sort({ sales: -1 }).limit(50);
  const orders = await Order.find({ status: { $nin: ['cancelled', 'refunded'] } });

  const productSales = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = { quantity: 0, revenue: 0 };
      }
      productSales[item.productId].quantity += item.quantity || 1;
      productSales[item.productId].revenue += (item.price || 0) * (item.quantity || 1);
    });
  });

  const productStats = products.map(product => {
    const salesData = productSales[product._id.toString()] || { quantity: 0, revenue: 0 };
    return {
      productId: product._id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      sales: product.sales,
      soldQuantity: salesData.quantity,
      revenue: salesData.revenue,
      rating: product.rating,
      reviewCount: product.reviewCount
    };
  }).sort((a, b) => b.revenue - a.revenue);

  const categoryStats = {};
  productStats.forEach(product => {
    if (!categoryStats[product.category]) {
      categoryStats[product.category] = { productCount: 0, totalRevenue: 0, totalQuantity: 0 };
    }
    categoryStats[product.category].productCount++;
    categoryStats[product.category].totalRevenue += product.revenue;
    categoryStats[product.category].totalQuantity += product.soldQuantity;
  });

  return {
    title: '材料销售排行报表',
    generatedAt: new Date(),
    totalProducts: products.length,
    totalRevenue: productStats.reduce((sum, p) => sum + p.revenue, 0),
    categoryStats,
    products: productStats
  };
};

const generateMaterialSalesExcel = async () => {
  const data = await generateMaterialSales();
  const workbook = new ExcelJS.Workbook();
  workbook.creator = '筑家平台';
  workbook.created = new Date();

  const summarySheet = workbook.addWorksheet('销售概览');
  summarySheet.columns = [
    { header: '指标', key: 'metric', width: 25 },
    { header: '数值', key: 'value', width: 25 }
  ];

  summarySheet.addRow({ metric: '报表名称', value: data.title });
  summarySheet.addRow({ metric: '生成时间', value: dayjs(data.generatedAt).format('YYYY-MM-DD HH:mm:ss') });
  summarySheet.addRow({ metric: '商品总数', value: data.totalProducts });
  summarySheet.addRow({ metric: '总销售额', value: '¥' + data.totalRevenue.toFixed(2) });

  summarySheet.getRow(1).font = { bold: true, size: 14 };
  summarySheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  const categorySheet = workbook.addWorksheet('分类统计');
  categorySheet.columns = [
    { header: '商品分类', key: 'category', width: 20 },
    { header: '商品数量', key: 'productCount', width: 15 },
    { header: '销售数量', key: 'totalQuantity', width: 15 },
    { header: '销售额', key: 'totalRevenue', width: 20 }
  ];

  Object.keys(data.categoryStats).forEach(category => {
    categorySheet.addRow({
      category,
      ...data.categoryStats[category],
      totalRevenue: '¥' + data.categoryStats[category].totalRevenue.toFixed(2)
    });
  });

  categorySheet.getRow(1).font = { bold: true, size: 12 };
  categorySheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  const productsSheet = workbook.addWorksheet('销售排行');
  productsSheet.columns = [
    { header: '排名', key: 'rank', width: 8 },
    { header: '商品名称', key: 'name', width: 30 },
    { header: '品牌', key: 'brand', width: 15 },
    { header: '分类', key: 'category', width: 15 },
    { header: '单价', key: 'price', width: 12 },
    { header: '库存销量', key: 'sales', width: 12 },
    { header: '售出数量', key: 'soldQuantity', width: 12 },
    { header: '销售额', key: 'revenue', width: 18 },
    { header: '评分', key: 'rating', width: 10 },
    { header: '评价数', key: 'reviewCount', width: 12 }
  ];

  data.products.forEach((product, index) => {
    productsSheet.addRow({
      rank: index + 1,
      ...product,
      price: '¥' + product.price.toFixed(2),
      revenue: '¥' + product.revenue.toFixed(2)
    });
  });

  productsSheet.getRow(1).font = { bold: true, size: 12 };
  productsSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  return workbook;
};

const generateMaterialSalesPDF = async () => {
  const data = await generateMaterialSales();
  const doc = new PDFDocument({ size: 'A4', margin: 30, layout: 'landscape' });

  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).text(data.title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text(`生成时间: ${dayjs(data.generatedAt).format('YYYY-MM-DD HH:mm:ss')}`, { align: 'center' });
  doc.text(`商品总数: ${data.totalProducts} | 总销售额: ¥${data.totalRevenue.toFixed(2)}`, { align: 'center' });
  doc.moveDown(2);

  doc.fontSize(12).text('一、分类统计');
  doc.moveDown();
  doc.fontSize(10);

  const catTableTop = doc.y;
  const catColWidths = [150, 100, 100, 150];
  const catHeaders = ['商品分类', '商品数量', '销售数量', '销售额'];
  const catColX = [30];
  for (let i = 1; i < catHeaders.length; i++) {
    catColX.push(catColX[i - 1] + catColWidths[i - 1]);
  }

  const rowHeight = 25;

  catHeaders.forEach((header, i) => {
    doc.rect(catColX[i], catTableTop, catColWidths[i], rowHeight).stroke();
    doc.text(header, catColX[i] + 5, catTableTop + 8);
  });

  let catRow = 1;
  Object.keys(data.categoryStats).forEach(category => {
    const y = catTableTop + catRow * rowHeight;
    const catStats = data.categoryStats[category];
    const rowData = [
      category,
      catStats.productCount.toString(),
      catStats.totalQuantity.toString(),
      '¥' + catStats.totalRevenue.toFixed(2)
    ];
    rowData.forEach((cell, i) => {
      doc.rect(catColX[i], y, catColWidths[i], rowHeight).stroke();
      doc.text(cell, catColX[i] + 5, y + 8);
    });
    catRow++;
  });

  doc.y = catTableTop + catRow * rowHeight + 20;

  doc.fontSize(12).text('二、销售排行TOP20');
  doc.moveDown();
  doc.fontSize(9);

  const prodTableTop = doc.y;
  const prodColWidths = [35, 130, 70, 70, 60, 60, 60, 80, 40, 50];
  const prodHeaders = ['排名', '商品名称', '品牌', '分类', '单价', '库存', '售出', '销售额', '评分', '评价'];
  const prodColX = [30];
  for (let i = 1; i < prodHeaders.length; i++) {
    prodColX.push(prodColX[i - 1] + prodColWidths[i - 1]);
  }

  prodHeaders.forEach((header, i) => {
    doc.rect(prodColX[i], prodTableTop, prodColWidths[i], rowHeight).stroke();
    doc.text(header, prodColX[i] + 2, prodTableTop + 8);
  });

  data.products.slice(0, 20).forEach((product, index) => {
    const y = prodTableTop + (index + 1) * rowHeight;
    const rowData = [
      (index + 1).toString(),
      product.name.substring(0, 15),
      product.brand,
      product.category,
      '¥' + product.price.toFixed(0),
      product.sales.toString(),
      product.soldQuantity.toString(),
      '¥' + product.revenue.toFixed(0),
      product.rating.toString(),
      product.reviewCount.toString()
    ];
    rowData.forEach((cell, i) => {
      doc.rect(prodColX[i], y, prodColWidths[i], rowHeight).stroke();
      doc.text(cell, prodColX[i] + 2, y + 8);
    });
  });

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
};

module.exports = {
  generateMonthlyReportExcel,
  generateMonthlyReportPDF,
  generateDesignerPerformanceExcel,
  generateDesignerPerformancePDF,
  generateConstructorRatingExcel,
  generateConstructorRatingPDF,
  generateMaterialSalesExcel,
  generateMaterialSalesPDF
};
