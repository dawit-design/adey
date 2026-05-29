const express = require("express");
const {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  addPlaceToTrip,
  removePlaceFromTrip,
} = require("../controllers/tripController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTrip);
router.get("/", authMiddleware, getMyTrips);
router.get("/:id", authMiddleware, getTripById);
router.put("/:id", authMiddleware, updateTrip);
router.delete("/:id", authMiddleware, deleteTrip);

router.post("/:id/places", authMiddleware, addPlaceToTrip);
router.delete("/:id/places/:placeId", authMiddleware, removePlaceFromTrip);

module.exports = router;