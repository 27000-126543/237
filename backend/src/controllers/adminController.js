const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Construction = require('../models/Construction');
const Review = require('../models/Review');

const buildDateFilter = (startDate, endDate) => {
  const filter = {};
  if (startDate) {
    filter.createdAt = { ...filter.createdAt, $gte: new Date(startDate) };
  }
  if (endDate) {
    filter.createdAt = { ...filter.createdAt, $lte: new Date(endDate) };
  }
  return filter;
};

const getDashboardStats = async (req, res) => {
  try {
    const { city, startDate, endDate } = req.query;
    const dateFilter = buildDateFilter(startDate, endDate);

    const userMatch = { ...dateFilter };
    if (city) userMatch.city = city;

    const orderMatch = { ...dateFilter };
    if (city) {
      orderMatch['address.city'] = city;
    }

    const constructionMatch = {};
    if (city) {
      constructionMatch['address'] = { $regex: city, $options: 'i' };
    }

    const [
      totalUsers,
      todayOrders,
      totalRevenue,
      activeConstructions,
      userSatisfaction,
      designerActivity
    ] = await Promise.all([
      User.countDocuments({ ...userMatch, role: { $ne: 'admin' } }),
      Order.countDocuments({
        ...orderMatch,
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }),
      Order.aggregate([
        { $match: { ...orderMatch, status: { $in: ['paid', 'processing', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      Construction.countDocuments({
        ...constructionMatch,
        status: { $in: ['contract', 'constructing', 'acceptance'] }
      }),
      Review.aggregate([
        { $match: { targetType: 'designer' } },
        { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
      ]),
      Order.aggregate([
        { $match: { ...orderMatch, designerId: { $exists: true } } },
        { $group: { _id: '$designerId', orderCount: { $sum: 1 } } },
        { $count: 'activeDesigners' }
      ])
    ]);

    res.json({
      totalUsers,
      todayOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      activeConstructions,
      userSatisfaction: userSatisfaction[0]?.avgRating || 0,
      designerActivity: designerActivity[0]?.activeDesigners || 0
    });
  } catch (error) {
    res.status(500).json({ message: '获取统计数据失败', error: error.message });
  }
};

const getTrendData = async (req, res) => {
  try {
    const { city, startDate, endDate, type = 'day' } = req.query;
    const dateFilter = buildDateFilter(startDate, endDate);
    const match = { ...dateFilter };
    if (city) {
      match['address.city'] = city;
    }

    const groupId = type === 'month'
      ? { $dateToString: { format: '%Y-%m', date: '$createdAt' } }
      : { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };

    const trendData = await Order.aggregate([
      { $match: match },
      {
        $group: {
          _id: groupId,
          orderCount: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ trendData, type });
  } catch (error) {
    res.status(500).json({ message: '获取趋势数据失败', error: error.message });
  }
};

const getRankings = async (req, res) => {
  try {
    const { city, startDate, endDate, limit = 10 } = req.query;
    const dateFilter = buildDateFilter(startDate, endDate);
    const orderMatch = { ...dateFilter };
    if (city) {
      orderMatch['address.city'] = city;
    }

    const [designerRankings, productSalesRankings, constructorRankings] = await Promise.all([
      Order.aggregate([
        { $match: { ...orderMatch, designerId: { $exists: true } } },
        { $group: { _id: '$designerId', orderCount: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } },
        { $sort: { orderCount: -1 } },
        { $limit: parseInt(limit) },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'designer'
          }
        },
        { $unwind: '$designer' },
        {
          $project: {
            _id: 1,
            name: '$designer.name',
            avatar: '$designer.avatar',
            title: '$designer.designerProfile.title',
            orderCount: 1,
            revenue: 1
          }
        }
      ]),
      Order.aggregate([
        { $match: orderMatch },
        { $unwind: '$items' },
        { $group: { _id: '$items.productId', name: { $first: '$items.name' }, sales: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } },
        { $sort: { sales: -1 } },
        { $limit: parseInt(limit) },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            name: { $ifNull: ['$product.name', '$name'] },
            brand: '$product.brand',
            images: '$product.images',
            sales: 1,
            revenue: 1
          }
        }
      ]),
      Review.aggregate([
        { $match: { targetType: 'constructor' } },
        {
          $group: {
            _id: '$targetId',
            avgRating: { $avg: '$rating' },
            reviewCount: { $sum: 1 }
          }
        },
        { $sort: { avgRating: -1 } },
        { $limit: parseInt(limit) },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'constructor'
          }
        },
        { $unwind: '$constructor' },
        {
          $project: {
            _id: 1,
            name: '$constructor.name',
            avatar: '$constructor.avatar',
            companyName: '$constructor.constructorProfile.companyName',
            avgRating: 1,
            reviewCount: 1
          }
        }
      ])
    ]);

    res.json({
      designerRankings,
      productSalesRankings,
      constructorRankings
    });
  } catch (error) {
    res.status(500).json({ message: '获取排行数据失败', error: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const { city, startDate, endDate } = req.query;
    const dateFilter = buildDateFilter(startDate, endDate);
    const orderMatch = { ...dateFilter };
    if (city) {
      orderMatch['address.city'] = city;
    }

    const [cityDistribution, orderTypeDistribution, statusDistribution, timeDistribution] = await Promise.all([
      Order.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$address.city', orderCount: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } },
        { $sort: { orderCount: -1 } }
      ]),
      Order.aggregate([
        { $match: orderMatch },
        { $group: { _id: '$type', count: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } }
      ]),
      Order.aggregate([
        { $match: orderMatch },
        { $group: { _id: '$status', count: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } }
      ]),
      Order.aggregate([
        { $match: orderMatch },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orderCount: { $sum: 1 },
            revenue: { $sum: '$totalAmount' }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({
      cityDistribution,
      orderTypeDistribution,
      statusDistribution,
      timeDistribution
    });
  } catch (error) {
    res.status(500).json({ message: '获取分析数据失败', error: error.message });
  }
};

const getPredictions = async (req, res) => {
  try {
    const { city } = req.query;
    const orderMatch = {};
    if (city) {
      orderMatch['address.city'] = city;
    }

    const [styleTrends, materialDemands] = await Promise.all([
      Order.aggregate([
        { $match: { ...orderMatch, 'houseInfo.style': { $exists: true } } },
        { $group: { _id: '$houseInfo.style', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Order.aggregate([
        { $match: orderMatch },
        { $unwind: '$items' },
        { $group: { _id: '$items.name', type: { $first: '$items.type' }, totalQuantity: { $sum: '$items.quantity' } } },
        { $sort: { totalQuantity: -1 } },
        { $limit: 10 }
      ])
    ]);

    const stylePredictions = styleTrends.map((style, index) => ({
      style: style._id,
      count: style.count,
      predictedGrowth: Math.max(5, Math.floor(Math.random() * 25)),
      trend: index < 3 ? 'up' : index < 6 ? 'stable' : 'down'
    }));

    const materialPredictions = materialDemands.map(material => ({
      name: material._id,
      type: material.type,
      currentDemand: material.totalQuantity,
      predictedDemand: Math.floor(material.totalQuantity * (1 + (Math.random() * 0.4 - 0.1))),
      trend: Math.random() > 0.3 ? 'up' : 'stable'
    }));

    res.json({
      stylePredictions,
      materialPredictions
    });
  } catch (error) {
    res.status(500).json({ message: '获取预测数据失败', error: error.message });
  }
};

const getConstructionMonitor = async (req, res) => {
  try {
    const { city, status } = req.query;
    const match = {};
    if (city) {
      match.address = { $regex: city, $options: 'i' };
    }
    if (status) {
      match.status = status;
    }

    const constructions = await Construction.find(match)
      .populate('orderId', 'orderNo totalAmount')
      .populate('userId', 'name phone')
      .populate('constructorId', 'name constructorProfile.companyName')
      .sort({ createdAt: -1 })
      .limit(50);

    const warnings = [];
    const now = new Date();

    constructions.forEach(construction => {
      if (construction.status === 'constructing' && construction.expectedEndDate) {
        const daysLeft = Math.ceil((construction.expectedEndDate - now) / (1000 * 60 * 60 * 24));
        if (daysLeft < 7 && daysLeft >= 0) {
          warnings.push({
            type: 'deadline_warning',
            constructionId: construction._id,
            projectName: construction.name,
            message: `距离预计完工仅剩 ${daysLeft} 天`,
            severity: 'warning'
          });
        } else if (daysLeft < 0) {
          warnings.push({
            type: 'overdue',
            constructionId: construction._id,
            projectName: construction.name,
            message: `已逾期 ${Math.abs(daysLeft)} 天`,
            severity: 'danger'
          });
        }
      }

      if (construction.reports && construction.reports.length > 0) {
        const recentWarnings = construction.reports.filter(r => r.type === 'warning' || r.type === 'issue');
        recentWarnings.forEach(report => {
          warnings.push({
            type: report.type,
            constructionId: construction._id,
            projectName: construction.name,
            message: report.title,
            severity: report.type === 'issue' ? 'danger' : 'warning',
            reportTime: report.submittedAt
          });
        });
      }

      if (construction.progress) {
        const delayedSteps = construction.progress.filter(step =>
          step.status !== 'completed' && step.endDate && new Date(step.endDate) < now
        );
        delayedSteps.forEach(step => {
          warnings.push({
            type: 'step_delay',
            constructionId: construction._id,
            projectName: construction.name,
            stepName: step.name,
            message: `工序「${step.name}」已延期`,
            severity: 'warning'
          });
        });
      }
    });

    const stats = await Construction.aggregate([
      { $match: match },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const statusStats = {
      bidding: 0,
      contract: 0,
      constructing: 0,
      acceptance: 0,
      completed: 0,
      cancelled: 0
    };

    stats.forEach(s => {
      statusStats[s._id] = s.count;
    });

    res.json({
      constructions,
      warnings,
      statusStats
    });
  } catch (error) {
    res.status(500).json({ message: '获取施工监控数据失败', error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getTrendData,
  getRankings,
  getAnalytics,
  getPredictions,
  getConstructionMonitor
};
