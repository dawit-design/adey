const fs = require("fs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "30d",
  });
};

const sanitizeUser = (user) => {
  if (!user) return null;

  const {
    password_hash,
    email_verification_token,
    email_verification_expires,
    password_reset_token,
    password_reset_expires,
    __v,
    ...clean
  } = user.toObject();

  return clean;
};

const findActiveUserById = async (id) => {
  return User.findOne({
    _id: id,
    account_status: { $ne: "deleted" },
  });
};

const cleanupLocalFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, full_name } = req.body;

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
      account_status: { $ne: "deleted" },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password_hash: password,
      full_name,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password_hash");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (user.account_status === "deleted") {
      return res.status(403).json({
        message: "This account has been deleted.",
      });
    }

    const token = generateToken(user._id);

    return res.json({
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await findActiveUserById(req.user.id);

    if (!user) {
      return res.status(401).json({
        message: "Account no longer exists",
      });
    }

    return res.json(sanitizeUser(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      account_status: { $ne: "deleted" },
    });

    return res.json(users.map(sanitizeUser));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await findActiveUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(sanitizeUser(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, full_name, phone_number } = req.body;

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
      account_status: { $ne: "deleted" },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password_hash: password,
      full_name,
      phone_number,
    });

    return res.status(201).json(sanitizeUser(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const allowed = [
      "full_name",
      "phone_number",
      "profile_photo",
      "date_of_birth",
      "gender",
      "nationality",
      "country_of_residence",
      "preferred_language",
      "preferred_currency",
      "timezone",
      "is_phone_verified",
      "account_status",
    ];

    const updates = {};

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await findActiveUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    Object.assign(user, updates);

    if (
      [
        "profile_photo",
        "date_of_birth",
        "gender",
        "nationality",
        "country_of_residence",
        "preferred_language",
        "preferred_currency",
        "timezone",
      ].some((field) => updates[field] !== undefined)
    ) {
      user.updateProfileCompletion();
    }

    await user.save();

    return res.json(sanitizeUser(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await findActiveUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.account_status = "deleted";
    user.deletedAt = new Date();

    await user.save();

    return res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await findActiveUserById(req.user.id);

    if (!user) {
      return res.status(401).json({
        message: "Account no longer exists",
      });
    }

    const profileFields = [
      "full_name",
      "phone_number",
      "profile_photo",
      "date_of_birth",
      "gender",
      "nationality",
      "country_of_residence",
      "preferred_language",
      "preferred_currency",
      "timezone",
    ];

    profileFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    user.updateProfileCompletion();

    await user.save();

    return res.json(sanitizeUser(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const user = await findActiveUserById(req.user.id);

    if (!user) {
      cleanupLocalFile(req.file.path);
      return res.status(401).json({
        message: "Account no longer exists",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profiles",
    });

    user.profile_photo = result.secure_url;
    user.updateProfileCompletion();
    await user.save();

    cleanupLocalFile(req.file.path);

    return res.json(sanitizeUser(user));
  } catch (error) {
    cleanupLocalFile(req.file?.path);
    return res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      return res.status(400).json({
        message: "Current and new passwords are required",
      });
    }

    const user = await User.findOne({
      _id: req.user.id,
      account_status: { $ne: "deleted" },
    }).select("+password_hash");

    if (!user || !(await user.matchPassword(current_password))) {
      return res.status(401).json({
        message: "Invalid current password",
      });
    }

    user.password_hash = new_password;

    await user.save();

    return res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const user = await findActiveUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found or already deleted",
      });
    }

    user.account_status = "deleted";
    user.deletedAt = new Date();

    await user.save();

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log("Delete account error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};