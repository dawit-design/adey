const fs = require("fs");

const Place = require("../models/Place");
const slugify = require("../utils/slugify");
const cloudinary = require("../config/cloudinary");

const {
  geocodePlace,
  hasValidCoordinates,
  wait,
} = require("../utils/geocodePlace");

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

const createMappedGeocoding = ({
  source,
  matchedName = "",
  searchQuery = "",
}) => {
  const now = new Date();

  return {
    status: "mapped",
    source,
    matchedName,
    searchQuery,
    lastAttemptedAt: now,
    mappedAt: now,
    error: "",
  };
};

const createNeedsReviewGeocoding = ({ error = "", searchQuery = "" }) => {
  return {
    status: "needs-review",
    source: "none",
    matchedName: "",
    searchQuery,
    lastAttemptedAt: new Date(),
    mappedAt: null,
    error,
  };
};

const extractCoordinatesFromGoogleMapsUrl = (googleMapsUrl) => {
  if (typeof googleMapsUrl !== "string" || !googleMapsUrl.trim()) {
    return null;
  }

  const url = googleMapsUrl.trim();

  /*
    Common Google Maps format:

    https://www.google.com/maps/place/.../@9.145,40.4897,15z
  */
  const atCoordinates = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);

  if (atCoordinates) {
    const latitude = Number(atCoordinates[1]);

    const longitude = Number(atCoordinates[2]);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    if (hasValidCoordinates(location)) {
      return location;
    }
  }

  /*
    Google Maps query formats:

    ?q=9.145,40.4897
    ?query=9.145,40.4897
    ?ll=9.145,40.4897
  */
  const queryCoordinates = url.match(
    /[?&](?:q|query|ll)=(-?\d+(?:\.\d+)?)(?:%2C|,)(-?\d+(?:\.\d+)?)/i,
  );

  if (queryCoordinates) {
    const latitude = Number(queryCoordinates[1]);

    const longitude = Number(queryCoordinates[2]);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    if (hasValidCoordinates(location)) {
      return location;
    }
  }

  /*
    Some Google Maps links contain:

    !3d9.145!4d40.4897
  */
  const embeddedCoordinates = url.match(
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
  );

  if (embeddedCoordinates) {
    const latitude = Number(embeddedCoordinates[1]);

    const longitude = Number(embeddedCoordinates[2]);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    if (hasValidCoordinates(location)) {
      return location;
    }
  }

  return null;
};

const resolvePlaceCoordinates = async (placeData) => {
  if (hasValidCoordinates(placeData.location)) {
    return {
      location: placeData.location,

      geocoding: createMappedGeocoding({
        source: "manual",
        matchedName: placeData.name || "",
      }),
    };
  }

  const googleMapsLocation = extractCoordinatesFromGoogleMapsUrl(
    placeData.googleMapsUrl,
  );

  if (googleMapsLocation) {
    return {
      location: googleMapsLocation,

      geocoding: createMappedGeocoding({
        source: "google-maps",
        matchedName: placeData.name || "",
        searchQuery: placeData.googleMapsUrl || "",
      }),
    };
  }

  try {
    const result = await geocodePlace(placeData);

    if (!result) {
      return {
        location: placeData.location || {
          type: "Point",
          coordinates: [0, 0],
        },

        geocoding: createNeedsReviewGeocoding({
          error: "No confident automatic location match was found.",
        }),
      };
    }

    return {
      location: result.location,

      geocoding: createMappedGeocoding({
        source: "automatic",
        matchedName: result.matchedName || "",
        searchQuery: result.searchQuery || "",
      }),
    };
  } catch (error) {
    console.log(
      `Automatic geocoding failed for ${placeData.name}:`,
      error.message,
    );

    return {
      location: placeData.location || {
        type: "Point",
        coordinates: [0, 0],
      },

      geocoding: createNeedsReviewGeocoding({
        error: error.message || "Automatic geocoding failed.",
      }),
    };
  }
};

