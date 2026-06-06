const Order = require('../models/Order');
const { generateOrderNo } = require('../utils/helpers');

const createOrder = async (req, res) => {
  try {
    const { type, items, totalAmount, address, houseInfo, designerId, remark } = req.body;
    const userId = req.user.id;

    const orderNo = generateOrderNo();

    const order = new Order({
      orderNo,
      userId,
      designerId,
      type,
      totalAmount,
      items,
      address,
      houseInfo,
      remark,
      status: 'pending'
    });

    await order.save();
    res.status(201).json({ message: '订单创建成功', order });
  } catch (error) {
    res.status(500).json({ message: '创建订单失败', error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { userId };
    if (status) query.status = status;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('designerId', 'name avatar');

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: '获取订单列表失败', error: error.message });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: id, userId })
      .populate('designerId', 'name avatar phone')
      .populate('items.productId', 'name brand images');

    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: '获取订单详情失败', error: error.message });
  }
};

const payOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { paymentNodeIndex } = req.body;

    const order = await Order.findOne({ _id: id, userId });

    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({ message: '订单已取消，无法支付' });
    }

    if (order.paymentNodes && order.paymentNodes.length > 0 && paymentNodeIndex !== undefined) {
      if (paymentNodeIndex >= order.paymentNodes.length) {
        return res.status(400).json({ message: '无效的付款节点' });
      }
      order.paymentNodes[paymentNodeIndex].status = 'paid';
      order.paymentNodes[paymentNodeIndex].paidAt = new Date();

      const allPaid = order.paymentNodes.every(node => node.status === 'paid');
      if (allPaid) {
        order.status = 'paid';
        order.paidAt = new Date();
      }
    } else {
      order.status = 'paid';
      order.paidAt = new Date();
    }

    await order.save();
    res.json({ message: '支付成功', order });
  } catch (error) {
    res.status(500).json({ message: '支付失败', error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { reason } = req.body;

    const order = await Order.findOne({ _id: id, userId });

    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    if (order.status === 'paid' || order.status === 'processing' || order.status === 'completed') {
      return res.status(400).json({ message: '当前订单状态无法取消' });
    }

    order.status = 'cancelled';
    order.remark = reason ? `${order.remark || ''} 取消原因: ${reason}`.trim() : order.remark;

    await order.save();
    res.json({ message: '订单已取消', order });
  } catch (error) {
    res.status(500).json({ message: '取消订单失败', error: error.message });
  }
};

const generateMaterialList = async (req, res) => {
  try {
    const { area, style, layout } = req.body;

    if (!area || !style) {
      return res.status(400).json({ message: '请提供面积和装修风格' });
    }

    const materialCategories = {
      modern: {
        floor: { name: '强化复合地板', pricePerSqm: 150, brand: '圣象' },
        wall: { name: '乳胶漆', pricePerSqm: 80, brand: '多乐士' },
        ceiling: { name: '石膏板吊顶', pricePerSqm: 120, brand: '龙牌' },
        bathroom: { name: '整体卫浴', pricePerSqm: 2000, brand: 'TOTO' },
        kitchen: { name: '整体橱柜', pricePerMeter: 3000, brand: '欧派' }
      },
      chinese: {
        floor: { name: '实木地板', pricePerSqm: 350, brand: '大自然' },
        wall: { name: '墙纸', pricePerSqm: 120, brand: '柔然' },
        ceiling: { name: '中式吊顶', pricePerSqm: 200, brand: '龙牌' },
        bathroom: { name: '仿古卫浴', pricePerSqm: 2500, brand: '箭牌' },
        kitchen: { name: '实木橱柜', pricePerMeter: 5000, brand: '金牌' }
      },
      european: {
        floor: { name: '大理石地砖', pricePerSqm: 400, brand: '马可波罗' },
        wall: { name: '艺术涂料', pricePerSqm: 150, brand: '立邦' },
        ceiling: { name: '欧式石膏线吊顶', pricePerSqm: 180, brand: '可耐福' },
        bathroom: { name: '豪华卫浴', pricePerSqm: 3000, brand: '科勒' },
        kitchen: { name: '欧式橱柜', pricePerMeter: 6000, brand: '博洛尼' }
      },
      minimalist: {
        floor: { name: '抛光砖', pricePerSqm: 120, brand: '东鹏' },
        wall: { name: '白色乳胶漆', pricePerSqm: 60, brand: '多乐士' },
        ceiling: { name: '平顶吊顶', pricePerSqm: 80, brand: '龙牌' },
        bathroom: { name: '简约卫浴', pricePerSqm: 1500, brand: '恒洁' },
        kitchen: { name: '简约橱柜', pricePerMeter: 2000, brand: '志邦' }
      },
      nordic: {
        floor: { name: '浅色实木地板', pricePerSqm: 280, brand: '安信' },
        wall: { name: '白色乳胶漆', pricePerSqm: 70, brand: '芬琳' },
        ceiling: { name: '平顶无吊顶', pricePerSqm: 50, brand: '龙牌' },
        bathroom: { name: '北欧风卫浴', pricePerSqm: 1800, brand: '杜拉维特' },
        kitchen: { name: '北欧风橱柜', pricePerMeter: 3500, brand: '宜家' }
      }
    };

    const styleKey = style.toLowerCase();
    const materials = materialCategories[styleKey] || materialCategories.modern;

    const materialList = [];
    let totalPrice = 0;

    materialList.push({
      category: '地板',
      name: materials.floor.name,
      brand: materials.floor.brand,
      quantity: area,
      unit: '㎡',
      unitPrice: materials.floor.pricePerSqm,
      totalPrice: area * materials.floor.pricePerSqm,
      description: `全屋地面铺装，面积约 ${area}㎡`
    });
    totalPrice += area * materials.floor.pricePerSqm;

    const wallArea = area * 2.5;
    materialList.push({
      category: '墙面',
      name: materials.wall.name,
      brand: materials.wall.brand,
      quantity: wallArea.toFixed(1),
      unit: '㎡',
      unitPrice: materials.wall.pricePerSqm,
      totalPrice: wallArea * materials.wall.pricePerSqm,
      description: `全屋墙面处理，面积约 ${wallArea.toFixed(1)}㎡`
    });
    totalPrice += wallArea * materials.wall.pricePerSqm;

    const ceilingArea = area * 0.8;
    materialList.push({
      category: '吊顶',
      name: materials.ceiling.name,
      brand: materials.ceiling.brand,
      quantity: ceilingArea.toFixed(1),
      unit: '㎡',
      unitPrice: materials.ceiling.pricePerSqm,
      totalPrice: ceilingArea * materials.ceiling.pricePerSqm,
      description: `客餐厅及过道吊顶，面积约 ${ceilingArea.toFixed(1)}㎡`
    });
    totalPrice += ceilingArea * materials.ceiling.pricePerSqm;

    const bathroomCount = layout?.includes('两卫') ? 2 : 1;
    const bathroomArea = 5 * bathroomCount;
    materialList.push({
      category: '卫浴',
      name: materials.bathroom.name,
      brand: materials.bathroom.brand,
      quantity: bathroomCount,
      unit: '套',
      unitPrice: materials.bathroom.pricePerSqm * 5,
      totalPrice: bathroomArea * materials.bathroom.pricePerSqm,
      description: `${bathroomCount}个卫生间整装，含洁具、瓷砖、吊顶`
    });
    totalPrice += bathroomArea * materials.bathroom.pricePerSqm;

    const kitchenLength = Math.max(3, Math.sqrt(area) * 0.5);
    materialList.push({
      category: '厨房',
      name: materials.kitchen.name,
      brand: materials.kitchen.brand,
      quantity: kitchenLength.toFixed(1),
      unit: '延米',
      unitPrice: materials.kitchen.pricePerMeter,
      totalPrice: kitchenLength * materials.kitchen.pricePerMeter,
      description: `L型橱柜，约 ${kitchenLength.toFixed(1)}延米，含地柜、吊柜、台面`
    });
    totalPrice += kitchenLength * materials.kitchen.pricePerMeter;

    materialList.push({
      category: '水电改造',
      name: '全屋水电改造',
      brand: '国标材料',
      quantity: area,
      unit: '㎡',
      unitPrice: 120,
      totalPrice: area * 120,
      description: '强电、弱电、给水、排水改造，含材料人工'
    });
    totalPrice += area * 120;

    materialList.push({
      category: '防水工程',
      name: '防水处理',
      brand: '东方雨虹',
      quantity: (bathroomArea + 8).toFixed(1),
      unit: '㎡',
      unitPrice: 80,
      totalPrice: (bathroomArea + 8) * 80,
      description: '卫生间、厨房、阳台防水处理'
    });
    totalPrice += (bathroomArea + 8) * 80;

    res.json({
      area,
      style,
      layout: layout || '默认户型',
      materialList,
      totalMaterialPrice: totalPrice,
      estimatedConstructionPrice: totalPrice * 0.6,
      estimatedTotalPrice: totalPrice * 1.6
    });
  } catch (error) {
    res.status(500).json({ message: '生成材料清单失败', error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderDetail,
  payOrder,
  cancelOrder,
  generateMaterialList
};
