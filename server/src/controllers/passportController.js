const mongoose = require("mongoose");

const Passport = require("../models/Passport");
const PassportEntry = require("../models/PassportEntry");
const Place = require("../models/Place");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const cleanupLocalFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
const POPULATE_PLACE = {
  path: "place",
};

const getOrCreatePassport = async (userId) => {
  let passport = await Passport.findOne({
    user: userId,
  });

  if (!passport) {
    passport = await Passport.create({
      user: userId,
    });
  }

  return passport;
};

const validatePlace = async (placeId) => {
  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    return null;
  }

  return Place.findById(placeId);
};

/*
  Converts existing visitedPlaces and wantToVisitPlaces
  into PassportEntry records.

  This preserves data created before PassportEntry existed.
*/
const migrateExistingPassportData = async (
  userId,
  passport
) => {
  const visitedIds = passport.visitedPlaces.map((id) =>
    id.toString()
  );

  const wantedIds = passport.wantToVisitPlaces
    .map((id) => id.toString())
    .filter((id) => !visitedIds.includes(id));

  const operations = [];

  visitedIds.forEach((placeId) => {
    operations.push({
      updateOne: {
        filter: {
          user: userId,
          place: placeId,
        },
        update: {
          $setOnInsert: {
            user: userId,
            place: placeId,
            status: "visited",
            visitedAt: null,
          },
        },
        upsert: true,
      },
    });
  });

  wantedIds.forEach((placeId) => {
    operations.push({
      updateOne: {
        filter: {
          user: userId,
          place: placeId,
        },
        update: {
          $setOnInsert: {
            user: userId,
            place: placeId,
            status: "wantToVisit",
          },
        },
        upsert: true,
      },
    });
  });

  if (operations.length > 0) {
    await PassportEntry.bulkWrite(operations);
  }
};

const synchronizeOldPassport = async (
  userId,
  placeId,
  status
) => {
  const passport = await getOrCreatePassport(userId);

  passport.visitedPlaces =
    passport.visitedPlaces.filter(
      (id) => id.toString() !== placeId
    );

  passport.wantToVisitPlaces =
    passport.wantToVisitPlaces.filter(
      (id) => id.toString() !== placeId
    );

  if (status === "visited") {
    passport.visitedPlaces.push(placeId);
  }

  if (status === "wantToVisit") {
    passport.wantToVisitPlaces.push(placeId);
  }

  await passport.save();

  return passport;
};

const removeFromOldPassport = async (
  userId,
  placeId,
  status
) => {
  const passport = await getOrCreatePassport(userId);

  if (!status || status === "visited") {
    passport.visitedPlaces =
      passport.visitedPlaces.filter(
        (id) => id.toString() !== placeId
      );
  }

  if (!status || status === "wantToVisit") {
    passport.wantToVisitPlaces =
      passport.wantToVisitPlaces.filter(
        (id) => id.toString() !== placeId
      );
  }

  await passport.save();

  return passport;
};

