const User = require('../models/User');
const bcrypt = require('bcryptjs');

// User signup
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12); // Hashing the password before storing it
    const newUser = new User({
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'User created!', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Creating user failed.' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'Auth failed. User not found.' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Auth failed. Wrong password.' });
    }
    res.status(200).json({ message: 'Logged in!', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Login failed.' });
  }
};
