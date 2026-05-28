const express = require("express");
const router = express.Router();

const {
  createCollection,
  getCollections,
  getCollectionBySlug,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");

const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

router.get("/", getCollections);
router.get("/:slug", getCollectionBySlug);

router.post("/", authMiddleware, adminOnly, createCollection);
router.put("/:id", authMiddleware, adminOnly, updateCollection);
router.delete("/:id", authMiddleware, adminOnly, deleteCollection);

module.exports = router;