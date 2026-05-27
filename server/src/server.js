const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/adey";

connectDB(MONGO_URI).then((connected) => {
  if (!connected) {
    console.warn(
      "MongoDB connection failed. The server is still running, but /api/places will return sample data if the database is unavailable.",
    );
  }
});

app.use("/auth", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Adey API",
  });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Adey API running on port ${PORT}`);
});
