const express = require("express");
const router = express.Router();

const {
  savePlace,
  unsavePlace,
  getSavedPlaces,
  getSavedPlaceIds,
} = require("../controllers/savedController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/ids", authMiddleware, getSavedPlaceIds);
router.get("/", authMiddleware, getSavedPlaces);

router.post("/:placeId", authMiddleware, savePlace);
router.delete("/:placeId", authMiddleware, unsavePlace);

module.exports = router;