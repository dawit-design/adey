const express = require("express");
const multer = require("multer");

const router = express.Router();

const passportImageUpload = multer({
  dest: "uploads/",

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(
        new Error("Only image files are allowed.")
      );
    }

    callback(null, true);
  },
});

const {
  getPassport,
  getPassportEntries,
  getPassportEntry,
  savePassportEntry,
  deletePassportEntry,

  uploadPassportImage,
  deletePassportCover,
  deletePassportPhoto,

  addVisitedPlace,
  removeVisitedPlace,
  addWantToVisitPlace,
  removeWantToVisitPlace,
  getPassportStats,
} = require("../controllers/passportController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

router.get("/", authMiddleware, getPassport);

router.get(
  "/stats",
  authMiddleware,
  getPassportStats
);

router.get(
  "/entries",
  authMiddleware,
  getPassportEntries
);

router.get(
  "/entries/:placeId",
  authMiddleware,
  getPassportEntry
);

router.put(
  "/entries/:placeId",
  authMiddleware,
  savePassportEntry
);

router.delete(
  "/entries/:placeId",
  authMiddleware,
  deletePassportEntry
);

router.post(
  "/entries/:placeId/images",
  authMiddleware,
  passportImageUpload.single("image"),
  uploadPassportImage
);

router.delete(
  "/entries/:placeId/images/cover",
  authMiddleware,
  deletePassportCover
);

router.delete(
  "/entries/:placeId/images/:photoId",
  authMiddleware,
  deletePassportPhoto
);

/*
  Temporary legacy routes.
*/
router.post(
  "/visited/:placeId",
  authMiddleware,
  addVisitedPlace
);

router.delete(
  "/visited/:placeId",
  authMiddleware,
  removeVisitedPlace
);

router.post(
  "/want-to-visit/:placeId",
  authMiddleware,
  addWantToVisitPlace
);

router.delete(
  "/want-to-visit/:placeId",
  authMiddleware,
  removeWantToVisitPlace
);

module.exports = router;