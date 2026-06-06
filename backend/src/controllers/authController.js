const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, password, role, city, profile, designerProfile, constructorProfile } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: '该手机号已被注册' });
    }

    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: '该邮箱已被注册' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      phone,
      email,
      password: hashedPassword,
      role: role || 'owner',
      city: city || '北京',
      profile: profile || {}
    };

    if (role === 'designer' && designerProfile) {
      userData.designerProfile = {
        title: designerProfile.title || '',
        styles: designerProfile.styles || [],
        priceRange: designerProfile.priceRange || { min: 0, max: 0 },
        description: designerProfile.description || '',
        certifications: designerProfile.certifications || [],
        experience: designerProfile.experience || 0
      };
    }

    if (role === 'constructor' && constructorProfile) {
      userData.constructorProfile = {
        companyName: constructorProfile.companyName || '',
        leaderName: constructorProfile.leaderName || name,
        license: constructorProfile.license || '',
        insurance: constructorProfile.insurance || ''
      };
    }

    const user = new User(userData);
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        city: user.city
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: '手机号或密码错误' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '手机号或密码错误' });
    }

    const token = generateToken(user);

    res.json({
      message: '登录成功',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        city: user.city
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json({ user });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, city, avatar, profile, designerProfile, constructorProfile } = req.body;
    const userId = req.user.id;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (city !== undefined) updateData.city = city;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (profile !== undefined) updateData.profile = { ...profile };

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    if (user.role === 'designer' && designerProfile) {
      updateData.designerProfile = {
        ...user.designerProfile,
        ...designerProfile
      };
    }

    if (user.role === 'constructor' && constructorProfile) {
      updateData.constructorProfile = {
        ...user.constructorProfile,
        ...constructorProfile
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: '资料更新成功',
      user: updatedUser
    });
  } catch (error) {
    console.error('更新资料错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  updateProfile
};
