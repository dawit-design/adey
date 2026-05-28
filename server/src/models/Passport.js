const mongoose = require("mongoose");

const passportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    visitedPlaces: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Place",
        },
      ],
      default: [],
    },

    wantToVisitPlaces: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Place",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Passport", passportSchema);