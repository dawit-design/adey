const express = require("express");
const router = express.Router();

const {
  createPlace,
  getPlaces,
  getPlaceBySlug,
  updatePlace,
  deletePlace,
} = require("../controllers/placeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
router.get("/", getPlaces);
router.get("/:slug", getPlaceBySlug);

router.post("/", authMiddleware, adminOnly, createPlace);
router.put("/:id", authMiddleware, adminOnly, updatePlace);
router.delete("/:id", authMiddleware, adminOnly, deletePlace);

module.exports = router;