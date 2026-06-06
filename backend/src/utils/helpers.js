const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const generateOrderNo = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ZJ${timestamp}${random}`.toUpperCase();
};

const calculateMatchScore = (designer, preferences) => {
  let score = 0;
  const styleMatch = designer.styles.some(s => 
    preferences.styles.includes(s)
  );
  if (styleMatch) score += 40;

  const budgetMatch = preferences.budget >= designer.priceRange.min && 
                      preferences.budget <= designer.priceRange.max;
  if (budgetMatch) score += 30;

  score += (designer.rating / 5) * 20;
  score += Math.min(designer.orderCount / 100 * 10, 10);

  return Math.round(score);
};

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
  generateOrderNo,
  calculateMatchScore
};
