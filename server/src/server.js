const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");
const morgan = require("morgan");

const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const placeRoutes = require("./routes/placeRoutes");
const savedRoutes = require("./routes/savedRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const passportRoutes = require("./routes/passportRoutes");
const tripRoutes = require("./routes/tripRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/adey";

connectDB(MONGO_URI).then((connected) => {
  if (!connected) {
    console.warn("MongoDB connection failed.");
  }
});

app.use("/auth", userRoutes);
app.use("/api/places", placeRoutes);
app.use("/saved", savedRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/passport", passportRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Adey API" });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Adey API running on port ${PORT}`);
});