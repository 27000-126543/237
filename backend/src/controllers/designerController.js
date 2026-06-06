const User = require('../models/User');
const Review = require('../models/Review');

const getDesigners = async (req, res) => {
  try {
    const { page = 1, limit = 10, style, city, minPrice, maxPrice } = req.query;
    
    const query = { role: 'designer' };
    
    if (style) {
      query['designerProfile.styles'] = style;
    }
    if (city) {
      query.city = city;
    }
    if (minPrice) {
      query['designerProfile.priceRange.min'] = { $lte: Number(minPrice) };
    }
    if (maxPrice) {
      query['designerProfile.priceRange.max'] = { $gte: Number(maxPrice) };
    }

    const designers = await User.find(query)
      .select('name avatar city designerProfile.title designerProfile.styles designerProfile.rating designerProfile.orderCount designerProfile.priceRange designerProfile.description')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ 'designerProfile.rating': -1, 'designerProfile.orderCount': -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        designers,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取设计师列表失败', error: error.message });
  }
};

const getDesignerDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const designer = await User.findOne({ _id: id, role: 'designer' })
      .select('name avatar city designerProfile');

    if (!designer) {
      return res.status(404).json({ success: false, message: '设计师不存在' });
    }

    res.json({
      success: true,
      data: designer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取设计师详情失败', error: error.message });
  }
};

const matchDesigners = async (req, res) => {
  try {
    const { styles, budget, area } = req.body;

    if (!styles || !Array.isArray(styles) || styles.length === 0) {
      return res.status(400).json({ success: false, message: '请提供风格偏好' });
    }
    if (budget === undefined || budget === null) {
      return res.status(400).json({ success: false, message: '请提供预算' });
    }
    if (area === undefined || area === null) {
      return res.status(400).json({ success: false, message: '请提供面积' });
    }

    const designers = await User.find({ role: 'designer' })
      .select('name avatar city designerProfile');

    const matchedDesigners = designers.map(designer => {
      const profile = designer.designerProfile || {};
      const designerStyles = profile.styles || [];
      const priceRange = profile.priceRange || { min: 0, max: 0 };
      const rating = profile.rating || 5;
      const orderCount = profile.orderCount || 0;

      let styleScore = 0;
      const matchedStyles = styles.filter(s => designerStyles.includes(s));
      styleScore = (matchedStyles.length / styles.length) * 40;

      let budgetScore = 0;
      const avgBudget = budget / area;
      const designerAvgPrice = (priceRange.min + priceRange.max) / 2;
      if (designerAvgPrice > 0) {
        const diff = Math.abs(avgBudget - designerAvgPrice) / avgBudget;
        budgetScore = Math.max(0, 30 * (1 - diff));
      }

      const ratingScore = (rating / 5) * 20;

      const orderScore = Math.min(10, (orderCount / 50) * 10);

      const totalScore = styleScore + budgetScore + ratingScore + orderScore;

      return {
        ...designer.toObject(),
        matchScore: Math.round(totalScore * 100) / 100,
        matchDetails: {
          styleScore: Math.round(styleScore * 100) / 100,
          budgetScore: Math.round(budgetScore * 100) / 100,
          ratingScore: Math.round(ratingScore * 100) / 100,
          orderScore: Math.round(orderScore * 100) / 100
        }
      };
    });

    matchedDesigners.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      data: matchedDesigners
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '智能匹配设计师失败', error: error.message });
  }
};

const getDesignerReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ targetId: id, targetType: 'designer' })
      .populate('userId', 'name avatar')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments({ targetId: id, targetType: 'designer' });

    const avgRating = total > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 5;

    res.json({
      success: true,
      data: {
        reviews,
        avgRating: Math.round(avgRating * 10) / 10,
        totalReviews: total,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取设计师评价失败', error: error.message });
  }
};

module.exports = {
  getDesigners,
  getDesignerDetail,
  matchDesigners,
  getDesignerReviews
};
