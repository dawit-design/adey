const express = require("express");
const router = express.Router();

const {
  getPassport,
  addVisitedPlace,
  removeVisitedPlace,
  addWantToVisitPlace,
  removeWantToVisitPlace,
  getPassportStats,
} = require("../controllers/passportController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getPassport);

router.get("/stats", authMiddleware, getPassportStats);

router.post("/visited/:placeId", authMiddleware, addVisitedPlace);
router.delete("/visited/:placeId", authMiddleware, removeVisitedPlace);

router.post("/want-to-visit/:placeId", authMiddleware, addWantToVisitPlace);
router.delete("/want-to-visit/:placeId", authMiddleware, removeWantToVisitPlace);

module.exports = router;