import express from 'express';
import bcrypt from 'bcryptjs';
import Score from '../models/Score.js';
import User from '../models/User.js';

const router = express.Router();

// Score Route: POST /api/submit-score
router.post('/submit', async (req, res) => {
  const { teamName, score } = req.body;

  if (!teamName || score === undefined) {
    return res.status(400).json({ message: 'Team Name and Score are required' });
  }

  try {
    const newScore = new Score({ teamName, score });
    await newScore.save();
    res.status(201).json({ message: 'Score submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leaderboard Route: GET /api/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Score.find({}).sort({ score: -1 }); // Sort by score in descending order
    res.json(leaderboard); // Send the leaderboard as JSON
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard data' });
  }
});

// Signup API
router.post('/signup', async (req, res) => {
  try {
    const { teamName, firstMember, secondMember, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new User({
      teamName,
      firstMember,
      secondMember,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login API
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Success
    res.status(200).json({ 
      message: 'Login successful', 
      teamName: user.teamName
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
