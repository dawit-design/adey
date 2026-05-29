const Trip = require("../models/Trip");
const Place = require("../models/Place");

const findUserTripById = async (tripId, userId) => {
  return Trip.findOne({
    _id: tripId,
    user: userId,
  }).populate("places.place");
};

exports.createTrip = async (req, res) => {
  try {
    const { title, description, coverImage } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Trip title is required",
      });
    }

    const trip = await Trip.create({
      user: req.user.id,
      title,
      description,
      coverImage,
    });

    return res.status(201).json(trip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id })
      .populate("places.place")
      .sort({ createdAt: -1 });

    return res.json(trips);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await findUserTripById(req.params.id, req.user.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    return res.json(trip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const allowed = ["title", "description", "coverImage", "status"];
    const updates = {};

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).populate("places.place");

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    return res.json(trip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    return res.json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addPlaceToTrip = async (req, res) => {
  try {
    const { placeId, note } = req.body;

    if (!placeId) {
      return res.status(400).json({
        message: "Place ID is required",
      });
    }

    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({
        message: "Place not found",
      });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const alreadyAdded = trip.places.some(
      (item) => item.place.toString() === placeId
    );

    if (alreadyAdded) {
      return res.status(400).json({
        message: "Place already added to this trip",
      });
    }

    trip.places.push({
      place: placeId,
      note,
    });

    if (!trip.coverImage && place.coverImage) {
      trip.coverImage = place.coverImage;
    }

    await trip.save();

    const updatedTrip = await findUserTripById(trip._id, req.user.id);

    return res.status(200).json(updatedTrip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.removePlaceFromTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    trip.places = trip.places.filter(
      (item) => item.place.toString() !== req.params.placeId
    );

    await trip.save();

    const updatedTrip = await findUserTripById(trip._id, req.user.id);

    return res.json(updatedTrip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};