const express = require('express');
const router = express.Router();
const {
  uploadSingleImage,
  uploadMultipleImages,
  deleteFile
} = require('../controllers/uploadController');

router.post('/image', uploadSingleImage);
router.post('/images', uploadMultipleImages);
router.delete('/file', deleteFile);

module.exports = router;
