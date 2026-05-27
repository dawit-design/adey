const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  updateProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authMiddleware, getCurrentUser);
router.put("/update-profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);

// CRUD
router.get("/users", authMiddleware, getAllUsers);
router.post("/users", authMiddleware, createUser);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUserById);
router.delete("/users/:id", authMiddleware, deleteUserById);

module.exports = router;