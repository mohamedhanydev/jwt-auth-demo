const User = require("../models/User");
const { hashPassword, comparePassword } = require("../services/hash");
const { generateToken, verifyToken } = require("../services/jwt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist)
      return res.status(400).json({ message: "User already exists!" });
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "invalid email or password" });
    const checkPass = await comparePassword(password, user.password);
    if (!checkPass)
      return res.status(400).json({ message: "invalid email or password" });
    const token = generateToken({ id: user._id, email });
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const profile = (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
};

module.exports = { login, register, profile };
