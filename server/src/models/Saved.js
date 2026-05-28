const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent same user from saving the same place twice
savedSchema.index({ user: 1, place: 1 }, { unique: true });

module.exports = mongoose.model("SavedPlace", savedSchema);