const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    country: {
      type: String,
      default: "Ethiopia",
      trim: true,
    },

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

    region: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    area: {
      type: String,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    story: {
      type: String,
      trim: true,
    },

    highlights: [String],

    activities: [String],

    amenities: [String],

    tags: [String],

    bestTimeToVisit: {
      type: String,
      trim: true,
    },

    seasonality: {
      type: [String],
      enum: ["dry-season", "rainy-season", "year-round"],
      default: ["year-round"],
    },

    idealFor: [String],

    estimatedVisitDuration: {
      type: String,
      trim: true,
    },

    priceRange: {
      type: String,
      enum: ["free", "budget", "mid-range", "premium", "luxury"],
      default: "mid-range",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },

    coverImage: String,

    images: [String],

    nearbyPlaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    featuredOrder: {
      type: Number,
      default: 0,
    },

    isNewOrGrowing: {
      type: Boolean,
      default: false,
    },

    isCurated: {
      type: Boolean,
      default: true,
    },

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
      enum: [
        "public",
        "private",
        "public-private",
        "community",
        "religious",
        "mixed",
        "unknown",
      ],
      default: "unknown",
    },
    seasonality: {
      type: [String],
      enum: [
        "dry-season",
        "rainy-season",
        "year-round",
        "festival-season",
        "weekends",
        "evenings",
      ],
      default: ["year-round"],
    },
    developmentStatus: {
      type: String,
      enum: [
        "established",
        "new",
        "emerging",
        "under-development",
        "recently-developed",
        "unknown",
      ],
      default: "established",
    },

    sourceLinks: [String],

    lastVerifiedAt: {
      type: Date,
      default: Date.now,
    },

    popularityScore: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4,
    },

    visitCount: {
      type: Number,
      default: 0,
    },

    seoTitle: {
      type: String,
      trim: true,
    },

    seoDescription: {
      type: String,
      trim: true,
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
  {
    timestamps: true,
  },
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

placeSchema.index({ location: "2dsphere" });

placeSchema.index({ name: 1, region: 1 }, { unique: true });

module.exports = mongoose.model("Place", placeSchema);
