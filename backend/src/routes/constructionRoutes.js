const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
  createConstruction,
  getConstructionList,
  getConstructionDetail,
  placeBid,
  selectConstructor,
  signContract,
  updateProgress,
  uploadPhoto,
  submitReport,
  submitAcceptance,
  confirmAcceptance
} = require('../controllers/constructionController');

router.post('/', authMiddleware, createConstruction);
router.get('/', authMiddleware, getConstructionList);
router.get('/:id', authMiddleware, getConstructionDetail);
router.post('/:id/bid', authMiddleware, placeBid);
router.post('/:id/select-constructor', authMiddleware, selectConstructor);
router.post('/:id/sign-contract', authMiddleware, signContract);
router.post('/:id/progress', authMiddleware, updateProgress);
router.post('/:id/photos', authMiddleware, uploadPhoto);
router.post('/:id/reports', authMiddleware, submitReport);
router.post('/:id/submit-acceptance', authMiddleware, submitAcceptance);
router.post('/:id/confirm-acceptance', authMiddleware, confirmAcceptance);

module.exports = router;
