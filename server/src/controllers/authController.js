const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "30d",
  });
};

exports.loginUser = async (req, res) => {
  // verify email/password ...
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password_hash");
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);
  return res.json({
    token,
    user: sanitizeUser(user),
  });
};