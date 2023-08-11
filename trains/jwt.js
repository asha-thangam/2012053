const jwt = require('jsonwebtoken');
const { secretKey } = require('./config'); 
console.log(secretKey);
const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
module.exports = { generateToken, verifyToken };
