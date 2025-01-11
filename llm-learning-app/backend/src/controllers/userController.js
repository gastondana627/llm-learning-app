const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// User Registration
const register = async (req, res) => {
try {
    const {userName, email, password, role} = req.body;

    //Check if the email is already in use
    const existingUser = await User.findOne({email});

    if(existingUser) {
        return res.status(400).json({message: "User with this email already exists"})
    }
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = new User({userName, email, password: hashedPassword, role})
  await newUser.save();

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
  res.status(201).json({message: 'User registered successfully!', token, user: {id: newUser._id, userName, email, role}});
} catch (error) {
  res.status(500).json({ message: 'Error registering user', error: error.message });
}
};
// User Login
const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
      res.json({ message: 'Logged in successfully!', token, user: {id: user._id, userName: user.userName, email: user.email, role: user.role}});

    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };

const getMe = async (req, res) => {
try{
  const user = await User.findById(req.user.id)
  res.status(200).json(user);
} catch(error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
}

}
module.exports = { register, login, getMe };