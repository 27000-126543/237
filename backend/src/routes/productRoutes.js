const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductDetail,
  getRelatedProducts
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductDetail);
router.get('/:id/related', getRelatedProducts);

module.exports = router;
