const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      brand, 
      minPrice, 
      maxPrice,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
    if (minPrice !== undefined && minPrice !== null) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }
    if (maxPrice !== undefined && maxPrice !== null) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    const sortOptions = {};
    sortOptions[sort] = order === 'asc' ? 1 : -1;

    const products = await Product.find(query)
      .select('name brand category price originalPrice images rating reviewCount sales tags')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort(sortOptions);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取商品列表失败', error: error.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: '商品不存在' });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取商品详情失败', error: error.message });
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 6 } = req.query;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: '商品不存在' });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: id },
      $or: [
        { category: product.category },
        { brand: product.brand },
        { tags: { $in: product.tags || [] } }
      ]
    })
      .select('name brand category price originalPrice images rating reviewCount sales')
      .limit(Number(limit))
      .sort({ sales: -1, rating: -1 });

    res.json({
      success: true,
      products: relatedProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取相关商品失败', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductDetail,
  getRelatedProducts
};
