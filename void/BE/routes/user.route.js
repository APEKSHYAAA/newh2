import express from 'express';
import User from '../models/user.model.js'; // Ensure the correct import path

const router = express.Router();

// POST /api/users - User registration route
router.post('/', async (req, res) => {
  const { fullName, email, password, userType } = req.body;

  try {
    const newUser = new User({
      name: fullName,
      email,
      password, // TODO: hash password
      userType,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/users/login - User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // If successful, return a response with user info (you can also add a JWT token here)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;