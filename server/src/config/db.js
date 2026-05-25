const mongoose = require("mongoose");

// Set up MongoDB connection error listener once
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully to:", mongoose.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
