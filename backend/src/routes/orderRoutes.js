const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrderDetail,
  payOrder,
  cancelOrder,
  generateMaterialList
} = require('../controllers/orderController');

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderDetail);
router.post('/:id/pay', authMiddleware, payOrder);
router.post('/:id/cancel', authMiddleware, cancelOrder);
router.post('/material-list', authMiddleware, generateMaterialList);

module.exports = router;
