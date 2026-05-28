const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },

    type: {
      type: String,
      required: true,
      enum: [
        "destination",
        "resort",
        "lodge",
        "hotel",
        "experience",
        "park",
        "museum",
        "restaurant",
        "cafe",
        "cultural-site",
      ],
    },

    category: {
      type: String,
      enum: [
        "historical",
        "cultural",
        "nature",
        "adventure",
        "religious",
        "wildlife",
        "lake",
        "mountain",
        "city",
        "luxury",
        "wellness",
        "family",
        "eco",
        "museum",
        "food",
        "heritage",
      ],
    },

    region: { type: String, required: true },
    city: String,
    area: String,

    shortDescription: { type: String, required: true },
    story: String,

    highlights: [String],
    activities: [String],
    amenities: [String],
    tags: [String],

    bestTimeToVisit: String,
    idealFor: [String],
    estimatedVisitDuration: String,

    priceRange: {
      type: String,
      enum: ["free", "budget", "mid-range", "premium", "luxury"],
      default: "mid-range",
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    coverImage: String,
    images: [String],

    nearbyPlaces: [String],

    featured: { type: Boolean, default: false },
    isNewOrGrowing: { type: Boolean, default: false },
    isCurated: { type: Boolean, default: true },

    tourismPriority: {
      type: String,
      enum: [
        "iconic",
        "emerging",
        "government-project",
        "eco-tourism",
        "heritage",
        "luxury-growth",
        "hidden-gem",
      ],
      default: "emerging",
    },

    ownershipType: {
      type: String,
      enum: ["public", "private", "public-private", "community", "unknown"],
      default: "unknown",
    },

    developmentStatus: {
      type: String,
      enum: [
        "established",
        "new",
        "under-development",
        "recently-developed",
        "unknown",
      ],
      default: "established",
    },

    sourceLinks: [String],

    lastVerifiedAt: Date,

    popularityScore: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },

    apiVisibility: {
      type: String,
      enum: ["public", "partner", "internal"],
      default: "public",
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

placeSchema.index({
  name: "text",
  region: "text",
  city: "text",
  area: "text",
  shortDescription: "text",
  story: "text",
  tags: "text",
  type: "text",
  category: "text",
  tourismPriority: "text",
});

module.exports = mongoose.model("Place", placeSchema);