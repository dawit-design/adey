const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username can be at most 30 characters"],
      match: [
        /^[a-zA-Z0-9._-]+$/,
        "Username can only contain letters, numbers, ., _, and -",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password_hash: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phone_number: {
      type: String,
      default: null,
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    email_verification_token: {
      type: String,
      select: false,
    },
    email_verification_expires: {
      type: Date,
      select: false,
    },
    password_reset_token: {
      type: String,
      select: false,
    },
    password_reset_expires: {
      type: Date,
      select: false,
    },
    account_status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      select: true,
    },
    profile_photo: {
      type: String,
      default: null,
    },
    date_of_birth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: [null, "male", "female", "other"],
      default: null,
    },
    nationality: {
      type: String,
      default: null,
    },
    country_of_residence: {
      type: String,
      default: null,
    },
    preferred_language: {
      type: String,
      default: "en",
    },
    preferred_currency: {
      type: String,
      default: "USD",
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    is_phone_verified: {
      type: Boolean,
      default: false,
    },
    profile_completion_percentage: {
      type: Number,
      default: 0,
    },
    last_login: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password_hash")) return;

  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
});

userSchema.methods.matchPassword = async function (passwordToMatch) {
  return await bcrypt.compare(passwordToMatch, this.password_hash);
};

userSchema.methods.updateProfileCompletion = function () {
  const phase2Fields = [
    "profile_photo",
    "date_of_birth",
    "gender",
    "nationality",
    "country_of_residence",
    "preferred_language",
    "preferred_currency",
    "timezone",
  ];

  const completedFields = phase2Fields.filter(
    (field) => this[field] !== null && this[field] !== undefined,
  );
  this.profile_completion_percentage = Math.round(
    (completedFields.length / phase2Fields.length) * 100,
  );
  return this.profile_completion_percentage;
};

module.exports = mongoose.model("User", userSchema);
