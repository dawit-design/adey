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
router.get("/", getPlaces);
router.get("/:slug", getPlaceBySlug);

router.post("/", authMiddleware, createPlace);
router.put("/:id", authMiddleware, updatePlace);
router.delete("/:id", authMiddleware, deletePlace);

module.exports = router;