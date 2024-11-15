// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token!' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authenticateJWT;
