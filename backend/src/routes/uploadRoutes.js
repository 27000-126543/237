const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Upload routes' });
});

module.exports = router;
