const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Trip must belong to a user"],
    },

    title: {
      type: String,
      required: [true, "Trip title is required"],
      trim: true,
      minlength: [2, "Trip title must be at least 2 characters"],
      maxlength: [100, "Trip title can be at most 100 characters"],
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Description can be at most 500 characters"],
    },

    coverImage: {
      type: String,
      default: "",
    },

    places: [
      {
        place: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Place",
          required: true,
        },

        note: {
          type: String,
          default: "",
          trim: true,
          maxlength: [300, "Place note can be at most 300 characters"],
        },

        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    status: {
      type: String,
      enum: ["planning", "completed"],
      default: "planning",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent same user from creating duplicate trip titles
tripSchema.index({ user: 1, title: 1 }, { unique: true });

// Make user trip listing faster
tripSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Trip", tripSchema);