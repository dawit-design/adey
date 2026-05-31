const fs = require("fs");
const Place = require("../models/Place");
const slugify = require("../utils/slugify");
const cloudinary = require("../config/cloudinary");

const allowedPlaceFields = [
  "name",
  "slug",
  "country",
  "type",
  "category",
  "region",
  "city",
  "area",
  "shortDescription",
  "story",
  "highlights",
  "activities",
  "amenities",
  "tags",
  "localTips",
  "travelWarnings",
  "bestForPhotography",
  "bestForFamilies",
  "hiddenGemScore",
  "difficultyLevel",
  "bestTimeToVisit",
  "seasonality",
  "idealFor",
  "estimatedVisitDuration",
  "priceRange",
  "location",
  "distanceFromAddisKm",
  "travelTimeFromAddisHours",
  "recommendedTransport",
  "roadCondition",
  "nearestAirport",
  "nearestTown",
  "googleMapsUrl",
  "isWeekendTrip",
  "weekendTripLevel",
  "experienceScores",
  "collections",
  "coverImage",
  "images",
  "nearbyPlaces",
  "featured",
  "featuredOrder",
  "isNewOrGrowing",
  "isCurated",
  "tourismPriority",
  "sourceLinks",
  "lastVerifiedAt",
  "popularityScore",
  "ethiopiaScore",
  "scoreReason",
  "rating",
  "apiVisibility",
  "status",
];

const pickPlaceFields = (body) => {
  const data = {};

  allowedPlaceFields.forEach((field) => {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }
  });

  return data;
};

const cleanupLocalFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

exports.createPlace = async (req, res) => {
  try {
    const data = pickPlaceFields(req.body);

    if (!data.name) {
      return res.status(400).json({ message: "Place name is required" });
    }

    data.slug = data.slug || slugify(data.name);

    const place = await Place.create(data);

    return res.status(201).json(place);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const {
      type,
      category,
      region,
      featured,
      q,
      categories,
      types,
      tags,
      priceRanges,
      tourismPriority,
    } = req.query;

    const filter = { status: "published" };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (region) filter.region = new RegExp(region, "i");
    if (featured) filter.featured = featured === "true";
    if (tourismPriority) filter.tourismPriority = tourismPriority;

    if (categories) {
      filter.category = {
        $in: categories.split(","),
      };
    }

    if (types) {
      filter.type = {
        $in: types.split(","),
      };
    }

    if (tags) {
      filter.tags = {
        $in: tags.split(","),
      };
    }

    if (priceRanges) {
      filter.priceRange = {
        $in: priceRanges.split(","),
      };
    }

    if (q) {
      filter.$text = { $search: q };
    }

    const places = await Place.find(filter).sort({
      featured: -1,
      popularityScore: -1,
      createdAt: -1,
    });

    return res.status(200).json(places);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getPlaceBySlug = async (req, res) => {
  try {
    const place = await Place.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    return res.status(200).json(place);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const data = pickPlaceFields(req.body);

    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    const place = await Place.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    return res.status(200).json(place);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      { status: "draft" },
      { new: true }
    );

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    return res.status(200).json({
      message: "Place unpublished successfully",
      place,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.uploadPlaceImage = async (req, res) => {
  try {
    const { imageType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const place = await Place.findById(req.params.id);

    if (!place) {
      cleanupLocalFile(req.file.path);
      return res.status(404).json({ message: "Place not found" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "places",
    });

    if (imageType === "cover") {
      place.coverImage = result.secure_url;
    } else {
      place.images.push(result.secure_url);
    }

    await place.save();

    cleanupLocalFile(req.file.path);

    return res.status(200).json(place);
  } catch (error) {
    cleanupLocalFile(req.file?.path);

    return res.status(500).json({ message: error.message });
  }
};