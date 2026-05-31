const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

    highlights: {
      type: [String],
      default: [],
    },

    activities: {
      type: [String],
      default: [],
    },

    amenities: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    localTips: {
      type: [String],
      default: [],
    },

    travelWarnings: {
      type: [String],
      default: [],
    },

    bestForPhotography: {
      type: Boolean,
      default: false,
    },

    bestForFamilies: {
      type: Boolean,
      default: false,
    },

    hiddenGemScore: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },

    difficultyLevel: {
      type: String,
      enum: ["easy", "moderate", "hard"],
      default: "easy",
    },

    bestTimeToVisit: {
      type: String,
      trim: true,
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

    idealFor: {
      type: [String],
      default: [],
    },

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

    distanceFromAddisKm: {
      type: Number,
      default: null,
    },

    travelTimeFromAddisHours: {
      type: Number,
      default: null,
    },

    recommendedTransport: {
      type: [String],
      default: [],
    },

    roadCondition: {
      type: String,
      enum: ["excellent", "good", "mixed", "rough", "seasonal"],
    },

    nearestAirport: {
      type: String,
      trim: true,
    },

    nearestTown: {
      type: String,
      trim: true,
    },

    googleMapsUrl: {
      type: String,
      trim: true,
    },

    isWeekendTrip: {
      type: Boolean,
      default: false,
    },

    weekendTripLevel: {
      type: String,
      enum: ["day-trip", "overnight", "2-3-days", "extended"],
    },

    experienceScores: {
      adventure: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
      culture: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
      nature: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
      photography: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
      familyFriendly: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
      accessibility: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
    },

  

    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],

    coverImage: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

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

    sourceLinks: {
      type: [String],
      default: [],
    },

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

    ethiopiaScore: {
      type: Number,
      min: 1,
      max: 100,
      default: 50,
    },

    scoreReason: {
      type: String,
      trim: true,
      default: "",
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
  }
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
placeSchema.index({ featured: -1, featuredOrder: 1 });
placeSchema.index({ category: 1, region: 1 });
placeSchema.index({ isWeekendTrip: 1 });
placeSchema.index({ ethiopiaScore: -1 });
placeSchema.index({ popularityScore: -1 });

module.exports = mongoose.model("Place", placeSchema);