/*
  Legacy Passport response.

  This keeps the current PassportScreen operational
  while we build the new visual experience.
*/
exports.getPassport = async (req, res) => {
  try {
    const passport = await getOrCreatePassport(
      req.user.id
    );

    await migrateExistingPassportData(
      req.user.id,
      passport
    );

    const populatedPassport = await Passport.findById(
      passport._id
    )
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(populatedPassport);
  } catch (error) {
    console.log("Get Passport error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  Get every Passport entry.

  Optional examples:
  /api/passport/entries?status=visited
  /api/passport/entries?status=wantToVisit
*/
exports.getPassportEntries = async (req, res) => {
  try {
    const passport = await getOrCreatePassport(
      req.user.id
    );

    await migrateExistingPassportData(
      req.user.id,
      passport
    );

    const filter = {
      user: req.user.id,
    };

    if (req.query.status) {
      if (
        !["visited", "wantToVisit"].includes(
          req.query.status
        )
      ) {
        return res.status(400).json({
          message: "Invalid Passport status.",
        });
      }

      filter.status = req.query.status;
    }

    const entries = await PassportEntry.find(filter)
      .populate(POPULATE_PLACE)
      .sort({
        visitedAt: -1,
        createdAt: -1,
      });

    res.status(200).json(entries);
  } catch (error) {
    console.log("Get Passport entries error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  Get one Passport entry.
*/
exports.getPassportEntry = async (req, res) => {
  try {
    const placeId = req.params.placeId;

    if (!mongoose.Types.ObjectId.isValid(placeId)) {
      return res.status(400).json({
        message: "Invalid place ID.",
      });
    }

    const entry = await PassportEntry.findOne({
      user: req.user.id,
      place: placeId,
    }).populate(POPULATE_PLACE);

    if (!entry) {
      return res.status(404).json({
        message: "Passport entry not found.",
      });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.log("Get Passport entry error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  Create or update a Passport entry.
*/
exports.savePassportEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const placeId = req.params.placeId;

    const place = await validatePlace(placeId);

    if (!place) {
      return res.status(404).json({
        message: "Place not found.",
      });
    }

    const {
      status,
      visitedAt,
      coverPhoto,
      photos,
      memory,
      isPublic,
    } = req.body;

    if (
      !["visited", "wantToVisit"].includes(status)
    ) {
      return res.status(400).json({
        message:
          "Status must be visited or wantToVisit.",
      });
    }

    if (photos && !Array.isArray(photos)) {
      return res.status(400).json({
        message: "Photos must be an array.",
      });
    }

    if (photos && photos.length > 5) {
      return res.status(400).json({
        message:
          "You can upload a maximum of 5 additional photos.",
      });
    }

    const updateData = {
      status,
      visitedAt:
        status === "visited"
          ? visitedAt || new Date()
          : null,
      memory: memory || "",
      isPublic:
        typeof isPublic === "boolean"
          ? isPublic
          : true,
    };

    if (coverPhoto !== undefined) {
      updateData.coverPhoto = coverPhoto;
    }

    if (photos !== undefined) {
      updateData.photos = photos;
    }

    const entry = await PassportEntry.findOneAndUpdate(
      {
        user: userId,
        place: placeId,
      },
      {
        $set: updateData,
        $setOnInsert: {
          user: userId,
          place: placeId,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    ).populate(POPULATE_PLACE);

    await synchronizeOldPassport(
      userId,
      placeId,
      status
    );

    res.status(200).json(entry);
  } catch (error) {
    console.log("Save Passport entry error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "A Passport entry already exists for this destination.",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  Delete an entry completely.
*/
exports.deletePassportEntry = async (req, res) => {
  try {
    const placeId = req.params.placeId;

    if (!mongoose.Types.ObjectId.isValid(placeId)) {
      return res.status(400).json({
        message: "Invalid place ID.",
      });
    }

    const entry =
      await PassportEntry.findOneAndDelete({
        user: req.user.id,
        place: placeId,
      });

    if (!entry) {
      return res.status(404).json({
        message: "Passport entry not found.",
      });
    }

    await removeFromOldPassport(
      req.user.id,
      placeId
    );

    res.status(200).json({
      message: "Passport entry removed.",
    });
  } catch (error) {
    console.log("Delete Passport entry error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  Legacy endpoint: mark a place as visited.
*/
exports.addVisitedPlace = async (req, res) => {
  try {
    const userId = req.user.id;
    const placeId = req.params.placeId;

    const place = await validatePlace(placeId);

    if (!place) {
      return res.status(404).json({
        message: "Place not found.",
      });
    }

    await PassportEntry.findOneAndUpdate(
      {
        user: userId,
        place: placeId,
      },
      {
        $set: {
          status: "visited",
          visitedAt: new Date(),
        },
        $setOnInsert: {
          user: userId,
          place: placeId,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    const passport = await synchronizeOldPassport(
      userId,
      placeId,
      "visited"
    );

    const populatedPassport = await Passport.findById(
      passport._id
    )
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(populatedPassport);
  } catch (error) {
    console.log("Add visited place error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  Legacy endpoint: remove a visited place.
*/
exports.removeVisitedPlace = async (req, res) => {
  try {
    const placeId = req.params.placeId;

    await PassportEntry.findOneAndDelete({
      user: req.user.id,
      place: placeId,
      status: "visited",
    });

    const passport = await removeFromOldPassport(
      req.user.id,
      placeId,
      "visited"
    );

    const populatedPassport = await Passport.findById(
      passport._id
    )
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(populatedPassport);
  } catch (error) {
    console.log("Remove visited place error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  Legacy endpoint: add a place to the wish list.
*/
exports.addWantToVisitPlace = async (req, res) => {
  try {
    const userId = req.user.id;
    const placeId = req.params.placeId;

    const place = await validatePlace(placeId);

    if (!place) {
      return res.status(404).json({
        message: "Place not found.",
      });
    }

    await PassportEntry.findOneAndUpdate(
      {
        user: userId,
        place: placeId,
      },
      {
        $set: {
          status: "wantToVisit",
          visitedAt: null,
        },
        $setOnInsert: {
          user: userId,
          place: placeId,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    const passport = await synchronizeOldPassport(
      userId,
      placeId,
      "wantToVisit"
    );

    const populatedPassport = await Passport.findById(
      passport._id
    )
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(populatedPassport);
  } catch (error) {
    console.log(
      "Add want-to-visit place error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  Legacy endpoint: remove a wish-list place.
*/
exports.removeWantToVisitPlace = async (
  req,
  res
) => {
  try {
    const placeId = req.params.placeId;

    await PassportEntry.findOneAndDelete({
      user: req.user.id,
      place: placeId,
      status: "wantToVisit",
    });

    const passport = await removeFromOldPassport(
      req.user.id,
      placeId,
      "wantToVisit"
    );

    const populatedPassport = await Passport.findById(
      passport._id
    )
      .populate("visitedPlaces")
      .populate("wantToVisitPlaces");

    res.status(200).json(populatedPassport);
  } catch (error) {
    console.log(
      "Remove want-to-visit place error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  Passport statistics.
*/
exports.getPassportStats = async (req, res) => {
  try {
    const passport = await getOrCreatePassport(
      req.user.id
    );

    await migrateExistingPassportData(
      req.user.id,
      passport
    );

    const [visitedCount, wantToVisitCount] =
      await Promise.all([
        PassportEntry.countDocuments({
          user: req.user.id,
          status: "visited",
        }),

        PassportEntry.countDocuments({
          user: req.user.id,
          status: "wantToVisit",
        }),
      ]);

    res.status(200).json({
      visitedCount,
      wantToVisitCount,
      totalTracked:
        visitedCount + wantToVisitCount,
    });
  } catch (error) {
    console.log("Get Passport stats error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.uploadPassportImage = async (req, res) => {
  try {
    const { placeId } = req.params;
    const { imageType } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "No image was uploaded.",
      });
    }

    if (!["cover", "gallery"].includes(imageType)) {
      cleanupLocalFile(req.file.path);

      return res.status(400).json({
        message: "Image type must be cover or gallery.",
      });
    }

    const entry = await PassportEntry.findOne({
      user: req.user.id,
      place: placeId,
    });

    if (!entry) {
      cleanupLocalFile(req.file.path);

      return res.status(404).json({
        message:
          "Create the Passport entry before uploading photos.",
      });
    }

    if (
      imageType === "gallery" &&
      entry.photos.length >= 5
    ) {
      cleanupLocalFile(req.file.path);

      return res.status(400).json({
        message:
          "You can upload a maximum of 5 additional photos.",
      });
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `adey/passports/${req.user.id}`,
        resource_type: "image",

        transformation: [
          {
            width: 1600,
            height: 1600,
            crop: "limit",
            quality: "auto:good",
            fetch_format: "auto",
          },
        ],
      }
    );

    cleanupLocalFile(req.file.path);

    const uploadedPhoto = {
      url: result.secure_url,
      publicId: result.public_id,
    };

    if (imageType === "cover") {
      const previousPublicId =
        entry.coverPhoto?.publicId;

      entry.coverPhoto = uploadedPhoto;

      await entry.save();

      if (previousPublicId) {
        await cloudinary.uploader
          .destroy(previousPublicId)
          .catch((error) => {
            console.log(
              "Previous cover deletion failed:",
              error.message
            );
          });
      }
    }

    if (imageType === "gallery") {
      entry.photos.push({
        ...uploadedPhoto,
        caption: "",
      });

      await entry.save();
    }

    const updatedEntry = await PassportEntry.findById(
      entry._id
    ).populate("place");

    return res.status(200).json(updatedEntry);
  } catch (error) {
    cleanupLocalFile(req.file?.path);

    console.log(
      "Upload Passport image error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deletePassportCover = async (req, res) => {
  try {
    const entry = await PassportEntry.findOne({
      user: req.user.id,
      place: req.params.placeId,
    });

    if (!entry) {
      return res.status(404).json({
        message: "Passport entry not found.",
      });
    }

    const publicId = entry.coverPhoto?.publicId;

    entry.coverPhoto = {
      url: "",
      publicId: null,
    };

    await entry.save();

    if (publicId) {
      await cloudinary.uploader
        .destroy(publicId)
        .catch((error) => {
          console.log(
            "Cloudinary cover deletion failed:",
            error.message
          );
        });
    }

    const updatedEntry = await PassportEntry.findById(
      entry._id
    ).populate("place");

    return res.status(200).json(updatedEntry);
  } catch (error) {
    console.log(
      "Delete Passport cover error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deletePassportPhoto = async (req, res) => {
  try {
    const { placeId, photoId } = req.params;

    const entry = await PassportEntry.findOne({
      user: req.user.id,
      place: placeId,
    });

    if (!entry) {
      return res.status(404).json({
        message: "Passport entry not found.",
      });
    }

    const photo = entry.photos.id(photoId);

    if (!photo) {
      return res.status(404).json({
        message: "Photo not found.",
      });
    }

    const publicId = photo.publicId;

    entry.photos.pull(photoId);

    await entry.save();

    if (publicId) {
      await cloudinary.uploader
        .destroy(publicId)
        .catch((error) => {
          console.log(
            "Cloudinary photo deletion failed:",
            error.message
          );
        });
    }

    const updatedEntry = await PassportEntry.findById(
      entry._id
    ).populate("place");

    return res.status(200).json(updatedEntry);
  } catch (error) {
    console.log(
      "Delete Passport photo error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};