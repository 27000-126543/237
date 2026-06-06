const express = require('express');
const { body } = require('express-validator');
const { register, login, getCurrentUser, updateProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('姓名不能为空'),
    body('phone').isMobilePhone('zh-CN').withMessage('请输入有效的手机号码'),
    body('password').isLength({ min: 6 }).withMessage('密码长度至少6位'),
    body('role').optional().isIn(['owner', 'designer', 'constructor']).withMessage('无效的用户角色')
  ],
  register
);

router.post(
  '/login',
  [
    body('phone').isMobilePhone('zh-CN').withMessage('请输入有效的手机号码'),
    body('password').notEmpty().withMessage('密码不能为空')
  ],
  login
);

router.get('/me', authMiddleware, getCurrentUser);

router.put(
  '/profile',
  authMiddleware,
  [
    body('name').optional().notEmpty().withMessage('姓名不能为空'),
    body('email').optional().isEmail().withMessage('请输入有效的邮箱地址')
  ],
  updateProfile
);

module.exports = router;
