const SavedPlace = require("../models/Saved");
const Place = require("../models/Place");

// @desc    Save a place
// @route   POST /api/saved/:placeId
// @access  Private
exports.savePlace = async (req, res) => {
  try {
    const { placeId } = req.params;

    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    const alreadySaved = await SavedPlace.findOne({
      user: req.user.id,
      place: placeId,
    });

    if (alreadySaved) {
      return res.status(200).json({
        message: "Place already saved",
        saved: alreadySaved,
      });
    }

    const savedPlace = await SavedPlace.create({
      user: req.user.id,
      place: placeId,
    });

    res.status(201).json({
      message: "Place saved successfully",
      saved: savedPlace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Unsave a place
// @route   DELETE /api/saved/:placeId
// @access  Private
exports.unsavePlace = async (req, res) => {
  try {
    const { placeId } = req.params;

    const savedPlace = await SavedPlace.findOneAndDelete({
      user: req.user.id,
      place: placeId,
    });

    if (!savedPlace) {
      return res.status(404).json({ message: "Saved place not found" });
    }

    res.status(200).json({
      message: "Place removed from saved list",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get saved places for logged-in user
// @route   GET /api/saved
// @access  Private
exports.getSavedPlaces = async (req, res) => {
  try {
    const savedPlaces = await SavedPlace.find({
      user: req.user.id,
    })
      .populate("place")
      .sort({ createdAt: -1 });

    const places = savedPlaces
      .map((saved) => saved.place)
      .filter((place) => place && place.status === "published");

    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get only saved place IDs for logged-in user
// @route   GET /api/saved/ids
// @access  Private
exports.getSavedPlaceIds = async (req, res) => {
  try {
    const savedPlaces = await SavedPlace.find({
      user: req.user.id,
    }).select("place");

    const savedPlaceIds = savedPlaces.map((saved) =>
      saved.place.toString()
    );

    res.status(200).json(savedPlaceIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};