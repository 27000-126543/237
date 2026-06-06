const express = require('express');
const router = express.Router();
const {
  getDesigners,
  getDesignerDetail,
  matchDesigners,
  getDesignerReviews
} = require('../controllers/designerController');

router.get('/', getDesigners);
router.get('/:id', getDesignerDetail);
router.post('/match', matchDesigners);
router.get('/:id/reviews', getDesignerReviews);

module.exports = router;
