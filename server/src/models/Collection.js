const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    subtitle: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
      },
    ],

    tags: [String],

    audience: [
      {
        type: String,
        enum: ["local", "foreigner", "diaspora", "family", "couple", "adventure"],
      },
    ],

    estimatedDuration: {
      type: String,
    },

    difficultyLevel: {
      type: String,
      enum: ["easy", "moderate", "hard"],
      default: "easy",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);