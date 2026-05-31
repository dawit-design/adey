const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret",
    );
    const user = await User.findById(decoded.id);

    if (!user || user.account_status !== "active") {
  return res.status(401).json({ message: "Unauthorized: invalid user" });
}

    req.user = {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
};

module.exports = authMiddleware;
