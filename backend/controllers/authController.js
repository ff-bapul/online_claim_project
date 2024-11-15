const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user
const registerUser = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user with hashed password
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'user',  // Default role if not specified
      isActive: req.body.isActive !== undefined ? req.body.isActive : true  // Default to active
    });

    // Save user to DB
    await user.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(400).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists and passwords match
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      // Create JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

      // Send success response with token and user data
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive
        }
      });
    } else {
      // Invalid credentials
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: 'Error logging in user',
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};
