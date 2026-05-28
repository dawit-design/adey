const Passport = require("../models/Passport");

const getOrCreatePassport = async (userId) => {
  let passport = await Passport.findOne({ user: userId });

  if (!passport) {
    passport = await Passport.create({
      user: userId,
    });
  }

  return passport;
};

exports.getPassport = async (req, res) => {
  try {
    const passport = await getOrCreatePassport(req.user.id);

    const populatedPassport = await Passport.findById(passport._id)
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(populatedPassport);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addVisitedPlace = async (req, res) => {
  try {
    const passport = await getOrCreatePassport(req.user.id);

    const placeId = req.params.placeId;

    if (!passport.visitedPlaces.includes(placeId)) {
      passport.visitedPlaces.push(placeId);
    }

    passport.wantToVisitPlaces =
      passport.wantToVisitPlaces.filter(
        (id) => id.toString() !== placeId
      );

    await passport.save();

    const updatedPassport = await Passport.findById(passport._id)
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(updatedPassport);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.removeVisitedPlace = async (req, res) => {
  try {
    const passport = await getOrCreatePassport(req.user.id);

    const placeId = req.params.placeId;

    passport.visitedPlaces =
      passport.visitedPlaces.filter(
        (id) => id.toString() !== placeId
      );

    await passport.save();

    const updatedPassport = await Passport.findById(passport._id)
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(updatedPassport);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addWantToVisitPlace = async (req, res) => {
  try {
    const passport = await getOrCreatePassport(req.user.id);

    const placeId = req.params.placeId;

    if (!passport.wantToVisitPlaces.includes(placeId)) {
      passport.wantToVisitPlaces.push(placeId);
    }

    await passport.save();

    const updatedPassport = await Passport.findById(passport._id)
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(updatedPassport);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.removeWantToVisitPlace = async (req, res) => {
  try {
    const passport = await getOrCreatePassport(req.user.id);

    const placeId = req.params.placeId;

    passport.wantToVisitPlaces =
      passport.wantToVisitPlaces.filter(
        (id) => id.toString() !== placeId
      );

    await passport.save();

    const updatedPassport = await Passport.findById(passport._id)
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(updatedPassport);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPassportStats = async (req, res) => {
  try {
    const passport = await getOrCreatePassport(req.user.id);

    res.status(200).json({
      visitedCount: passport.visitedPlaces.length,
      wantToVisitCount: passport.wantToVisitPlaces.length,
      totalTracked:
        passport.visitedPlaces.length +
        passport.wantToVisitPlaces.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};