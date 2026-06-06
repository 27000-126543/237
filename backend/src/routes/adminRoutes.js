const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const {
  getDashboardStats,
  getTrendData,
  getRankings,
  getAnalytics,
  getPredictions,
  getConstructionMonitor
} = require('../controllers/adminController');

router.use(authMiddleware, adminMiddleware);

router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/trend', getTrendData);
router.get('/dashboard/rankings', getRankings);
router.get('/analytics', getAnalytics);
router.get('/predictions', getPredictions);
router.get('/construction/monitor', getConstructionMonitor);

module.exports = router;
