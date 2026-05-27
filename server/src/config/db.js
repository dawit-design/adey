const mongoose = require("mongoose");

let connected = false;

// Set up MongoDB connection error listener once
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    connected = true;
    console.log("MongoDB connected successfully to:", mongoose.connection.name);
    return true;
  } catch (error) {
    connected = false;
    console.error("Error connecting to MongoDB:", error.message || error);
    return false;
  }
};

const getDBStatus = () => connected;

module.exports = {
  connectDB,
  getDBStatus,
};
