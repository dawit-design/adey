const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  createPlace,
  getPlaces,
  getPlaceBySlug,
  updatePlace,
  deletePlace,
  uploadPlaceImage,
} = require("../controllers/placeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
router.get("/", getPlaces);
router.post(
  "/:id/upload-image",
  authMiddleware,
  adminOnly,
  upload.single("image"),
  uploadPlaceImage
);
router.get("/:slug", getPlaceBySlug);

router.post("/", authMiddleware, adminOnly, createPlace);
router.put("/:id", authMiddleware, adminOnly, updatePlace);
router.delete("/:id", authMiddleware, adminOnly, deletePlace);

module.exports = router;