const synchronizeMappedStatuses = async (places) => {
  for (const place of places) {
    if (
      hasValidCoordinates(place.location) &&
      place.geocoding?.status !== "mapped"
    ) {
      place.geocoding = createMappedGeocoding({
        source:
          place.geocoding?.source !== "none"
            ? place.geocoding.source
            : "manual",

        matchedName: place.geocoding?.matchedName || place.name,
      });

      await place.save();
    }
  }
};

const calculateGeocodingStats = (places) => {
  let mapped = 0;
  let pending = 0;
  let needsReview = 0;

  places.forEach((place) => {
    if (hasValidCoordinates(place.location)) {
      mapped += 1;
      return;
    }

    if (place.geocoding?.status === "needs-review") {
      needsReview += 1;
      return;
    }

    pending += 1;
  });

  return {
    mapped,
    pending,
    needsReview,
  };
};

exports.createPlace = async (req, res) => {
  try {
    const data = pickPlaceFields(req.body);

    if (!data.name) {
      return res.status(400).json({
        message: "Place name is required",
      });
    }

    data.slug = data.slug || slugify(data.name);

    const manuallyProvidedLocation = hasValidCoordinates(data.location);

    if (manuallyProvidedLocation) {
      data.geocoding = createMappedGeocoding({
        source: "manual",
        matchedName: data.name,
      });
    } else {
      const resolved = await resolvePlaceCoordinates(data);

      data.location = resolved.location;

      data.geocoding = resolved.geocoding;
    }

    const place = await Place.create(data);

    return res.status(201).json(place);
  } catch (error) {
    console.log("Create place error:", error);

    return res.status(500).json({
      message: error.message,
    });
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

    const filter = {
      status: "published",
    };

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (region) {
      filter.region = new RegExp(region, "i");
    }

    if (featured) {
      filter.featured = featured === "true";
    }

    if (tourismPriority) {
      filter.tourismPriority = tourismPriority;
    }

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
      filter.$text = {
        $search: q,
      };
    }

    const places = await Place.find(filter).sort({
      featured: -1,
      popularityScore: -1,
      createdAt: -1,
    });

    return res.status(200).json(places);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPlaceBySlug = async (req, res) => {
  try {
    const place = await Place.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!place) {
      return res.status(404).json({
        message: "Place not found",
      });
    }

    return res.status(200).json(place);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const existingPlace = await Place.findById(req.params.id);

    if (!existingPlace) {
      return res.status(404).json({
        message: "Place not found",
      });
    }

    const data = pickPlaceFields(req.body);

    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    const manualLocationProvided = hasValidCoordinates(data.location);

    if (manualLocationProvided) {
      data.geocoding = createMappedGeocoding({
        source: "manual",

        matchedName: data.name || existingPlace.name,
      });
    } else {
      const combinedPlaceData = {
        ...existingPlace.toObject(),
        ...data,
      };

      const locationFieldsChanged = [
        "name",
        "country",
        "region",
        "city",
        "area",
        "googleMapsUrl",
      ].some((field) => data[field] !== undefined);

      const currentlyMapped = hasValidCoordinates(combinedPlaceData.location);

      if (!currentlyMapped) {
        /*
          Retry automatically when an admin edits
          location-related information. This gives
          corrected names and Google Maps URLs a
          chance to resolve.
        */
        if (
          locationFieldsChanged ||
          existingPlace.geocoding?.status !== "needs-review"
        ) {
          const resolved = await resolvePlaceCoordinates(combinedPlaceData);

          data.location = resolved.location;

          data.geocoding = resolved.geocoding;
        }
      } else if (existingPlace.geocoding?.status !== "mapped") {
        data.geocoding = createMappedGeocoding({
          source:
            existingPlace.geocoding?.source !== "none"
              ? existingPlace.geocoding.source
              : "manual",

          matchedName: existingPlace.name,
        });
      }
    }

    const place = await Place.findByIdAndUpdate(req.params.id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    return res.status(200).json(place);
  } catch (error) {
    console.log("Update place error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      {
        status: "draft",
      },
      {
        returnDocument: "after",
      },
    );

    if (!place) {
      return res.status(404).json({
        message: "Place not found",
      });
    }

    return res.status(200).json({
      message: "Place unpublished successfully",
      place,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.uploadPlaceImage = async (req, res) => {
  try {
    const { imageType } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const place = await Place.findById(req.params.id);

    if (!place) {
      cleanupLocalFile(req.file.path);

      return res.status(404).json({
        message: "Place not found",
      });
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

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.backfillPlaceCoordinates = async (req, res) => {
  try {
    const requestedLimit = Number(req.body?.limit) || 1;

    const limit = Math.min(Math.max(requestedLimit, 1), 5);

    let allPlaces = await Place.find({}).sort({
      createdAt: 1,
    });

    /*
        Recognize places that already have valid
        coordinates, including the ten places
        updated by the previous backfill.
      */
    await synchronizeMappedStatuses(allPlaces);

    allPlaces = await Place.find({}).sort({
      createdAt: 1,
    });

    /*
        Only pending places are selected.

        A place marked needs-review is skipped, so
        it cannot block the rest of the queue.
      */
    const pendingPlaces = allPlaces.filter((place) => {
      const missingCoordinates = !hasValidCoordinates(place.location);

      const needsReview = place.geocoding?.status === "needs-review";

      return missingCoordinates && !needsReview;
    });

    const placesToProcess = pendingPlaces.slice(0, limit);

    const results = [];

    for (let index = 0; index < placesToProcess.length; index += 1) {
      const place = placesToProcess[index];

      const resolved = await resolvePlaceCoordinates(place.toObject());

      place.location = resolved.location;

      place.geocoding = resolved.geocoding;

      await place.save();

      if (resolved.geocoding.status === "mapped") {
        results.push({
          placeId: place._id,
          name: place.name,
          status: "updated",
          source: resolved.geocoding.source,
          coordinates: resolved.location.coordinates,
          matchedName: resolved.geocoding.matchedName,
        });
      } else {
        results.push({
          placeId: place._id,
          name: place.name,
          status: "needs-review",
          message: resolved.geocoding.error,
        });
      }

      if (index < placesToProcess.length - 1) {
        await wait(1100);
      }
    }

    const refreshedPlaces = await Place.find({});

    const stats = calculateGeocodingStats(refreshedPlaces);

    const updated = results.filter(
      (result) => result.status === "updated",
    ).length;

    const needsReviewAdded = results.filter(
      (result) => result.status === "needs-review",
    ).length;

    return res.status(200).json({
      message:
        placesToProcess.length > 0
          ? "Coordinate backfill batch completed."
          : stats.pending === 0
            ? "All automatic coordinate attempts are complete."
            : "No pending destinations were available.",

      processed: placesToProcess.length,

      updated,

      notFound: needsReviewAdded,

      failed: 0,

      /*
          Keep remaining for compatibility with
          the current AdminPlacesScreen.
        */
      remaining: stats.pending,

      mapped: stats.mapped,

      pending: stats.pending,

      needsReview: stats.needsReview,

      results,
    });
  } catch (error) {
    console.log("Backfill coordinates error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.retryMissingPlaceCoordinates =
  async (req, res) => {
    try {
      /*
        Reset only destinations previously marked
        as needs-review.

        Existing mapped coordinates are not changed.
      */
      const result =
        await Place.updateMany(
          {
            "geocoding.status":
              "needs-review",
          },
          {
            $set: {
              "geocoding.status":
                "pending",

              "geocoding.source":
                "none",

              "geocoding.matchedName":
                "",

              "geocoding.searchQuery":
                "",

              "geocoding.lastAttemptedAt":
                null,

              "geocoding.mappedAt":
                null,

              "geocoding.error":
                "",
            },
          }
        );

      return res.status(200).json({
        message:
          result.modifiedCount > 0
            ? `${result.modifiedCount} missing destinations are ready to be searched again.`
            : "No missing destinations needed to be reset.",

        reset:
          result.modifiedCount,

        matched:
          result.matchedCount,
      });
    } catch (error) {
      console.log(
        "Retry missing coordinates error:",
        error
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  };