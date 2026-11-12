const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: null,
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
  },
  {
    _id: true,
  }
);

const passportEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },

    status: {
      type: String,
      enum: ["visited", "wantToVisit"],
      required: true,
      default: "wantToVisit",
    },

    visitedAt: {
      type: Date,
      default: null,
    },

    coverPhoto: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: null,
      },
    },

    photos: {
      type: [photoSchema],
      default: [],
      validate: {
        validator: function (photos) {
          return photos.length <= 5;
        },
        message: "You can upload a maximum of 5 additional photos.",
      },
    },

    memory: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

passportEntrySchema.index(
  {
    user: 1,
    place: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("PassportEntry", passportEntrySchema);