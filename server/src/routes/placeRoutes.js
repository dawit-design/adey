const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  dest: "uploads/",

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Only image files are allowed."));
    }

    callback(null, true);
  },
});

const {
  createPlace,
  getPlaces,
  getPlaceBySlug,
  updatePlace,
  deletePlace,
  uploadPlaceImage,
  backfillPlaceCoordinates,
  retryMissingPlaceCoordinates,
} = require("../controllers/placeController");

const authMiddleware = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminOnly");

/*
  Public place routes
*/
router.get("/", getPlaces);

/*
  Admin-only coordinate routes.

  These routes must remain above routes
  containing dynamic parameters.
*/
router.post(
  "/backfill-coordinates",
  authMiddleware,
  adminOnly,
  backfillPlaceCoordinates,
);

router.post(
  "/retry-missing-coordinates",
  authMiddleware,
  adminOnly,
  retryMissingPlaceCoordinates,
);

/*
  Admin-only image upload
*/
router.post(
  "/:id/upload-image",
  authMiddleware,
  adminOnly,
  upload.single("image"),
  uploadPlaceImage,
);

/*
  Public place details
*/
router.get("/:slug", getPlaceBySlug);

/*
  Admin-only place management
*/
router.post("/", authMiddleware, adminOnly, createPlace);

router.put("/:id", authMiddleware, adminOnly, updatePlace);

router.delete("/:id", authMiddleware, adminOnly, deletePlace);

module.exports = router;
